#!/bin/bash

echo "🧹 Cleaning up Kubernetes resources..."

# Delete all resources
kubectl delete -k k8s/

# Delete namespace (this will delete everything in it)
kubectl delete namespace parcial-backend

echo "✅ Cleanup complete!"