#!/bin/bash

# Sparkling iOS CocoaPods Release Script - Step 1: Publish SparklingMethod
# Usage: ./publish-cocoapods.sh [version] [--skip-git]
# Example: ./publish-cocoapods.sh 2.0.0-rc.6
# Example: ./publish-cocoapods.sh 2.0.0-rc.6 --skip-git

set -e

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored messages
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Show usage
show_usage() {
    echo "Usage: ./publish-cocoapods.sh [version] [--skip-git]"
    echo ""
    echo "This script publishes SparklingMethod (Step 1)."
    echo "After SparklingMethod is available on CDN, run publish-sparkling.sh for Step 2."
    echo ""
    echo "Options:"
    echo "  version     The version number to publish (e.g., 2.0.0-rc.6)"
    echo "  --skip-git  Skip git operations (commit, tag, push), start from validation"
    echo ""
    echo "Examples:"
    echo "  ./publish-cocoapods.sh 2.0.0-rc.6          # Full release process"
    echo "  ./publish-cocoapods.sh 2.0.0-rc.6 --skip-git  # Skip git, start from validation"
}

# Parse arguments
VERSION=""
SKIP_GIT=false

for arg in "$@"; do
    case $arg in
        --skip-git)
            SKIP_GIT=true
            shift
            ;;
        --help|-h)
            show_usage
            exit 0
            ;;
        *)
            if [ -z "$VERSION" ]; then
                VERSION=$arg
            fi
            ;;
    esac
done

# Validate version number
if [ -z "$VERSION" ]; then
    print_error "Please provide a version number"
    show_usage
    exit 1
fi

# Validate version format
if [[ ! $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.]+)?$ ]]; then
    print_error "Invalid version format: $VERSION"
    echo "Valid formats: 2.0.0 or 2.0.0-rc.1"
    exit 1
fi

print_info "Starting Step 1: Publish SparklingMethod for version: $VERSION"

# Project root directory - use script location to determine root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

if [ "$SKIP_GIT" = false ]; then
    # 1. Check current git status
    print_info "Checking git status..."
    if [ -n "$(git status --porcelain)" ]; then
        print_warning "There are uncommitted changes, please commit or stash them first"
        git status
        exit 1
    fi

    # 2. Update version numbers
    print_info "Updating podspec version numbers..."

    # Update SparklingMethod.podspec
    sed -i '' "s/s.version.*=.*\"2\.0\.0-rc\.[0-9]*/s.version        = \"$VERSION/" "$PROJECT_ROOT/packages/sparkling-method/ios/SparklingMethod.podspec"

    # Update Sparkling.podspec
    sed -i '' "s/s.version.*=.*\"2\.0\.0-rc\.[0-9]*/s.version        = \"$VERSION/" "$PROJECT_ROOT/packages/sparkling-sdk/ios/Sparkling.podspec"

    print_success "Podspec version numbers updated"

    # 3. Commit version changes
    print_info "Committing version changes..."
    git add -A
    git commit -m "chore: bump version to $VERSION for CocoaPods release"
    git push origin main

    print_success "Version changes committed and pushed"

    # 4. Create tag
    print_info "Creating tag: $VERSION..."
    if git rev-parse "$VERSION" >/dev/null 2>&1; then
        print_warning "Tag $VERSION already exists, deleting old tag..."
        git tag -d "$VERSION"
        git push origin ":refs/tags/$VERSION"
    fi

    git tag "$VERSION"
    git push origin "$VERSION"

    print_success "Tag $VERSION created and pushed"

    # 5. Wait for CDN sync
    print_info "Waiting 10 seconds for CDN to start syncing..."
    sleep 10
else
    print_info "Skipping git operations (--skip-git flag detected)"
    print_info "Starting from validation step..."
fi

# 6. Publish SparklingMethod
print_info "========================================"
print_info "Publishing SparklingMethod..."
print_info "========================================"
cd "$PROJECT_ROOT/packages/sparkling-method/ios"

print_info "Validating SparklingMethod.podspec..."
if pod lib lint SparklingMethod.podspec --allow-warnings; then
    print_success "SparklingMethod validation passed"
else
    print_warning "SparklingMethod validation has warnings, continuing with publish..."
fi

print_info "Pushing SparklingMethod to CocoaPods..."
pod trunk push SparklingMethod.podspec --allow-warnings

print_success "SparklingMethod published successfully!"

# 7. Wait for SparklingMethod to be available on CDN
print_info "Waiting for SparklingMethod to sync on CDN (about 30-60 seconds)..."
sleep 30

# Check if SparklingMethod is available
for i in {1..10}; do
    if pod trunk info SparklingMethod 2>/dev/null | grep -q "$VERSION"; then
        print_success "SparklingMethod $VERSION is now available on CDN"
        break
    fi
    print_info "Waiting... ($i/10)"
    sleep 10
done

# Complete Step 1
print_info "========================================"
print_success "Step 1 Complete: SparklingMethod published!"
print_info "========================================"
echo ""
echo "Published version: $VERSION"
echo ""
echo "Next step: Run the following command to publish Sparkling (Step 2):"
echo ""
echo "  ./publish-sparkling.sh $VERSION"
echo ""
echo "Or if SparklingMethod is already available on CDN:"
echo "  ./publish-sparkling.sh $VERSION --skip-wait"
echo ""
echo "You can verify SparklingMethod with:"
echo "  pod trunk info SparklingMethod"
