/*
 * Type declarations for the Starlight virtual modules used by the component
 * overrides in src/components/starlight/.
 *
 * `virtual:starlight/components/*` is how Starlight tells an override to
 * render the *currently configured* version of a sub-component — so if a
 * future override replaces EditLink, our Footer picks that up rather than
 * hard-rendering Starlight's stock one. That indirection is the documented
 * approach, but Starlight ships no ambient types for the virtual module IDs,
 * so `astro check` reports them as unresolved even though the Vite build
 * resolves them fine.
 *
 * Declaring them here keeps `npm run check` clean without giving up the
 * indirection (importing '@astrojs/starlight/components/EditLink.astro'
 * directly would type-check, but would also bypass any override).
 */
declare module 'virtual:starlight/components/EditLink' {
  const Component: import('astro').AstroComponentFactory;
  export default Component;
}

declare module 'virtual:starlight/components/LastUpdated' {
  const Component: import('astro').AstroComponentFactory;
  export default Component;
}

declare module 'virtual:starlight/components/Pagination' {
  const Component: import('astro').AstroComponentFactory;
  export default Component;
}
