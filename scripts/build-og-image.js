/**
 * Build public/og-image.png — the default Open Graph card.
 *
 * Mirrors the homepage hero: warm-cream surface, large serif-italic
 * "pet care." accent, hero vet+dog photo on the right.
 *
 *   node scripts/build-og-image.js
 *
 * Uses Satori for layout + font rendering — Satori is purpose-built for
 * OG image generation (Vercel uses it for next/og) and handles TTF
 * embedding deterministically. We feed it Newsreader and Plus Jakarta
 * Sans variable TTFs so the rendered card matches the actual on-site
 * typography rather than sharp/librsvg's Georgia fallback. Sharp then
 * rasterises the resulting SVG to PNG.
 *
 * Re-run when the homepage tagline or brand palette changes. The output
 * PNG is committed alongside this script so social previews are
 * deterministic and don't require a build step on every deploy.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const satori = require('satori').default;

const ROOT = path.join(__dirname, '..');
const FONT_DIR = path.join(__dirname, 'fonts');
const OUT = path.join(ROOT, 'public', 'og-image.png');
const FAVICON_OUT = path.join(ROOT, 'src', 'app', 'icon.svg');
const APPLE_ICON_OUT = path.join(ROOT, 'src', 'app', 'apple-icon.png');
const HERO = path.join(ROOT, 'public', 'images', 'site', 'hero-vet-with-dog.jpg');

const W = 1200;
const H = 630;

// Brand palette — resolved from globals.css OKLCH tokens.
const SURFACE = '#fcf9f4';
const ON_SURFACE = '#1c1c19';
const ON_SURFACE_VARIANT = '#584142';
const PRIMARY = '#b23a2e';

function readFont(name) {
  const p = path.join(FONT_DIR, name);
  if (!fs.existsSync(p)) {
    console.error(`Missing font: ${p}\nDownload via curl from Google Fonts repo (see README).`);
    process.exit(1);
  }
  return fs.readFileSync(p);
}

// Static WOFFs — Satori (and the bundled opentype.js) doesn't parse
// variable TTFs, so we use Google Fonts' static-weight files instead.
const newsreader = readFont('Newsreader-700.woff');
const newsreaderItalic = readFont('Newsreader-700-Italic.woff');
const jakarta400 = readFont('PlusJakartaSans-400.woff');
const jakarta800 = readFont('PlusJakartaSans-800.woff');

// Circle — large disc, photo fills it edge-to-edge up to the white ring.
// Centre nudged into the canvas's right ~35-40%, leaving 60-70% of the
// horizontal space for the text panel on the left. The photo content is
// shifted leftward within the disc (via sharp's right-biased crop) so
// the dog still lands in the disc's visible left portion despite the
// disc itself sitting further right.
const CIRCLE_DIAMETER = 840;
const CIRCLE_BORDER = 24; // 14 × 1.7 ≈ 24
const CIRCLE_SHADOW = '0 42px 85px rgba(28, 28, 25, 0.22)'; // 25/50px × 1.7
const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;
// Centre at x = 1140. Disc left edge at canvas x=720 → text panel gets
// 720px / 60% of canvas width. Disc right edge at canvas x=1560
// (extends 360px past the canvas; the curve closes off-canvas).
const CIRCLE_CENTER_X = 1140;
const CIRCLE_CENTER_Y = H / 2;
const CIRCLE_LEFT = CIRCLE_CENTER_X - CIRCLE_RADIUS;
const CIRCLE_TOP = CIRCLE_CENTER_Y - CIRCLE_RADIUS;

async function buildHeroDataUri() {
  // Resize at 2× the visible disc diameter (840 × 2 = 1680) so the photo
  // stays crisp. Crop bias 'right' keeps the source's right-of-centre
  // region (dog + sofa) and discards the leftmost area (plant) — the
  // dog ends up biased toward the LEFT of the result, so when the disc
  // sits further right on canvas, the dog still lands in the disc's
  // visible left portion (canvas x=720-1200).
  const px = CIRCLE_DIAMETER * 2;
  const buf = await sharp(HERO)
    .resize({ width: px, height: px, fit: 'cover', position: 'right' })
    .jpeg({ quality: 86 })
    .toBuffer();
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

async function build() {
  const heroDataUri = await buildHeroDataUri();

  // Satori takes a React-like element tree (no JSX needed — plain objects).
  // We position the photo absolutely on the right and place the seam image
  // over its left edge to soften the transition.
  const tree = {
    type: 'div',
    props: {
      style: {
        width: W, height: H,
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        backgroundColor: SURFACE,
        // Mirror the homepage hero's `bg-soft-gradient`: two low-opacity
        // radial glows, tertiary at top-right and a warm pink at bottom-left.
        // Approximated from the OKLCH source values in globals.css.
        backgroundImage:
          'radial-gradient(circle at top right, rgba(69, 107, 107, 0.08) 0%, transparent 50%), ' +
          'radial-gradient(circle at bottom left, rgba(253, 107, 121, 0.08) 0%, transparent 50%)',
        fontFamily: 'Plus Jakarta Sans',
        padding: 80,
        boxSizing: 'border-box',
      },
      children: [
        // Big disc, photo fills the disc interior up to the white ring.
        // Photo is hard-clipped to its own circle (borderRadius applied
        // directly to the <img>) so it doesn't bleed past the disc.
        { type: 'div', props: {
          style: {
            position: 'absolute',
            top: CIRCLE_TOP,
            left: CIRCLE_LEFT,
            width: CIRCLE_DIAMETER,
            height: CIRCLE_DIAMETER,
            borderRadius: CIRCLE_RADIUS,
            border: `${CIRCLE_BORDER}px solid #ffffff`,
            backgroundColor: SURFACE,
            display: 'flex',
            boxShadow: CIRCLE_SHADOW,
          },
          children: [
            { type: 'img', props: {
              src: heroDataUri,
              width: CIRCLE_DIAMETER,
              height: CIRCLE_DIAMETER,
              style: {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: CIRCLE_RADIUS,
              },
            } },
          ],
        } },

        // FetchRated wordmark — homepage nav uses Newsreader bold
        // (`font-headline font-bold text-primary`), not Plus Jakarta Sans.
        { type: 'div', props: {
          style: {
            fontFamily: 'Newsreader',
            fontWeight: 700,
            fontSize: 36,
            color: PRIMARY,
            marginBottom: 'auto',
            letterSpacing: '-0.01em',
          },
          children: 'FetchRated',
        } },

        // Headline — disc now sits further right (left edge at x=720), so
        // the text panel has the original 72pt headline back.
        { type: 'div', props: {
          style: {
            fontFamily: 'Newsreader',
            fontWeight: 700,
            fontSize: 72,
            color: ON_SURFACE,
            lineHeight: 1.1,
            display: 'flex',
            flexDirection: 'column',
            marginTop: 0,
            maxWidth: 600,
          },
          children: [
            { type: 'div', props: { children: 'The trusted guide' } },
            { type: 'div', props: {
              style: { display: 'flex' },
              children: [
                'to ',
                { type: 'span', props: {
                  style: { fontStyle: 'italic', color: PRIMARY, marginLeft: 16 },
                  children: 'pet care.',
                } },
              ],
            } },
          ],
        } },

        // Subheadline — back to fuller text now that the panel has room.
        { type: 'div', props: {
          style: {
            marginTop: 32,
            fontSize: 26, fontWeight: 400, color: ON_SURFACE_VARIANT,
            lineHeight: 1.35,
            display: 'flex', flexDirection: 'column',
            maxWidth: 600,
          },
          children: [
            { type: 'div', props: { children: 'Find verified UK veterinary practices,' } },
            { type: 'div', props: { children: 'with quality standards and real reviews.' } },
          ],
        } },

        // URL + accent line at the bottom
        { type: 'div', props: {
          style: {
            marginTop: 'auto', display: 'flex', flexDirection: 'column',
            fontSize: 20, fontWeight: 500, color: ON_SURFACE_VARIANT,
          },
          children: [
            { type: 'div', props: { children: 'fetchrated.com' } },
            { type: 'div', props: { style: { marginTop: 8, width: 180, height: 3, backgroundColor: PRIMARY, opacity: 0.6 } } },
          ],
        } },
      ],
    },
  };

  const svg = await satori(tree, {
    width: W, height: H,
    fonts: [
      { name: 'Newsreader', data: newsreader, weight: 700, style: 'normal' },
      { name: 'Newsreader', data: newsreaderItalic, weight: 700, style: 'italic' },
      { name: 'Plus Jakarta Sans', data: jakarta400, weight: 400, style: 'normal' },
      { name: 'Plus Jakarta Sans', data: jakarta400, weight: 500, style: 'normal' },
      { name: 'Plus Jakarta Sans', data: jakarta800, weight: 800, style: 'normal' },
    ],
  });

  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  console.log(`Wrote ${OUT}`);

  await buildFavicon();
}


// Favicon — single Newsreader F in brand red on the cream surface, rounded
// square. Satori embeds the glyph as paths so the SVG is self-contained
// and works without font dependencies in every browser.
async function buildFavicon() {
  const SIZE = 192; // source size; SVG scales to any favicon dimension

  const tree = {
    type: 'div',
    props: {
      style: {
        width: SIZE, height: SIZE,
        display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: SURFACE,
        borderRadius: 32,
      },
      children: [
        { type: 'div', props: {
          style: {
            fontFamily: 'Newsreader',
            fontWeight: 700,
            fontSize: 156,
            color: PRIMARY,
            // The serif F sits a hair high optically without a nudge.
            transform: 'translateY(6px)',
            lineHeight: 1,
          },
          children: 'F',
        } },
      ],
    },
  };

  const svg = await satori(tree, {
    width: SIZE, height: SIZE,
    fonts: [
      { name: 'Newsreader', data: newsreader, weight: 700, style: 'normal' },
    ],
  });

  fs.writeFileSync(FAVICON_OUT, svg);
  console.log(`Wrote ${FAVICON_OUT}`);

  // Apple touch icon — same composition, rasterised to 180x180 PNG.
  // iOS doesn't support SVG icons, so we generate a PNG specifically
  // for that case.
  const appleSvg = await satori(tree, {
    width: 180, height: 180,
    fonts: [{ name: 'Newsreader', data: newsreader, weight: 700, style: 'normal' }],
  });
  await sharp(Buffer.from(appleSvg))
    .png({ compressionLevel: 9 })
    .toFile(APPLE_ICON_OUT);
  console.log(`Wrote ${APPLE_ICON_OUT}`);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
