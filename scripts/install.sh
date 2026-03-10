#!/bin/bash

# Install script for jcp.home project
# Usage: ./scripts/install.sh

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

print_info "Installing dependencies for all packages..."

# Install root dependencies
if [ -f "package.json" ]; then
    print_info "Installing root dependencies..."
    npm install
    print_success "Root dependencies installed"
fi

# Install web dependencies
if [ -d "dev/web" ]; then
    print_info "Installing web dependencies..."
    cd dev/web
    npm install
    cd ../..
    print_success "Web dependencies installed"
fi

# Install sanity dependencies
if [ -d "dev/sanity" ]; then
    print_info "Installing Sanity dependencies..."
    cd dev/sanity
    npm install
    cd ../..
    print_success "Sanity dependencies installed"
fi

print_success "All dependencies installed successfully!"
print_info "You can now run: npm run dev"
