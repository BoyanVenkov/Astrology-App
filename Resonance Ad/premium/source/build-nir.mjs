// Builds stage-nir.html: the shared styles of stage.html + nir-body.html.
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const SRC = path.dirname(fileURLToPath(import.meta.url))
const base = readFileSync(path.join(SRC, 'stage.html'), 'utf8')
const head = base.slice(0, base.indexOf('</head>'))
writeFileSync(path.join(SRC, 'stage-nir.html'), `${head}</head>\n<body>\n${readFileSync(path.join(SRC, 'nir-body.html'), 'utf8')}`)
console.log('built stage-nir.html')
