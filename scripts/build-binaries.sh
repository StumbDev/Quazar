#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "${BLUE}Starting Quazar binary build process...${NC}"

# Create dist directory if it doesn't exist
mkdir -p dist/bin

# Version from package.json
VERSION=$(node -p "require('./package.json').version")

# Build configurations
PLATFORMS=(
    "windows-x64"
    "mac-x64"
    "linux-x64"
)

BINARY_NAMES=(
    "quazar-win.exe"
    "quazar-macos"
    "quazar-linux"
)

# Build function
build_binary() {
    local platform=$1
    local output=$2
    
    echo "${BLUE}Building for ${platform}...${NC}"
    
    npx nexe Main.js \
        --target "${platform}-14.15.3" \
        --output "dist/bin/${output}" \
        --resource "src/**/*" \
        --build \
        --clean \
        --verbose

    if [ $? -eq 0 ]; then
        echo "${GREEN}Successfully built binary for ${platform}${NC}"
    else
        echo "${RED}Failed to build binary for ${platform}${NC}"
        exit 1
    fi
}

# Clean previous builds
echo "${BLUE}Cleaning previous builds...${NC}"
rm -rf dist/bin/*

# Build for each platform
for i in "${!PLATFORMS[@]}"; do
    build_binary "${PLATFORMS[$i]}" "${BINARY_NAMES[$i]}"
done

# Create checksums
echo "${BLUE}Generating checksums...${NC}"
cd dist/bin
if [[ "$OSTYPE" == "darwin"* ]]; then
    shasum -a 256 * > checksums.txt
else
    sha256sum * > checksums.txt
fi
cd ../..

# Create version file
echo "${BLUE}Creating version file...${NC}"
echo "{
  \"version\": \"$VERSION\",
  \"buildDate\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\"
}" > dist/bin/version.json

echo "${GREEN}Build process completed!${NC}"
echo "${BLUE}Binaries available in dist/bin:${NC}"
ls -lh dist/bin

# Optional: Create zip archives
echo "${BLUE}Creating zip archives...${NC}"
cd dist/bin
for binary in "${BINARY_NAMES[@]}"; do
    if [ -f "$binary" ]; then
        zip "${binary}.zip" "$binary" version.json
        echo "${GREEN}Created ${binary}.zip${NC}"
    fi
done
cd ../..

echo "${GREEN}All done! Binary packages are ready in dist/bin${NC}" 