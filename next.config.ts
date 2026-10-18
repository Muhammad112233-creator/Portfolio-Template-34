import type { NextConfig } from 'next';

// GitHub project Pages needs /repository-name. Local preview and other hosts do not.
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isPages = process.env.DEPLOY_TARGET === 'github-pages';
const basePath = isPages && !repository.endsWith('.github.io') ? `/${repository}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  allowedDevOrigins: ['*.e2b.app'],
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
};

export default nextConfig;
