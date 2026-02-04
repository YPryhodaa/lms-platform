#!/usr/bin/env node

/**
 * Format a single file using Prettier
 * Usage: node scripts/format-file.js <file-path>
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

const filePath = process.argv[2];

if (!filePath) {
  console.error('Error: File path is required');
  process.exit(1);
}

try {
  execSync(`pnpm exec prettier --write "${filePath}"`, {
    cwd: projectRoot,
    stdio: 'inherit',
  });
} catch (error) {
  process.exit(1);
}
