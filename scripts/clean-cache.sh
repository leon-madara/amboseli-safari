#!/bin/bash

# Clean Next.js Cache Script
# This script removes all cached files to resolve webpack caching issues

echo "🧹 Cleaning Next.js cache and build artifacts..."

# Remove .next directory
if [ -d ".next" ]; then
  echo "  ✓ Removing .next directory..."
  rm -rf .next
else
  echo "  ℹ No .next directory found"
fi

# Remove node_modules/.cache
if [ -d "node_modules/.cache" ]; then
  echo "  ✓ Removing node_modules/.cache..."
  rm -rf node_modules/.cache
else
  echo "  ℹ No node_modules/.cache found"
fi

# Remove TypeScript build info
if [ -f "tsconfig.tsbuildinfo" ]; then
  echo "  ✓ Removing tsconfig.tsbuildinfo..."
  rm -f tsconfig.tsbuildinfo
fi

if [ -f ".next/tsconfig.tsbuildinfo" ]; then
  echo "  ✓ Removing .next/tsconfig.tsbuildinfo..."
  rm -f .next/tsconfig.tsbuildinfo
fi

# Remove out directory if it exists
if [ -d "out" ]; then
  echo "  ✓ Removing out directory..."
  rm -rf out
fi

echo ""
echo "✅ Cache cleanup complete!"
echo ""
echo "Next steps:"
echo "  1. Run: npm install (if dependencies are missing)"
echo "  2. Run: npm run dev (for development)"
echo "  3. Run: npm run build (for production build)"
echo ""
