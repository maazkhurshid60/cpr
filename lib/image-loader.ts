/* Image loader for the static export. GitHub Pages cannot resize images, so
   the files in public/images are served as they are; this only prefixes the
   base path, which next/image does not add to string sources on its own.
   The width goes in the query string so each srcset entry stays distinct. */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (/^https?:\/\//.test(src)) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}?w=${width}`;
}
