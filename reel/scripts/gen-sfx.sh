#!/usr/bin/env bash
# Efectos de sonido con ElevenLabs (sound-generation) → public/sfx/*.mp3
set -e
cd "$(dirname "$0")/.."
mkdir -p public/sfx
gen () { # nombre, duración, descripción
  code=$(curl -sS --max-time 90 -o "public/sfx/$1.mp3" -w "%{http_code}" -H "Content-Type: application/json" -X POST https://api.elevenlabs.io/v1/sound-generation \
    -d "{\"text\": \"$3\", \"duration_seconds\": $2, \"prompt_influence\": 0.6}")
  [ "$code" = "200" ] || { echo "$1: HTTP $code"; head -c 200 "public/sfx/$1.mp3"; exit 1; }
  echo "$1: ok"
}
gen whoosh 0.6 "fast clean whoosh swipe transition, short, modern social media edit"
gen pop 0.5 "soft short UI pop bubble click, subtle, clean"
gen impact 1.2 "deep cinematic bass hit impact with short reverb tail, punchy"
gen riser 1.5 "short rising synth swell building tension, modern, clean"
gen ding 1.0 "bright cheerful notification chime, success sound, short"
