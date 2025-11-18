# Build Scripts

This directory contains utility scripts for maintaining the project.

## Cache Cleanup Scripts

### The Problem

Next.js sometimes encounters webpack caching errors during builds, showing errors like:

```
[webpack.cache.PackFileCacheStrategy] Caching failed for pack
Can't resolve './vendor-chunks/clsx' in '.next/server'
Can't resolve './vendor-chunks/framer-motion' in '.next/server'
```

These errors occur when:
- The build cache becomes corrupted
- Dependencies change but the cache isn't updated
- File system inconsistencies occur

### The Solution

We provide multiple ways to clean the cache:

#### Option 1: NPM Scripts (Recommended)

```bash
# Clean cache only
npm run clean

# Clean cache and rebuild
npm run rebuild

# Full cleanup (removes node_modules and reinstalls)
npm run clean:full
```

#### Option 2: Direct Script Execution

**Cross-platform (Node.js):**
```bash
node scripts/clean-cache.js
```

**Unix/Linux/macOS:**
```bash
./scripts/clean-cache.sh
```

**Windows:**
```cmd
scripts\clean-cache.bat
```

### What Gets Cleaned

The cleanup scripts remove:

1. `.next/` - Next.js build output
2. `node_modules/.cache/` - Cached module data
3. `tsconfig.tsbuildinfo` - TypeScript build info
4. `out/` - Static export output (if exists)

### When to Run

Run the cleanup script when you encounter:

- Webpack caching errors during build
- `ENOENT` errors for vendor chunks
- Strange build behavior after updating dependencies
- After switching branches with different dependencies
- When builds work on one machine but not another

### Prevention Tips

1. **Regular Cleanup**: Run `npm run clean` before important builds
2. **After Dependencies Change**: Run `npm run rebuild` after updating package.json
3. **Git Ignore**: Ensure `.next/` and `node_modules/` are in `.gitignore`
4. **Fresh Start**: Use `npm run clean:full` when encountering persistent issues

## Script Details

### `clean-cache.js`

The main cross-platform cleanup script using Node.js. This is the most reliable option as it works identically on all platforms.

**Features:**
- Cross-platform compatibility (Windows, macOS, Linux)
- Colored terminal output
- Detailed logging
- Safe deletion (checks existence before removal)
- Exit codes for CI/CD integration

### `clean-cache.sh`

Bash script for Unix-like systems (Linux, macOS, WSL).

### `clean-cache.bat`

Batch script for Windows Command Prompt.

## Troubleshooting

### Issue: Scripts don't have execute permission

**Solution (Unix/Linux/macOS):**
```bash
chmod +x scripts/clean-cache.sh
chmod +x scripts/clean-cache.js
```

### Issue: npm run clean fails

**Solution:**
```bash
# Run directly with node
node scripts/clean-cache.js

# Or use platform-specific script
./scripts/clean-cache.sh  # Unix/Linux/macOS
scripts\clean-cache.bat   # Windows
```

### Issue: Errors persist after cleanup

**Solutions (in order):**

1. **Full cleanup and reinstall:**
   ```bash
   npm run clean:full
   ```

2. **Manual cleanup:**
   ```bash
   rm -rf .next node_modules package-lock.json
   npm install
   npm run build
   ```

3. **Check for disk space issues:**
   ```bash
   df -h  # Unix/Linux/macOS
   ```

4. **Verify Node.js version:**
   ```bash
   node --version  # Should be >= 18.0.0
   ```

## Testing Scripts

### Cross-Browser Compatibility Testing

**Script:** `test-cross-browser-compatibility.js`

Tests the navigation component for cross-browser compatibility, verifying:
- Backdrop-filter support and webkit prefixes
- Fallback behavior for unsupported browsers
- Mobile browser optimizations (iOS Safari, Chrome Mobile)
- Performance optimizations (RAF, passive listeners)
- Accessibility features (reduced motion, keyboard navigation)

**Usage:**
```bash
node scripts/test-cross-browser-compatibility.js
```

**What it tests:**
1. Backdrop-filter CSS implementation
2. JavaScript support detection
3. Reduced motion support
4. Mobile browser optimizations
5. Scroll performance optimizations
6. Browser-specific CSS prefixes
7. Error handling and graceful degradation

**Output:**
- Detailed test results with pass/fail status
- Browser compatibility report
- Manual testing checklist
- Recommendations for production deployment

**Requirements Tested:** 2.5 (Browser Compatibility), 5.4 (Performance)

**Documentation:**
- Full report: `docs/cross-browser-testing-report.md`
- Quick reference: `docs/browser-compatibility-quick-reference.md`

### Other Testing Scripts

**Experiences Grid Responsive Testing:**
```bash
node scripts/test-experiences-responsive.js
```
Tests responsive behavior of the Experiences Grid across devices, verifying mobile/tablet/desktop layouts, touch interactions, and image optimization. **Requirements:** 4.1, 4.2, 4.3, 4.4

**Accessibility Testing:**
```bash
node scripts/test-accommodations-accessibility.js
```

**GSAP Pinning Tests:**
```bash
node scripts/test-gsap-pinning.js
```

**Navigation Scroll Tests:**
```bash
node scripts/test-navigation-scroll.js
```

**Scroll Performance Tests:**
```bash
node scripts/test-scroll-performance.js
```

**Contrast Ratio Verification:**
```bash
node scripts/verify-contrast-ratios.js
```

## Contributing

When adding new scripts:

1. Place them in the `scripts/` directory
2. Add documentation to this README
3. Add corresponding npm scripts to `package.json`
4. Ensure cross-platform compatibility when possible
5. Include proper error handling
