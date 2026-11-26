import type { ReactNode } from 'react';

/**
 * Storybook renders docs inside iframe.html, where bare `?path=` links resolve against the
 * iframe and replace the manager. Resolve them against the manager root instead.
 */
export function resolveDocHref(href: string) {
  if (!href.startsWith('?path=') || typeof window === 'undefined') return href;
  return `${window.location.pathname.replace(/iframe\.html$/, '')}${href}`;
}

export type DocLinkProps = {
  href: string;
  children: ReactNode;
};

/** Anchor for links to other Storybook docs pages (works from the docs iframe). */
export function DocLink({ href, children }: DocLinkProps) {
  return <a href={resolveDocHref(href)}>{children}</a>;
}
