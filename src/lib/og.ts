import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { initWasm, Resvg } from '@resvg/resvg-wasm';
import satori from 'satori';

// Share images are drawn at build time from the same marks and faces as the site: 1200x630, ground,
// the project's mark, the title in Archivo, the site in DM Mono. No raster assets, no network.
// Resolved from the project root: the bundled module no longer sits beside its sources at build time.
const require = createRequire(join(process.cwd(), 'package.json'));
const file = (spec: string) => readFileSync(require.resolve(spec));

let ready: Promise<void> | undefined;
function wasm() {
  ready ??= initWasm(file('@resvg/resvg-wasm/index_bg.wasm'));
  return ready;
}

// Latin and Latin Extended ship as separate files; the extended set has its own name so satori
// falls back to it for Turkish letters (ğ, ş, İ) instead of dropping them.
const fonts = [
  { name: 'Archivo', weight: 600 as const, data: file('@fontsource/archivo/files/archivo-latin-600-normal.woff') },
  { name: 'Archivo Ext', weight: 600 as const, data: file('@fontsource/archivo/files/archivo-latin-ext-600-normal.woff') },
  { name: 'Archivo', weight: 400 as const, data: file('@fontsource/archivo/files/archivo-latin-400-normal.woff') },
  { name: 'Archivo Ext', weight: 400 as const, data: file('@fontsource/archivo/files/archivo-latin-ext-400-normal.woff') },
  { name: 'DM Mono', weight: 400 as const, data: file('@fontsource/dm-mono/files/dm-mono-latin-400-normal.woff') },
];

const svgUri = (path: string) => `data:image/svg+xml;base64,${readFileSync(join(process.cwd(), 'public', path)).toString('base64')}`;

interface Card {
  title: string;
  description: string;
  mark: string;
  label: string;
}

export async function ogImage({ title, description, mark, label }: Card): Promise<Response> {
  const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });
  const tree = h(
    'div',
    { width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#0e0f11', color: '#ecebe7', fontFamily: 'Archivo, Archivo Ext' },
    [
      h('div', { display: 'flex', alignItems: 'center', gap: 18 }, [
        { type: 'img', props: { src: svgUri(mark), height: 56, style: { height: 56 } } },
        h('div', { fontFamily: 'DM Mono', fontSize: 26, color: '#b4b3ae' }, label),
      ]),
      h('div', { display: 'flex', flexDirection: 'column', gap: 22 }, [
        h('div', { fontSize: title.length > 60 ? 58 : 66, fontWeight: 600, lineHeight: 1.06, letterSpacing: '-0.01em', maxWidth: 1000 }, title),
        h('div', { fontSize: 28, fontWeight: 400, lineHeight: 1.4, color: '#9a9a97', maxWidth: 980 }, description),
      ]),
      h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
        { type: 'img', props: { src: svgUri('/brand/zanaat.svg'), height: 36, style: { height: 36 } } },
        h('div', { fontFamily: 'DM Mono', fontSize: 24, color: '#8a8a87' }, 'zanaat.dev'),
      ]),
    ],
  );
  const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  await wasm();
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
