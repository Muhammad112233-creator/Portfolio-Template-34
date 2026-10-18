// Next's Link applies basePath automatically. Plain image/download URLs need it here.
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path.startsWith('/') ? path : `/${path}`}`;
