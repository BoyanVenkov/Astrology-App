#!/usr/bin/env bash
# Flags frames whose brightness jumps against both neighbours (half-painted frames, flashes).
# Usage: bash check-frames.sh <workDir> [threshold]
W="$1"; TH="${2:-3}"; TAG="${STAGE:+-$STAGE}${CUT:+-$CUT}${HD:+-hd}"
ffmpeg -hide_banner -loglevel error -framerate 24 -i "$W/frames${TAG}/%04d.jpg" \
  -vf "scale=270:480,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=$W/yavg.txt" -f null -
grep -o "YAVG=[0-9.]*" "$W/yavg.txt" | cut -d= -f2 | awk -v th="$TH" '
  { y[NR] = $1 }
  END {
    n = 0
    for (i = 2; i < NR; i++) {
      a = y[i] - y[i-1]; b = y[i] - y[i+1]
      # a spike = moves away from BOTH neighbours in the same direction (smooth fades do not)
      if (a * b > 0) { d = (a < 0 ? -a : a); e = (b < 0 ? -b : b); m = (d < e ? d : e)
        if (m > th) { printf "frame %04d (%.2fs) Y=%.1f  prev %.1f  next %.1f\n", i-1, (i-1)/24, y[i], y[i-1], y[i+1]; n++ } }
    }
    printf "%d of %d frames flagged (threshold %s)\n", n, NR, th
  }'
