// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

export default defineConfig({
  site: 'https://zanaat.dev',
  // No raster images to resize, and sharp is a native dependency this site would install for nothing.
  image: { service: passthroughImageService() },
  // Fonts ship as their own files rather than data URIs inlined into the CSS.
  vite: { build: { assetsInlineLimit: 0 } },
});
