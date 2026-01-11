#!/bin/bash

# Fetch placeholder images for the prototype
# These are royalty-free images from Picsum Photos

echo "Fetching placeholder images..."

# Create img directory if it doesn't exist
mkdir -p public/img

# Download images
echo "Downloading map placeholder..."
curl -L "https://picsum.photos/id/1015/1200/700" -o public/img/map-placeholder.jpg || echo "Failed to download map-placeholder.jpg"

echo "Downloading service-ride image..."
curl -L "https://picsum.photos/id/1062/1200/700" -o public/img/service-ride.jpg || echo "Failed to download service-ride.jpg"

echo "Downloading service-package image..."
curl -L "https://picsum.photos/id/1074/1200/700" -o public/img/service-package.jpg || echo "Failed to download service-package.jpg"

echo "Downloading service-grocery image..."
curl -L "https://picsum.photos/id/1080/1200/700" -o public/img/service-grocery.jpg || echo "Failed to download service-grocery.jpg"

# Additional product images for grocery grid
echo "Downloading grocery-item-1 (produce)..."
curl -L "https://picsum.photos/id/292/800/800" -o public/img/grocery-item-1.jpg || echo "Failed to download grocery-item-1.jpg"

echo "Downloading grocery-item-2 (bakery)..."
curl -L "https://picsum.photos/id/312/800/800" -o public/img/grocery-item-2.jpg || echo "Failed to download grocery-item-2.jpg"

echo "Downloading grocery-item-3 (dairy)..."
curl -L "https://picsum.photos/id/431/800/800" -o public/img/grocery-item-3.jpg || echo "Failed to download grocery-item-3.jpg"

echo "Image download complete!"
echo "Downloaded files:"
ls -lh public/img/
