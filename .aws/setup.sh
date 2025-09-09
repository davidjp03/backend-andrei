#!/bin/bash

# AWS ECS Setup Script for Parcial Backend
# Run this script to set up AWS infrastructure

set -e

REGION="us-east-1"
CLUSTER_NAME="parcial-backend-cluster"
SERVICE_NAME="parcial-backend-service"
REPOSITORY_NAME="parcial-backend"
TASK_FAMILY="parcial-backend-task"

echo "🚀 Setting up AWS ECS infrastructure..."

# Create ECR repository
echo "📦 Creating ECR repository..."
aws ecr create-repository \
    --repository-name $REPOSITORY_NAME \
    --region $REGION || echo "Repository already exists"

# Create ECS cluster
echo "🏗️ Creating ECS cluster..."
aws ecs create-cluster \
    --cluster-name $CLUSTER_NAME \
    --capacity-providers FARGATE \
    --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1 \
    --region $REGION || echo "Cluster already exists"

# Create CloudWatch log group
echo "📊 Creating CloudWatch log group..."
aws logs create-log-group \
    --log-group-name "/ecs/parcial-backend" \
    --region $REGION || echo "Log group already exists"

# Create VPC and subnets (if needed)
echo "🌐 Setting up VPC..."
VPC_ID=$(aws ec2 create-vpc \
    --cidr-block 10.0.0.0/16 \
    --query 'Vpc.VpcId' \
    --output text \
    --region $REGION 2>/dev/null || aws ec2 describe-vpcs \
    --filters "Name=cidr-block,Values=10.0.0.0/16" \
    --query 'Vpcs[0].VpcId' \
    --output text \
    --region $REGION)

echo "VPC ID: $VPC_ID"

# Create Internet Gateway
IGW_ID=$(aws ec2 create-internet-gateway \
    --query 'InternetGateway.InternetGatewayId' \
    --output text \
    --region $REGION 2>/dev/null || echo "")

if [ ! -z "$IGW_ID" ]; then
    aws ec2 attach-internet-gateway \
        --vpc-id $VPC_ID \
        --internet-gateway-id $IGW_ID \
        --region $REGION
fi

# Create subnets
SUBNET_1=$(aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.1.0/24 \
    --availability-zone ${REGION}a \
    --query 'Subnet.SubnetId' \
    --output text \
    --region $REGION 2>/dev/null || aws ec2 describe-subnets \
    --filters "Name=vpc-id,Values=$VPC_ID" "Name=cidr-block,Values=10.0.1.0/24" \
    --query 'Subnets[0].SubnetId' \
    --output text \
    --region $REGION)

SUBNET_2=$(aws ec2 create-subnet \
    --vpc-id $VPC_ID \
    --cidr-block 10.0.2.0/24 \
    --availability-zone ${REGION}b \
    --query 'Subnet.SubnetId' \
    --output text \
    --region $REGION 2>/dev/null || aws ec2 describe-subnets \
    --filters "Name=vpc-id,Values=$VPC_ID" "Name=cidr-block,Values=10.0.2.0/24" \
    --query 'Subnets[0].SubnetId' \
    --output text \
    --region $REGION)

echo "Subnets: $SUBNET_1, $SUBNET_2"

# Create security group
SG_ID=$(aws ec2 create-security-group \
    --group-name parcial-backend-sg \
    --description "Security group for Parcial Backend" \
    --vpc-id $VPC_ID \
    --query 'GroupId' \
    --output text \
    --region $REGION 2>/dev/null || aws ec2 describe-security-groups \
    --filters "Name=group-name,Values=parcial-backend-sg" \
    --query 'SecurityGroups[0].GroupId' \
    --output text \
    --region $REGION)

# Add inbound rule for port 3000
aws ec2 authorize-security-group-ingress \
    --group-id $SG_ID \
    --protocol tcp \
    --port 3000 \
    --cidr 0.0.0.0/0 \
    --region $REGION 2>/dev/null || echo "Security group rule already exists"

echo "Security Group ID: $SG_ID"

echo "✅ AWS infrastructure setup complete!"
echo "📝 Update your task-definition.json with your AWS Account ID"
echo "🔑 Set up GitHub secrets: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY"
echo "🗄️ Create RDS PostgreSQL instance or use Supabase"