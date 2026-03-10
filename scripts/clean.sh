#!/bin/bash

# Clean script for jcp.home project
# Usage: ./scripts/clean.sh

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
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

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Change to project root
cd "$PROJECT_ROOT"

print_warning "This will remove all node_modules directories. Are you sure? (y/N)"

if [ -t 0 ]; then
    # Interactive input: read the user's response safely under set -e
    if ! read -r response; then
        print_info "Operation cancelled."
        exit 0
    fi
else
    # Non-interactive input (e.g., CI): default to "no"
    response="n"
fi
if [[ ! "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    print_info "Operation cancelled."
    exit 0
fi

print_info "Cleaning up node_modules directories..."

# Remove root node_modules
if [ -d "node_modules" ]; then
    print_info "Removing root node_modules..."
    rm -rf node_modules
    print_success "Root node_modules removed"
fi

# Remove web node_modules
if [ -d "dev/web/node_modules" ]; then
    print_info "Removing web node_modules..."
    rm -rf dev/web/node_modules
    print_success "Web node_modules removed"
fi

# Remove sanity node_modules
if [ -d "dev/sanity/node_modules" ]; then
    print_info "Removing sanity node_modules..."
    rm -rf dev/sanity/node_modules
    print_success "Sanity node_modules removed"
fi

# Remove build artifacts
if [ -d "dev/web/dist" ]; then
    print_info "Removing web build artifacts..."
    rm -rf dev/web/dist
    print_success "Web build artifacts removed"
fi

# Remove cache directories
if [ -d "dev/web/.vite" ]; then
    print_info "Removing Vite cache..."
    rm -rf dev/web/.vite
    print_success "Vite cache removed"
fi

print_success "Cleanup completed!"
print_info "Run './scripts/install.sh' to reinstall dependencies."
