const siteRoot = import.meta.env.DEV
  ? new URL('/', window.location.origin)
  : new URL(/* @vite-ignore */ '../', import.meta.url);

export function siteHref(path = '') {
  return new URL(path, siteRoot).href;
}

export function toolHref(slug: string) {
  return siteHref(`tools/${slug}/index.html`);
}
