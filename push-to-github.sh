#!/bin/bash

# Script to push to GitHub
# Usage: ./push-to-github.sh YOUR_USERNAME REPO_NAME

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: ./push-to-github.sh YOUR_USERNAME REPO_NAME"
  echo "Example: ./push-to-github.sh johndoe design-to-code"
  exit 1
fi

USERNAME=$1
REPO_NAME=$2

echo "Adding remote origin..."
git remote add origin https://github.com/${USERNAME}/${REPO_NAME}.git

echo "Pushing to GitHub..."
git push -u origin main

echo "Done! Your repository is now on GitHub at: https://github.com/${USERNAME}/${REPO_NAME}"
