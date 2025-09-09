#!/bin/bash

echo "🚀 Deploying Parcial Backend to Kubernetes..."

# Build Docker image
echo "📦 Building Docker image..."
docker build -t parcial-backend-app:latest .

# Apply Kubernetes manifests
echo "🔧 Applying Kubernetes manifests..."
kubectl apply -k k8s/

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres -n parcial-backend --timeout=300s

# Run database migrations
echo "🗄️ Running database migrations..."
kubectl apply -f k8s/migration-job.yaml

# Wait for migration job to complete
echo "⏳ Waiting for migration to complete..."
kubectl wait --for=condition=complete job/prisma-migration -n parcial-backend --timeout=300s

# Get service URL
echo "🌐 Getting service information..."
kubectl get services -n parcial-backend

echo "✅ Deployment complete!"
echo "📋 Use 'kubectl get pods -n parcial-backend' to check pod status"
echo "🔍 Use 'kubectl logs -f deployment/parcial-backend-app -n parcial-backend' to view logs"