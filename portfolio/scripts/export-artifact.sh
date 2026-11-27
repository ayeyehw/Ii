#!/usr/bin/env bash
# Exporta el portafolio como sitio estático con rutas relativas (para publicarlo como Artifact).
# Uso: bash scripts/export-artifact.sh [carpeta-salida]   (por defecto /tmp/portfolio-export)
# Resultado: <salida>/page.html + archivos; imprime la lista de archivos en JSON.
set -e
S="${1:-/tmp/portfolio-export}"
cd "$(dirname "$0")/.."
printf "module.exports = { assetPrefix: \".\", trailingSlash: false };\n" > next.config.js
rm -rf .next $S/site
NODE_OPTIONS=--openssl-legacy-provider npx next build >/dev/null 2>&1
NODE_OPTIONS=--openssl-legacy-provider npx next export -o $S/site >/dev/null 2>&1
rm -f next.config.js; rm -rf .next
cd $S/site
python3 - <<'PY'
import re,glob,os
for f in glob.glob('_next/static/css/*.css'):
    s=open(f).read().replace('url(_next/static/media/','url(../media/'); open(f,'w').write(s)
pat=re.compile(r'"/(work|stickers|me|favicon)')
for f in glob.glob('_next/static/chunks/**/*.js',recursive=True)+['index.html']:
    s=open(f).read(); s2=pat.sub(r'"./\1',s)
    if s2!=s: open(f,'w').write(s2)
html=open('index.html').read()
head=re.search(r'<head>(.*)</head>',html,re.S).group(1)
body=re.search(r'<body[^>]*>(.*)</body>',html,re.S).group(1)
head=re.sub(r'<meta charSet="utf-8"/>','',head)
head=re.sub(r'<meta name="viewport"[^>]*/>','',head)
head=re.sub(r'<title>[^<]*</title>','<title>Alejandro Sanchez</title>',head)
open('page.html','w').write(head+'\n<meta name="claude:viewport-fit-sides" content="cover">\n'+body)
PY
mv _next nx
grep -rl '_next/' nx page.html | xargs sed -i 's#_next/#nx/#g'
find . -type f ! -name index.html ! -name 404.html ! -name page.html | sed 's#^\./##' | python3 -c "import sys,json;print(json.dumps([l.strip() for l in sys.stdin]))"
