const fs = require('fs');
const { promisify } = require('util');
const { exec } = require('child_process');
const execAsync = promisify(exec);
const path = require('path');

const directoriesToRemove = [
  '.next',
  'node_modules/.cache',
  '.swc',
  '.tsbuildinfo'
];

async function removeDirectory(dir) {
  try {
    const stat = await fs.promises.stat(dir);
    if (stat.isDirectory()) {
      console.log(`Removing ${dir}...`);
      if (process.platform === 'win32') {
        await execAsync(`rmdir /s /q "${dir}"`);
      } else {
        await execAsync(`rm -rf "${dir}"`);
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Error removing ${dir}:`, err.message);
    }
  }
}

async function clean() {
  console.log('Starting cleanup process...');
  
  // Remove directories
  for (const dir of directoriesToRemove) {
    await removeDirectory(path.join(process.cwd(), dir));
  }

  // Remove TypeScript build info files
  try {
    const files = await fs.promises.readdir('.');
    const tsBuildFiles = files.filter(file => file.endsWith('.tsbuildinfo'));
    for (const file of tsBuildFiles) {
      console.log(`Removing ${file}...`);
      await fs.promises.unlink(file);
    }
  } catch (err) {
    console.error('Error removing TypeScript build files:', err.message);
  }

  console.log('✅ Cleanup completed successfully');
}

clean().catch(console.error);
