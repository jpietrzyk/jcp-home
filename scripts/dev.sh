#!/bin/bash

# Development script for jcp.home project
# Usage: ./scripts/dev.sh [web|sanity|all]

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Change to project root
cd "$PROJECT_ROOT"

# Default to web if no argument provided
SERVICE=${1:-web}

case $SERVICE in
    web)
        print_info "Starting web development server..."
        cd dev/web
        npm run dev
        ;;
    sanity)
        print_info "Starting Sanity Studio..."
        cd dev/sanity
        npm run dev
        ;;
    all)
        print_info "Starting both web and Sanity Studio..."
        npm run dev:all
        ;;
    *)
        print_warning "Unknown service: $SERVICE"
        echo "Usage: $0 [web|sanity|all]"
        exit 1
        ;;
esac
