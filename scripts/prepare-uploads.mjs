// Make safe, path-preserving browser-upload batches. No Git CLI is involved.
import { readdir, mkdir, copyFile, rm, writeFile, stat } from 'node:fs/promises';
import { resolve, join, relative, dirname } from 'node:path';

const root = process.cwd();
const destination = resolve(root, 'upload-batches');
const batchSize = 80; // GitHub accepts at most 100 files per browser upload.
const allowedFolders = new Set([
  'app',
  'components',
  'lib',
  'public',
  'docs',
  'scripts',
  '.github',
]);
const allowedFiles = new Set([
  'README.md',
  'LICENSE',
  'ASSETS.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'package.json',
  'package-lock.json',
  'next.config.ts',
  'next-env.d.ts',
  'postcss.config.mjs',
  'tsconfig.json',
  '.gitignore',
  '.gitattributes',
  '.editorconfig',
  '.prettierignore',
  '.prettierrc.json',
]);
const files = [];
async function walk(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    if (
      [
        '.DS_Store',
        'Thumbs.db',
        'node_modules',
        '.next',
        'out',
        'build',
        'dist',
        'coverage',
        '.git',
        'private',
        'upload-batches',
        '.vscode',
        '.idea',
      ].includes(entry.name)
    )
      continue;
    if (
      entry.name.startsWith('.env') ||
      entry.name.startsWith('OWNER-') ||
      /\.(zip|log|tsbuildinfo)$/.test(entry.name)
    )
      continue;
    const path = join(folder, entry.name);
    if (entry.isDirectory()) await walk(path);
    else {
      const info = await stat(path);
      if (info.size > 25 * 1024 * 1024)
        throw new Error(`${relative(root, path)} exceeds GitHub's browser limit of 25 MiB.`);
      files.push(path);
    }
  }
}
for (const entry of await readdir(root, { withFileTypes: true })) {
  const path = join(root, entry.name);
  if (entry.isDirectory() && allowedFolders.has(entry.name)) await walk(path);
  else if (entry.isFile() && allowedFiles.has(entry.name)) files.push(path);
}
files.sort((a, b) => a.localeCompare(b));
await rm(destination, { recursive: true, force: true });
const manifest = [
  '# Browser upload batches',
  '',
  'Open each batch folder. Upload its CONTENTS at the repository ROOT. Do not upload the batch folder itself.',
  'Repeated app/public/etc. folders merge; paths are preserved. Include hidden files.',
  'Commit every batch. Only judge the deployment after all batches have been uploaded.',
  '',
];
for (let i = 0; i < files.length; i += batchSize) {
  const number = String(Math.floor(i / batchSize) + 1).padStart(2, '0');
  const batch = join(destination, `batch-${number}`);
  const part = files.slice(i, i + batchSize);
  manifest.push(`## Batch ${number} — ${part.length} files`, '');
  for (const source of part) {
    const name = relative(root, source);
    const target = join(batch, name);
    await mkdir(dirname(target), { recursive: true });
    await copyFile(source, target);
    manifest.push(`- \`${name}\``);
  }
  manifest.push('');
}
await writeFile(join(destination, 'UPLOAD-ORDER.md'), manifest.join('\n'));
console.log(
  `${files.length} files prepared in ${Math.ceil(files.length / batchSize)} batches under upload-batches/.`,
);
console.log(
  'Upload each batch’s contents at the repo root, in order. Never upload node_modules, out, .next, secrets, or this upload-batches folder.',
);
