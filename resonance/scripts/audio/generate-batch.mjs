// Generates narration for every remaining fixed meditation line, in English
// and Bulgarian, using the cloned Inworld voice. Writes straight into
// public/audio/meditations/<locale>/<line-key>.mp3 (the layout the app reads).
// Run with:
//   node --env-file=scripts/audio/.env scripts/audio/generate-batch.mjs

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const API_KEY = process.env.INWORLD_API_KEY
if (!API_KEY) {
  console.error('Missing INWORLD_API_KEY. Put it in scripts/audio/.env (see .env.example).')
  process.exit(1)
}

const VOICE_ID = 'dancing-comet-7283__boyan_venkov'
const MODEL_ID = 'inworld-tts-2'
const OUT_ROOT = path.join(import.meta.dirname, '..', '..', 'public', 'audio', 'meditations')

const LINES = [
  // ---- the 11 fixed-script meditations (24 remaining lines) ----
  { key: 'med.step.scan.0', en: 'Sweep your attention slowly from the soles of your feet upward — ankles, legs, hips, belly, back, chest, arms, hands. Rest a few breaths wherever you meet tension, and let it soften.', bg: 'Премини бавно с вниманието от стъпалата нагоре — глезени, крака, ханш, корем, гръб, гърди, ръце, длани. Задръж по няколко дишания там, където срещнеш напрежение, и го остави да се смекчи.' },
  { key: 'med.step.scan.1', en: 'Now the shoulders, throat, jaw, the space around the eyes, the scalp. Then feel the whole body at once — heavy, warm, breathing on its own.', bg: 'Сега раменете, гърлото, челюстта, пространството около очите, скалпа. После усети цялото тяло наведнъж — тежко, топло, дишащо само.' },
  { key: 'med.step.metta.0', en: 'Bring yourself to mind, just as you are today. Silently offer: may I be safe, may I be well, may I be at ease. Repeat it slowly, and let yourself mean it.', bg: 'Извикай себе си в ума, точно такъв, какъвто си днес. Мълчаливо предложи: нека съм в безопасност, нека съм добре, нека съм спокоен. Повтори го бавно и си позволи да го мислиш.' },
  { key: 'med.step.metta.1', en: 'Bring to mind someone you love easily. Picture their face and offer the same: may you be safe, may you be well, may you be at ease.', bg: 'Извикай в ума някого, когото обичаш лесно. Представи си лицето му и предложи същото: нека си в безопасност, нека си добре, нека си спокоен.' },
  { key: 'med.step.metta.2', en: 'Now widen it — someone you barely know, someone you find difficult, then everyone, everywhere: may all beings be safe, may all beings be at ease.', bg: 'Сега разшири го — някой, когото едва познаваш, някой, който ти е труден, после всички, навсякъде: нека всички същества са в безопасност, нека всички същества са спокойни.' },
  { key: 'med.step.bath.0', en: 'Let the tone come into the foreground. You are not listening hard — you are letting the sound arrive, the way light arrives.', bg: 'Нека тонът излезе на преден план. Не слушаш напрегнато — оставяш звука да пристига, както пристига светлината.' },
  { key: 'med.step.bath.1', en: 'Notice where in the body the sound seems to land — the chest, the skull, the hands. Let the space between you and the sound dissolve.', bg: 'Забележи къде в тялото сякаш попада звукът — гърдите, черепа, дланите. Нека пространството между теб и звука се разтвори.' },
  { key: 'med.step.grat.0', en: 'Bring to mind one thing from the last day that went well, however small. Don’t just name it — feel where the appreciation sits in the body.', bg: 'Извикай в ума едно нещо от последния ден, което мина добре, колкото и малко да е. Не просто го назовавай — усети къде седи признателността в тялото.' },
  { key: 'med.step.grat.1', en: 'Now something you usually take for granted — a working body, a roof, someone who stayed. Stay with it a few breaths.', bg: 'Сега нещо, което обикновено приемаш за даденост — работещо тяло, покрив, някой, който остана. Остани с него няколко дишания.' },
  { key: 'med.step.grat.2', en: 'One more — something about yourself. A way you showed up, a thing you handled, an effort no one saw. Hold all three together.', bg: 'Още едно — нещо за самия теб. Начин, по който се появи, нещо, с което се справи, усилие, което никой не видя. Задръж и трите заедно.' },
  { key: 'med.step.safe.0', en: 'Picture a place where you feel completely safe — real or imagined. Look around slowly: the light, the time of day, what you hear, what you feel against your skin.', bg: 'Представи си място, където се чувстваш напълно в безопасност — истинско или въображаемо. Огледай го бавно: светлината, времето на деня, какво чуваш, какво усещаш върху кожата.' },
  { key: 'med.step.safe.1', en: 'Find the spot here where you’d most want to rest, and go there. Nothing is required of you. Nothing reaches you that you don’t allow.', bg: 'Намери мястото тук, където най-много би искал да починеш, и иди там. Нищо не се изисква от теб. Нищо не те достига, което не позволиш.' },
  { key: 'med.step.mtn.0', en: 'Picture a mountain — its broad base, its solid sides, its still peak. Let your body and the mountain become the same shape: seat as base, spine as slope, head as summit.', bg: 'Представи си планина — широката ѝ основа, стабилните ѝ склонове, неподвижния ѝ връх. Нека тялото и планината станат една форма: седалището — основа, гръбнакът — склон, главата — връх.' },
  { key: 'med.step.mtn.1', en: 'Weather comes and goes around the mountain — light, cloud, wind, storm. Your thoughts and moods are the weather. The mountain does not argue with it, and is not made less by it.', bg: 'Времето идва и си отива около планината — светлина, облак, вятър, буря. Мислите и настроенията ти са времето. Планината не спори с него и не става по-малка от него.' },
  { key: 'med.step.open.0', en: 'Let the anchor of the breath go. Let attention be wide open, not on anything in particular. Sounds, sensations, thoughts arise and pass — you neither chase them nor push them away.', bg: 'Пусни котвата на дъха. Нека вниманието е широко отворено, не върху нещо конкретно. Звуци, усещания, мисли възникват и отминават — не ги гониш и не ги отблъскваш.' },
  { key: 'med.step.open.1', en: 'Notice that awareness itself is not moving. Things happen within it, the way clouds happen within the sky. Rest as that sky — nothing to add, nothing to remove.', bg: 'Забележи, че самото осъзнаване не се движи. Нещата се случват в него, както облаците в небето. Почини като това небе — нищо за добавяне, нищо за махане.' },
  { key: 'med.step.morn.0', en: 'Three fuller breaths, a little deeper than normal — let them wake the body from the inside. Roll the shoulders back once and feel the front of the body open.', bg: 'Три по-пълни дишания, малко по-дълбоки от обичайното — нека събудят тялото отвътре. Завърти раменете назад веднъж и усети как предната част на тялото се отваря.' },
  { key: 'med.step.morn.1', en: 'Bring the day ahead loosely to mind, then choose one intention — not a task, a way of being. Patient. Honest. Brave. Kind. Say it once: today, I will be ___.', bg: 'Извикай предстоящия ден свободно в ума, после избери едно намерение — не задача, а начин на битие. Търпелив. Честен. Смел. Мил. Кажи го веднъж: днес ще бъда ___.' },
  { key: 'med.step.eve.0', en: 'Let the day replay lightly, like scenery from a train window — morning, midday, evening. Don’t stop on anything. If a moment tugs, note it and say: not now.', bg: 'Нека денят се превърти леко, като пейзаж от прозорец на влак — сутрин, обед, вечер. Не спирай на нищо. Ако някой момент дърпа, отбележи го и кажи: не сега.' },
  { key: 'med.step.eve.1', en: 'Find one moment you’re glad happened, and one thing you did as well as you could. Let that be enough. Now let the whole day go — it is complete simply because it is over.', bg: 'Намери един момент, за който си доволен, че се случи, и едно нещо, което направи толкова добре, колкото можа. Нека това е достатъчно. Сега пусни целия ден — завършен е просто защото свърши.' },
  { key: 'med.step.nidra.0', en: 'Lie completely still — stiller than feels natural, only the breath moving. Set a short intention, a single calm sentence in the present tense. Say it inwardly three times.', bg: 'Легни напълно неподвижно — по-неподвижно, отколкото усещаш за естествено, само дъхът се движи. Задай кратко намерение, едно спокойно изречение в сегашно време. Кажи го наум три пъти.' },
  { key: 'med.step.nidra.1', en: 'Bring attention to each place as it is named, without moving — right hand: thumb, fingers, palm, wrist, forearm, elbow, shoulder. Then the same on the left.', bg: 'Насочвай вниманието към всяко място, щом бъде назовано, без да мърдаш — дясна ръка: палец, пръсти, длан, китка, предмишница, лакът, рамо. После същото отляво.' },
  { key: 'med.step.nidra.2', en: 'Both hips. Right leg — thigh, knee, shin, ankle, foot, toes. Left leg the same. The whole back against the floor, the belly rising and falling, the chest, the throat.', bg: 'Двата ханша. Десен крак — бедро, коляно, пищял, глезен, стъпало, пръсти. Ляв крак също. Целият гръб върху пода, коремът, който се повдига и спада, гърдите, гърлото.' },
  { key: 'med.step.nidra.3', en: 'The face — jaw, lips, nose, cheeks, eyes, the space between the brows, the scalp. Now the whole body at once, glowing faintly, held by the floor. Return to your intention.', bg: 'Лицето — челюст, устни, нос, бузи, очи, пространството между веждите, скалпа. Сега цялото тяло наведнъж, светещо слабо, държано от пода. Върни се към намерението си.' },

  // ---- chakra alignment: fixed support script per focus centre (14 lines) ----
  { key: 'med.step.chakra.root.0', en: 'Bring your attention to the base of your spine, where you meet the ground. This is your root — it holds your sense of safety, of having enough, of being allowed to simply be here. If today has felt unsteady, that steadiness starts right here.', bg: 'Насочи вниманието си към основата на гръбнака ти, там където срещаш земята. Това е твоят корен — той носи усещането ти за сигурност, за достатъчност, за правото просто да бъдеш тук. Ако денят днес е бил разклащащ, тази стабилност започва точно тук.' },
  { key: 'med.step.chakra.root.1', en: 'Breathe as if the breath itself reached all the way down. Silently, in time with the breath: I am safe. I am here. I have what I need.', bg: 'Дишай, сякаш самият дъх стига чак дотам. Мълчаливо, в ритъма на дъха: В безопасност съм. Тук съм. Имам това, от което се нуждая.' },
  { key: 'med.step.chakra.sacral.0', en: 'Bring your attention to your lower belly, a hand’s width below the navel. This is your sacral centre — it holds your capacity to feel, to enjoy, to let life move rather than freezing around it.', bg: 'Насочи вниманието си към долната част на корема ти, на длан под пъпа. Това е твоят сакрален център — той носи способността ти да чувстваш, да се наслаждаваш, да оставяш живота да тече, вместо да замръзваш пред него.' },
  { key: 'med.step.chakra.sacral.1', en: 'Let the breath soften this space rather than tighten it. Silently, in time with the breath: I let life move through me.', bg: 'Остави дъха да омекотява това пространство, вместо да го стяга. Мълчаливо, в ритъма на дъха: Оставям живота да преминава през мен.' },
  { key: 'med.step.chakra.solar-plexus.0', en: 'Bring your attention to the soft place beneath your ribs. This is your solar plexus — your fire, your will, the part of you that decides and acts rather than shrinks.', bg: 'Насочи вниманието си към мекото място под ребрата. Това е твоят слънчев сплит — твоят огън, твоята воля, частта от теб, която решава и действа, вместо да се свива.' },
  { key: 'med.step.chakra.solar-plexus.1', en: 'Let the breath stoke it gently, not force it. Silently, in time with the breath: I trust my own fire.', bg: 'Остави дъха нежно да го разпалва, без да го насилва. Мълчаливо, в ритъма на дъха: Доверявам се на собствения си огън.' },
  { key: 'med.step.chakra.heart.0', en: 'Bring your attention to the centre of your chest. This is your heart centre — what lets you give without losing yourself, and receive without guarding.', bg: 'Насочи вниманието си към центъра на гърдите ти. Това е твоят сърдечен център — той ти позволява да даваш, без да губиш себе си, и да получаваш, без да се пазиш.' },
  { key: 'med.step.chakra.heart.1', en: 'Let the breath widen this space, front and back. Silently, in time with the breath: I give and receive love freely.', bg: 'Остави дъха да разширява това пространство, отпред и отзад. Мълчаливо, в ритъма на дъха: Давам и приемам любов свободно.' },
  { key: 'med.step.chakra.throat.0', en: 'Bring your attention to the hollow of your throat. This is your voice — what lets you say the true thing instead of the easy thing.', bg: 'Насочи вниманието си към вдлъбнатината на гърлото ти. Това е твоят глас — той ти позволява да кажеш истинското нещо, а не лесното.' },
  { key: 'med.step.chakra.throat.1', en: 'Let the breath move through here unobstructed. Silently, in time with the breath: I speak my truth with ease.', bg: 'Остави дъха да преминава оттук необезпокоявано. Мълчаливо, в ритъма на дъха: Изричам истината си с лекота.' },
  { key: 'med.step.chakra.third-eye.0', en: 'Bring your attention to the space between your brows. This is where you sense what you know before you can explain it.', bg: 'Насочи вниманието си към пространството между веждите ти. Тук усещаш това, което знаеш, преди да можеш да го обясниш.' },
  { key: 'med.step.chakra.third-eye.1', en: 'Let the breath settle the noise so that quieter knowing can be heard. Silently, in time with the breath: I trust what I see within.', bg: 'Остави дъха да утаи шума, за да се чуе по-тихото знание. Мълчаливо, в ритъма на дъха: Доверявам се на това, което виждам вътре.' },
  { key: 'med.step.chakra.crown.0', en: 'Bring your attention to the crown of your head, and a little above it. This is where you connect to something larger than today’s concerns.', bg: 'Насочи вниманието си към темето на главата ти и малко над него. Тук се свързваш с нещо по-голямо от днешните грижи.' },
  { key: 'med.step.chakra.crown.1', en: 'Let the breath rise gently through the whole body to meet it. Silently, in time with the breath: I am part of something vast, and it holds me.', bg: 'Остави дъха нежно да се издига през цялото тяло, за да го срещне. Мълчаливо, в ритъма на дъха: Част съм от нещо необятно и то ме държи.' },
]

async function synthesize(text, languageCode) {
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
      language: languageCode,
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
  let ok = 0
  let failed = 0

  for (const lang of ['en', 'bg']) {
    const langCode = lang === 'en' ? 'en-US' : 'bg-BG'
    const dir = path.join(OUT_ROOT, lang)
    await mkdir(dir, { recursive: true })

    for (const line of LINES) {
      const outPath = path.join(dir, `${line.key}.mp3`)
      process.stdout.write(`${lang}/${line.key}... `)
      try {
        const audio = await synthesize(line[lang], langCode)
        await writeFile(outPath, audio)
        console.log(`ok (${audio.length} bytes)`)
        ok++
      } catch (err) {
        console.log('FAILED')
        console.error(`  ${err.message}`)
        failed++
      }
    }
  }

  console.log(`\nDone: ${ok} succeeded, ${failed} failed.`)
  console.log(`Output: ${OUT_ROOT}`)
}

main()
