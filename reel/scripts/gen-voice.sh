#!/usr/bin/env bash
# Genera la voz en off con ElevenLabs (la clave la inyecta el proxy del entorno; no se guarda en el repo).
# Uso: bash scripts/gen-voice.sh [voice_id]   → public/voice/<lang>/<linea>.mp3 + public/voice/timing.json
set -e
cd "$(dirname "$0")/.."
VOICE="${1:-TX3LPaxmHKxFdv7VOQHJ}"   # "Liam": voz masculina joven y enérgica (multilingüe)
python3 - "$VOICE" <<'PY'
import json, subprocess, sys, os
voice = sys.argv[1]
lines = json.load(open("scripts/voice-lines.json"))
timing = {}
for lang, parts in lines.items():
    os.makedirs(f"public/voice/{lang}", exist_ok=True)
    timing[lang] = {}
    for key, text in parts.items():
        out = f"public/voice/{lang}/{key}.mp3"
        body = json.dumps({"text": text, "model_id": "eleven_multilingual_v2",
                           "voice_settings": {"stability": 0.4, "similarity_boost": 0.8, "style": 0.45, "use_speaker_boost": True}})
        code = subprocess.run(["curl", "-sS", "--max-time", "90", "-o", out, "-w", "%{http_code}", "-H", "Content-Type: application/json",
                               "-X", "POST", f"https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=mp3_44100_128", "-d", body],
                              capture_output=True, text=True).stdout
        if code != "200":
            sys.exit(f"{lang}/{key}: HTTP {code} {open(out,'rb').read()[:200]!r}")
        dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out], capture_output=True, text=True).stdout)
        timing[lang][key] = round(dur, 3)
        print(f"{lang}/{key}: {dur:.2f}s")
json.dump(timing, open("public/voice/timing.json", "w"), indent=2)
PY
