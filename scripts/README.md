# Cleanup Scripts

This directory contains scripts to help clean build caches and resolve common build issues in the Amboseli Safari Club project.

## Available Scripts

### `clean-cache.js`
A cross-platform Node.js script that cleans build caches and temporary files.

### `clean-cache.sh`
Bash script for Unix/Linux/macOS systems.

### `clean-cache.bat`
Batch script for Windows systems.

## NPM Scripts

Add these to your `package.json` scripts section:

```json
"scripts": {
  "clean": "node scripts/clean-cache.js",
  "clean:full": "npm run clean && npm ci",
  "rebuild": "npm run clean && npm install && npm run build"
}
```

## Usage

### Quick Cache Cleanup
```bash
npm run clean
```

### Full Cleanup (cache + reinstall)
```bash
npm run clean:full
```

### Rebuild Project
```bash
npm run rebuild
```

## Common Build Issues

### Image Optimization Errors
If you encounter errors related to image optimization or Webpack cache:
1. Run `npm run clean`
2. Restart your development server

### TypeScript Build Issues
If TypeScript build errors persist:
1. Run `npm run clean`
2. Delete `node_modules` and run `npm install`
3. Run `npm run build`

### When to Use `clean:full`
Use this when:
- Switching between branches with different dependencies
- After major dependency updates
- When you encounter persistent build issues

## Prevention Tips
- Run `npm run clean` before important builds
- Use `npm run rebuild` after updating dependencies
- Use `npm run clean:full` when switching branches

## Troubleshooting
If you encounter permission issues on Unix-based systems, try:
```bash
chmod +x scripts/*.sh
```

For Windows, ensure you're running the command prompt as administrator if you encounter permission issues.
