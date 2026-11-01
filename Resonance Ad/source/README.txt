Resonance ad pipeline (all real app footage, original score)

1. Start the app:            cd resonance && npx vite --port 5191
2. Record app scenes:        node record2.mjs <work>/clips2           (deterministic 30 fps, 780x1688)
3. Original soundtrack:      node audio.mjs <work>/score.wav          (synthesized, -16 LUFS)
4. Render + encode:          copy stage.html + score.wav into <work>, then
                             node render.mjs <work> <work>/ad.mp4     (1080x1920, H.264/AAC, 30.0s)

Captions, cut timings and backgrounds live in stage.html (SHOTS list + setTime()).
Text is kept inside the Reels/Stories safe zone (clear of the top ~270px and bottom ~670px).
