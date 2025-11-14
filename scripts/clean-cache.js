#!/usr/bin/env node

/**
 * Clean Next.js Cache Script
 *
 * This cross-platform script removes all cached files to resolve
 * webpack caching issues that cause build errors like:
 * - "Can't resolve './vendor-chunks/...' in '.next/server'"
 * - "[webpack.cache.PackFileCacheStrategy] Caching failed for pack"
 *
 * Usage:
 *   npm run clean
 *   node scripts/clean-cache.js
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for better terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function deleteDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    log(`  ✓ Removing ${dirPath}...`, colors.blue);
    fs.rmSync(dirPath, { recursive: true, force: true });
    return true;
  } else {
    log(`  ℹ No ${dirPath} found`, colors.yellow);
    return false;
  }
}

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    log(`  ✓ Removing ${filePath}...`, colors.blue);
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
}

function main() {
  log('\n🧹 Cleaning Next.js cache and build artifacts...\n', colors.bright);

  const rootDir = path.resolve(__dirname, '..');
  process.chdir(rootDir);

  let cleanedItems = 0;

  // Remove .next directory
  if (deleteDirectory('.next')) cleanedItems++;

  // Remove node_modules/.cache
  if (deleteDirectory('node_modules/.cache')) cleanedItems++;

  // Remove TypeScript build info files
  if (deleteFile('tsconfig.tsbuildinfo')) cleanedItems++;
  if (deleteFile('.next/tsconfig.tsbuildinfo')) cleanedItems++;

  // Remove out directory (static export output)
  if (deleteDirectory('out')) cleanedItems++;

  // Remove any leftover temp files
  if (deleteDirectory('.next/cache')) cleanedItems++;

  log('');
  if (cleanedItems > 0) {
    log('✅ Cache cleanup complete!', colors.green);
    log(`   Removed ${cleanedItems} item(s)`, colors.green);
  } else {
    log('✅ Nothing to clean - cache is already clear!', colors.green);
  }

  log('\nNext steps:', colors.bright);
  log('  1. Run: npm install (if dependencies are missing)');
  log('  2. Run: npm run dev (for development)');
  log('  3. Run: npm run build (for production build)');
  log('');
  log('💡 Tip: If errors persist, run: npm run clean:full', colors.yellow);
  log('   (This will reinstall all dependencies)\n');
}

// Run the script
try {
  main();
} catch (error) {
  log(`\n❌ Error during cleanup: ${error.message}`, colors.red);
  process.exit(1);
}
