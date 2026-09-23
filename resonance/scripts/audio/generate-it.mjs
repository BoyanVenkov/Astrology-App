// Generates Italian narration for every fixed meditation line, using the
// cloned Inworld voice. Writes into public/audio/meditations/it/<line>.mp3
// Run with:
//   node --env-file=scripts/audio/.env scripts/audio/generate-it.mjs

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const API_KEY = process.env.INWORLD_API_KEY
if (!API_KEY) {
  console.error('Missing INWORLD_API_KEY. Put it in scripts/audio/.env (see .env.example).')
  process.exit(1)
}

const VOICE_ID = 'dancing-comet-7283__boyan_venkov'
const MODEL_ID = 'inworld-tts-2'
const LOCALE = 'it'
const LANG_CODE = 'it-IT'
const OUT_DIR = path.join(import.meta.dirname, '..', '..', 'public', 'audio', 'meditations', LOCALE)

const LINES = {
  'med.step.settle': 'Occhi chiusi. Lascia che il corpo si posi e il respiro rallenti da solo.',
  'med.step.breath': 'Appoggia l’attenzione sul respiro — seguilo dentro, seguilo fuori. Quando la mente vaga, quell’accorgersene è la pratica. Torna, con dolcezza.',
  'med.step.close': 'Lascia andare la pratica. Nota come ti senti ora, prima di aprire gli occhi.',
  'med.step.ba.count': 'Ora conta ogni espirazione — da uno a dieci, poi ricomincia. Se perdi il conto, riparti semplicemente da uno. Nessuno tiene il punteggio.',
  'med.step.scan.0': 'Percorri l’attenzione lentamente dalle piante dei piedi verso l’alto — caviglie, gambe, fianchi, ventre, schiena, petto, braccia, mani. Riposa qualche respiro dove incontri tensione, e lascia che si ammorbidisca.',
  'med.step.scan.1': 'Ora le spalle, la gola, la mascella, lo spazio intorno agli occhi, il cuoio capelluto. Poi senti tutto il corpo insieme — pesante, caldo, che respira da solo.',
  'med.step.metta.0': 'Portati alla mente, così come sei oggi. In silenzio offri: che io sia al sicuro, che io stia bene, che io sia in pace. Ripetilo lentamente e permettiti di intenderlo davvero.',
  'med.step.metta.1': 'Porta alla mente qualcuno che ami con facilità. Immagina il suo viso e offrigli lo stesso: che tu sia al sicuro, che tu stia bene, che tu sia in pace.',
  'med.step.metta.2': 'Ora allargalo — qualcuno che conosci appena, qualcuno che trovi difficile, poi tutti, ovunque: che tutti gli esseri siano al sicuro, che tutti gli esseri siano in pace.',
  'med.step.bath.0': 'Lascia che il tono venga in primo piano. Non ascolti con sforzo — lasci che il suono arrivi, come arriva la luce.',
  'med.step.bath.1': 'Nota in quale parte del corpo il suono sembra posarsi — il petto, il cranio, le mani. Lascia che lo spazio tra te e il suono si dissolva.',
  'med.step.grat.0': 'Porta alla mente una cosa dell’ultimo giorno che è andata bene, per quanto piccola. Non limitarti a nominarla — senti dove si posa la gratitudine nel corpo.',
  'med.step.grat.1': 'Ora qualcosa che di solito dai per scontato — un corpo che funziona, un tetto, qualcuno che è rimasto. Restaci qualche respiro.',
  'med.step.grat.2': 'Un’altra — qualcosa su di te. Un modo in cui ci sei stato, una cosa che hai gestito, uno sforzo che nessuno ha visto. Tieni le tre insieme.',
  'med.step.safe.0': 'Immagina un luogo dove ti senti completamente al sicuro — reale o immaginato. Guardalo lentamente: la luce, l’ora del giorno, cosa senti, cosa percepisci sulla pelle.',
  'med.step.safe.1': 'Trova il punto qui dove più vorresti riposare, e vacci. Nulla ti è richiesto. Nulla ti raggiunge che tu non permetta.',
  'med.step.mtn.0': 'Immagina una montagna — la sua base ampia, i suoi fianchi solidi, la sua vetta ferma. Lascia che il tuo corpo e la montagna siano la stessa forma: la seduta come base, la colonna come pendio, la testa come cima.',
  'med.step.mtn.1': 'Il tempo va e viene intorno alla montagna — luce, nuvola, vento, tempesta. I tuoi pensieri e i tuoi umori sono il tempo. La montagna non discute con esso, e non ne viene diminuita.',
  'med.step.open.0': 'Lascia andare l’ancora del respiro. Lascia che l’attenzione sia spalancata, non su nulla in particolare. Suoni, sensazioni, pensieri sorgono e passano — non li insegui né li allontani.',
  'med.step.open.1': 'Nota che la consapevolezza stessa non si muove. Le cose accadono al suo interno, come le nuvole accadono nel cielo. Riposa come quel cielo — niente da aggiungere, niente da togliere.',
  'med.step.morn.0': 'Tre respiri più pieni, un po’ più profondi del solito — lascia che sveglino il corpo da dentro. Ruota le spalle indietro una volta e senti il fronte del corpo aprirsi.',
  'med.step.morn.1': 'Porta alla mente la giornata che viene, senza stringere, poi scegli un’intenzione — non un compito, un modo di essere. Paziente. Onesto. Coraggioso. Gentile. Dillo una volta: oggi sarò ___.',
  'med.step.eve.0': 'Lascia che la giornata scorra leggera, come il paesaggio dal finestrino di un treno — mattina, mezzogiorno, sera. Non fermarti su nulla. Se un momento tira, annotalo e di’: non ora.',
  'med.step.eve.1': 'Trova un momento di cui sei contento che sia accaduto, e una cosa che hai fatto bene quanto potevi. Che questo basti. Ora lascia andare l’intera giornata — è completa semplicemente perché è finita.',
  'med.step.nidra.0': 'Sdraiati completamente immobile — più immobile di quanto sembri naturale, solo il respiro si muove. Fissa una breve intenzione, una sola frase calma al presente. Dilla dentro tre volte.',
  'med.step.nidra.1': 'Porta l’attenzione a ogni punto man mano che viene nominato, senza muoverti — mano destra: pollice, dita, palmo, polso, avambraccio, gomito, spalla. Poi lo stesso a sinistra.',
  'med.step.nidra.2': 'Entrambi i fianchi. Gamba destra — coscia, ginocchio, stinco, caviglia, piede, dita. Gamba sinistra uguale. Tutta la schiena contro il pavimento, il ventre che sale e scende, il petto, la gola.',
  'med.step.nidra.3': 'Il viso — mascella, labbra, naso, guance, occhi, lo spazio tra le sopracciglia, il cuoio capelluto. Ora tutto il corpo insieme, che brilla lieve, sostenuto dal pavimento. Torna alla tua intenzione.',
  'med.step.chakra.root.0': 'Porta la tua attenzione alla base della colonna, dove incontri il terreno. Questo è il tuo centro radice — custodisce il tuo senso di sicurezza, di avere abbastanza, di avere il permesso di essere semplicemente qui. Se oggi ti sei sentito instabile, quella stabilità comincia proprio qui.',
  'med.step.chakra.root.1': 'Respira come se il respiro stesso arrivasse fino in fondo. In silenzio, al ritmo del respiro: Sono al sicuro. Sono qui. Ho ciò che mi serve.',
  'med.step.chakra.sacral.0': 'Porta la tua attenzione al basso ventre, un palmo sotto l’ombelico. Questo è il tuo centro sacrale — custodisce la tua capacità di sentire, di goderti le cose, di lasciare che la vita si muova invece di irrigidirti.',
  'med.step.chakra.sacral.1': 'Lascia che il respiro ammorbidisca questo spazio invece di stringerlo. In silenzio, al ritmo del respiro: Lascio che la vita si muova attraverso di me.',
  'med.step.chakra.solar-plexus.0': 'Porta la tua attenzione al punto morbido sotto le costole. Questo è il tuo plesso solare — il tuo fuoco, la tua volontà, la parte di te che decide e agisce invece di ritrarsi.',
  'med.step.chakra.solar-plexus.1': 'Lascia che il respiro lo ravvivi con dolcezza, senza forzarlo. In silenzio, al ritmo del respiro: Mi fido del mio fuoco.',
  'med.step.chakra.heart.0': 'Porta la tua attenzione al centro del petto. Questo è il tuo centro del cuore — ciò che ti permette di dare senza perdere te stesso, e di ricevere senza proteggerti.',
  'med.step.chakra.heart.1': 'Lascia che il respiro allarghi questo spazio, davanti e dietro. In silenzio, al ritmo del respiro: Do e ricevo amore liberamente.',
  'med.step.chakra.throat.0': 'Porta la tua attenzione all’incavo della gola. Questa è la tua voce — ciò che ti permette di dire la cosa vera invece di quella facile.',
  'med.step.chakra.throat.1': 'Lascia che il respiro passi qui senza ostacoli. In silenzio, al ritmo del respiro: Dico la mia verità con facilità.',
  'med.step.chakra.third-eye.0': 'Porta la tua attenzione allo spazio tra le sopracciglia. Qui è dove percepisci ciò che sai prima di poterlo spiegare.',
  'med.step.chakra.third-eye.1': 'Lascia che il respiro plachi il rumore, così che si possa sentire quella conoscenza più silenziosa. In silenzio, al ritmo del respiro: Mi fido di ciò che vedo dentro.',
  'med.step.chakra.crown.0': 'Porta la tua attenzione alla sommità del capo, e un po’ più su. Qui è dove ti connetti a qualcosa di più grande delle preoccupazioni di oggi.',
  'med.step.chakra.crown.1': 'Lascia che il respiro salga dolcemente attraverso tutto il corpo per incontrarlo. In silenzio, al ritmo del respiro: Sono parte di qualcosa di vasto, e mi sostiene.',
}

async function synthesize(text) {
  const res = await fetch('https://api.inworld.ai/tts/v1/voice', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      voiceId: VOICE_ID,
      modelId: MODEL_ID,
      audioConfig: { speakingRate: 0.9 },
      deliveryMode: 'BALANCED',
      language: LANG_CODE,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`HTTP ${res.status}: ${body}`)
  }

  const json = await res.json()
  return Buffer.from(json.audioContent, 'base64')
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  let ok = 0
  let failed = 0

  for (const [key, text] of Object.entries(LINES)) {
    const outPath = path.join(OUT_DIR, `${key}.mp3`)
    process.stdout.write(`${key}... `)
    try {
      const audio = await synthesize(text)
      await writeFile(outPath, audio)
      console.log(`ok (${audio.length} bytes)`)
      ok++
    } catch (err) {
      console.log('FAILED')
      console.error(`  ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone: ${ok} succeeded, ${failed} failed.`)
  console.log(`Output: ${OUT_DIR}`)
}

main()
