#!/bin/bash

# Update task definition with your AWS Account ID
# Usage: ./update-task-definition.sh YOUR_ACCOUNT_ID

if [ -z "$1" ]; then
    echo "Usage: ./update-task-definition.sh YOUR_ACCOUNT_ID"
    exit 1
fi

ACCOUNT_ID=$1

# Update task definition
sed -i "s/YOUR_ACCOUNT_ID/$ACCOUNT_ID/g" .aws/task-definition.json

echo "✅ Updated task-definition.json with Account ID: $ACCOUNT_ID"