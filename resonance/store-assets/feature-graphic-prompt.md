# Google Play feature graphic — Gemini prompt

Spec: **1024 × 500 px**, JPEG or 24-bit PNG (no transparency), max 15 MB, RGB.
Shown at the top of the store listing and small in search — must read at thumbnail size,
must not be mostly text, no ratings/awards/prices (Play policy).

---

## Prompt A — full banner (logo + app screens + atmosphere)

```
A premium Google Play feature graphic, exactly 1024 x 500 pixels, a wide cinematic
landscape banner for a calm astrology-and-wellness app called Resonance.

COMPOSITION, left to right:
- Left third: a large elegant four-pointed golden star emblem — a slender compass-star
  / sparkle inside a faint thin orbital ring — in brushed gold. Below it the word
  "Resonance" in a refined high-contrast modern serif (Fraunces style, literary,
  elegant) with a warm gold-to-cream gradient. Beneath that, smaller, in soft
  off-white: "The sky, read for you".
- Centre to right: three sleek modern smartphones floating at gentle angles, slightly
  overlapping, soft long shadows, screens glowing:
  Phone 1 — a circular astrological birth-chart wheel: twelve zodiac segments, fine
  gold linework, planet glyphs, thin aspect lines, on a deep navy screen.
  Phone 2 — one softly glowing orb centred on screen (a breathing / meditation circle)
  with a short line of serif text above it and a warm halo; very minimal.
  Phone 3 — an illustrated tarot card with celestial art (a star, gold ink on
  midnight) and, down one edge, a vertical row of seven small glowing dots in rainbow
  order: red, orange, yellow, green, blue, indigo, violet.

BACKGROUND & ATMOSPHERE:
Deep vertical gradient from near-black midnight blue at the edges to a dark indigo glow
near the top centre. A very faint oversized astrological chart wheel and thin
constellation lines etched across the whole background in low-opacity gold. Scattered
fine gold stardust and a few soft bokeh sparkles. A faint crescent moon low in the
upper right. Cinematic, spacious, unhurried.

STYLE: ultra-premium, modern, mystical but restrained — a luxury wellness brand meets
an observatory. Soft volumetric glow, gentle depth of field, high production value.
Not cartoonish, not cluttered, not neon.

COLOR PALETTE: midnight navy #03040c and #0a0f1f, deep indigo #25356f, brushed gold
#d4af37 and pale gold #f2dc9c, a single soft emerald accent #34d399 used sparingly in
one phone's glow, off-white #e9edfa for small text.

LAYOUT SAFETY: keep the emblem and all text inside the left 40% and clear of the outer
8% margins and the exact centre of the image (a circular play icon may be overlaid in
the middle). Crisp and legible at thumbnail size. Generous negative space.

DO NOT INCLUDE: award badges, star ratings, "Editor's Choice", price tags,
"#1"/"best"/"top" text, app-store download buttons, watermarks, lens-flare clutter,
garbled or misspelled text, human faces, pentagrams or heavy occult symbols.
```

---

## Prompt B — art only, no text (recommended: add the wordmark yourself after)

Same as Prompt A, but replace the "Left third" line with:

```
- Left third: clean, uncluttered dark-gradient space with only the faint background
  chart-wheel texture — NO text and NO logo — left empty for typography to be added
  later. Put all the detail into the floating phone mockups and the atmosphere.
```

Then drop a crisp "Resonance / The sky, read for you" wordmark onto the left third in
Figma / Canva / Photopea for pixel-sharp type. This almost always beats AI-rendered text.

---

## Alt style direction (swap into either prompt)

Replace the three-phones block with a single hero phone, centre-right, larger, showing
the Today screen — a glowing aura orb, a serif mantra line, and a "Today's practice"
card with three small tiles (Meditate / Breathe / Frequency). Around it, floating and
out of focus, small translucent cards hint at the other features: a mini chart wheel, a
tarot card, a moon phase, a rune stone. Cleaner, more focus, one clear "this is the
app" read.

---

## Workflow tips

1. **Best results:** attach your 3 strongest real screenshots and add:
   "Place these three screenshots into the floating phone mockups exactly, keep them
   undistorted and sharp." Nano Banana / Gemini image editing handles this well and you
   get real UI instead of an AI approximation.
2. Generate 4–6, pick the composition, then refine with follow-ups
   ("more negative space on the left", "warmer gold", "remove the third phone").
3. Export exactly **1024 × 500**. If the model outputs 16:9, extend/outpaint the sides
   or crop to 500 height — keep the left third and phones intact.
4. Make a matching **1024 × 500** for the Play Store and reuse the same art, cropped, for
   social (Instagram 1080×1080 centre-crop, X/Twitter 1500×500).
