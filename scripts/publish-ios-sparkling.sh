#!/bin/bash

# Sparkling iOS CocoaPods Release Script - Step 2: Publish Sparkling
# Usage: ./publish-sparkling.sh [version] [--skip-wait]
# Example: ./publish-sparkling.sh 2.0.0-rc.6
# Example: ./publish-sparkling.sh 2.0.0-rc.6 --skip-wait

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
    echo "Usage: ./publish-sparkling.sh [version] [--skip-wait]"
    echo ""
    echo "This script publishes Sparkling (Step 2)."
    echo "Make sure SparklingMethod is already available on CDN before running this."
    echo ""
    echo "Options:"
    echo "  version      The version number to publish (e.g., 2.0.0-rc.6)"
    echo "  --skip-wait  Skip waiting for SparklingMethod CDN sync"
    echo ""
    echo "Examples:"
    echo "  ./publish-sparkling.sh 2.0.0-rc.6           # Wait for SparklingMethod on CDN"
    echo "  ./publish-sparkling.sh 2.0.0-rc.6 --skip-wait  # Skip waiting"
}

# Parse arguments
VERSION=""
SKIP_WAIT=false

for arg in "$@"; do
    case $arg in
        --skip-wait)
            SKIP_WAIT=true
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

print_info "Starting Step 2: Publish Sparkling for version: $VERSION"

# Project root directory - use script location to determine root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Check if SparklingMethod is available on CDN (unless skipped)
if [ "$SKIP_WAIT" = false ]; then
    print_info "Checking if SparklingMethod $VERSION is available on CDN..."
    
    if pod trunk info SparklingMethod 2>/dev/null | grep -q "$VERSION"; then
        print_success "SparklingMethod $VERSION is available on CDN"
    else
        print_warning "SparklingMethod $VERSION not found on CDN yet"
        print_info "Waiting for SparklingMethod to sync on CDN (about 30-60 seconds)..."
        sleep 30
        
        # Check again
        for i in {1..10}; do
            if pod trunk info SparklingMethod 2>/dev/null | grep -q "$VERSION"; then
                print_success "SparklingMethod $VERSION is now available on CDN"
                break
            fi
            print_info "Waiting... ($i/10)"
            sleep 10
        done
    fi
else
    print_info "Skipping CDN wait (--skip-wait flag detected)"
fi

# Publish Sparkling
print_info "========================================"
print_info "Publishing Sparkling..."
print_info "========================================"
cd "$PROJECT_ROOT/packages/sparkling-sdk/ios"

print_info "Validating Sparkling.podspec..."
if pod lib lint Sparkling.podspec --allow-warnings --external-podspecs="$PROJECT_ROOT/packages/sparkling-method/ios/SparklingMethod.podspec" 2>&1; then
    print_success "Sparkling validation passed"
else
    print_warning "Sparkling validation has warnings or errors, trying to publish anyway..."
fi

print_info "Pushing Sparkling to CocoaPods..."
pod trunk push Sparkling.podspec --allow-warnings

print_success "Sparkling published successfully!"

# Complete
print_info "========================================"
print_success "Step 2 Complete: Sparkling published!"
print_success "All Pods published successfully!"
print_info "========================================"
echo ""
echo "Published version: $VERSION"
echo ""
echo "You can verify with:"
echo "  pod trunk info SparklingMethod"
echo "  pod trunk info Sparkling"
echo ""
echo "Or search:"
echo "  pod search SparklingMethod"
echo "  pod search Sparkling"
