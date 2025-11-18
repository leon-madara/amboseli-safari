/**
 * Image Optimization Script for lionPride.png
 * Reduces file size while maintaining visual quality
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../public/images/wildlife/lionPride.png');
const outputPath = path.join(__dirname, '../public/images/wildlife/lionPride-optimized.png');
const backupPath = path.join(__dirname, '../public/images/wildlife/lionPride-original.png');

async function optimizeImage() {
  try {
    console.log('🦁 Optimizing lionPride.png...\n');

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeKB = (originalStats.size / 1024).toFixed(2);
    const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);

    console.log(`Original size: ${originalSizeMB}MB (${originalSizeKB}KB)`);

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`Original dimensions: ${metadata.width}x${metadata.height}px\n`);

    // Backup original file
    console.log('📦 Creating backup...');
    fs.copyFileSync(inputPath, backupPath);
    console.log(`Backup saved to: lionPride-original.png\n`);

    // Optimize image:
    // 1. Resize to 1920px wide (sufficient for most displays)
    // 2. Convert to WebP format (better compression)
    // 3. Reduce quality slightly for smaller file size
    console.log('⚙️  Processing image...');

    await sharp(inputPath)
      .resize(1920, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({
        quality: 85,
        compressionLevel: 9,
        effort: 10
      })
      .toFile(outputPath);

    // Get optimized file size
    const optimizedStats = fs.statSync(outputPath);
    const optimizedSizeKB = (optimizedStats.size / 1024).toFixed(2);
    const optimizedSizeMB = (optimizedStats.size / (1024 * 1024)).toFixed(2);
    const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);

    console.log(`\n✅ Optimization complete!`);
    console.log(`Optimized size: ${optimizedSizeMB}MB (${optimizedSizeKB}KB)`);
    console.log(`Reduction: ${reduction}%\n`);

    // Get optimized dimensions
    const optimizedMetadata = await sharp(outputPath).metadata();
    console.log(`New dimensions: ${optimizedMetadata.width}x${optimizedMetadata.height}px\n`);

    // Replace original with optimized
    console.log('🔄 Replacing original file with optimized version...');
    fs.unlinkSync(inputPath);
    fs.renameSync(outputPath, inputPath);

    console.log('\n✨ Done! lionPride.png has been optimized.');
    console.log(`Original backed up as lionPride-original.png`);

  } catch (error) {
    console.error('❌ Error optimizing image:', error);
    process.exit(1);
  }
}

optimizeImage();
