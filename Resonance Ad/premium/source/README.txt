RESONANCE — "The Universe Is Speaking" (45s premium spot, 9:16, 4K/24fps)

Everything is generated from the app itself + Gemini (key in resonance/scripts/assets/.env):
  - visuals: the real app (recorded), the app's own art remastered to 4K, one new eclipse
  - voice:   Gemini TTS, voice "Sulafat" (warm female); best of 3 takes per line, rated by Gemini
  - score:   Lyria 3.5 (instrumental), shifted so its drop lands at 28s, hard-cut at 39s
  - sfx:     heartbeat, swell, boom and the closing chime are synthesized (no samples)

Steps (work dir = ../work):
1. App:        cd resonance && npx vite --port 5191
2. Art:        node gen-art.mjs ../work                 (lake, meditate, altar, observatory, moon, eclipse)
3. App clips:  node record-premium.mjs ../work/clips    (24fps, 1287x2785; + card-back/face = The Star)
4. Voice:      node gen-audio.mjs ../work vo            then  node takes.mjs ../work 3 vo1=hushed vo2=grounded ...
   Score:      node gen-audio.mjs ../work score
5. Mix:        node mix.mjs ../work                     (STEM=music|vo renders stems for balance checks)
6. Review:     node render.mjs ../work stills 1,6,12,...
   Frames:     node render.mjs ../work frames 4         (resumable — skips frames already rendered)
   Encode:     node render.mjs ../work encode <out-basename>
QA by ear:     node qa-audio.mjs <file>                 (Gemini listens and critiques)

Timeline, captions and voice timings live in stage.html (VO, TITLES, SHOTS, PHONE).
Voice placement lives in mix.mjs (VO offsets) — keep the two in sync.
Text stays in the Reels safe zone (clear of the top ~270px).
