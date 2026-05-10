import type { ManicPlugin } from 'manicjs/config';

/**
 * Creates a Tailwind CSS plugin for Manic.
 *
 * Uses Tailwind CSS browser runtime for development and production.
 *
 * @returns ManicPlugin for Tailwind CSS
 * @see https://www.manicjs.tech/docs/framework/plugins/tailwind#quick-start
 *
 * @example
 * import { tailwind } from '@manicjs/tailwind';
 *
 * tailwind()
 */
export function tailwind(): ManicPlugin {
  return {
    name: '@manicjs/tailwind',
    bunfig: `[serve.static]\nplugins = ["bun-plugin-tailwind"]`,
    configureServer(ctx) {
      ctx.injectHtml(
        '<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>'
      );
    },
    build(ctx) {
      ctx.injectHtml(
        '<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>'
      );
    },
  };
}
