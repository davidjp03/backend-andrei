# Cloud Deployment Guide

Choose your preferred cloud provider for free-tier deployment:

## 🟠 AWS ECS Fargate (Recommended)

**Free Tier:** 750 hours/month for 12 months

### Setup:
1. Run AWS setup script:
```bash
chmod +x .aws/setup.sh
./.aws/setup.sh
```

2. Update `.aws/task-definition.json` with your AWS Account ID

3. Set GitHub secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `DATABASE_URL`
   - `JWT_SECRET`

4. Use main workflow: `.github/workflows/deploy.yml`

## 🔵 Azure Container Instances

**Free Tier:** $200 credit for 30 days

### Setup:
1. Create Azure Container Registry
2. Set GitHub secrets:
   - `AZURE_CREDENTIALS`
   - `REGISTRY_USERNAME`
   - `REGISTRY_PASSWORD`
   - `DATABASE_URL`
   - `JWT_SECRET`

3. Copy `deploy/azure-deploy.yml` to `.github/workflows/`

## 🟡 Google Cloud Run

**Free Tier:** 2 million requests/month

### Setup:
1. Enable Cloud Run API
2. Create service account with Cloud Run Admin role
3. Set GitHub secrets:
   - `GCP_PROJECT_ID`
   - `GCP_SA_KEY`
   - `DATABASE_URL`
   - `JWT_SECRET`

4. Copy `deploy/gcp-deploy.yml` to `.github/workflows/`

## Database Options

### Supabase (Free)
- 500MB database
- 2GB bandwidth
- Use your existing Supabase URL

### AWS RDS Free Tier
- 750 hours/month
- 20GB storage
- PostgreSQL 15

### Azure Database for PostgreSQL
- Included in $200 credit

### Google Cloud SQL
- $300 credit for 90 days