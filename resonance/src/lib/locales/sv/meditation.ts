import type { MeditationKey } from '../en/meditation'

/** Svenska — guidade meditationer: en sammanfattning man läser en gång, sedan steg som markeras av en klangskål. */
export const meditation: Record<MeditationKey, string> = {
  'med.seat.root': 'ryggradens bas, där du möter marken',
  'med.seat.sacral': 'nedre magen, en handsbredd under naveln',
  'med.seat.solar-plexus': 'den mjuka punkten under revbenen',
  'med.seat.heart': 'bröstets mitt',
  'med.seat.throat': 'halsgropen',
  'med.seat.third-eye': 'rummet mellan ögonbrynen',
  'med.seat.crown': 'hjässan, och en bit ovanför',
  'med.chakraLower': '{chakra}-centrat',

  'med.house.1': 'hur du visar dig och hur du möter världen',
  'med.house.2': 'vad du värderar och vad som stabiliserar dig',
  'med.house.3': 'ditt vardagssinne och orden du använder',
  'med.house.4': 'hem, rötter, och var du känner dig buren',
  'med.house.5': 'lek, kreativitet, och det som ger dig glädje',
  'med.house.6': 'det dagliga arbetet med att ta hand om dig själv',
  'med.house.7': 'de människor som står dig närmast',
  'med.house.8': 'det som tar slut, och det du delar på djupet',
  'med.house.9': 'meningen, och den vidare synen',
  'med.house.10': 'ditt arbete i världen och hur du blir sedd',
  'med.house.11': 'ditt folk, och det du sträcker dig mot',
  'med.house.12': 'vila, ensamhet, och stillheten under allt',

  'med.invite.Sun': 'Låt en stadig värme samlas här — ditt eget ljus, utan omvägar.',
  'med.invite.Moon': 'Låt det du känner helt enkelt vara här, utan att behöva fixas.',
  'med.invite.Mercury': 'Låt tänkandet sakta av. Du behöver inte lösa något nu.',
  'med.invite.Venus': 'Bli mjuk mot dig själv som du skulle vara mot någon du älskar.',
  'med.invite.Mars': 'Lägg märke till all värme eller brådska, och låt utandningen bära bort en del av den.',
  'med.invite.Jupiter': 'Låt det här rummet kännas lite vidare än för ett ögonblick sedan.',
  'med.invite.Saturn': 'Möt tyngden här med ärlighet. Du orkar mer än du tror.',
  'med.invite.Uranus': 'Låt något lossna — ett grepp, en gammal form du inte behöver längre.',
  'med.invite.Neptune': 'Låt konturerna suddas ut. Du får lov att inte veta ett tag.',
  'med.invite.Pluto': 'Låt det som är över vara över. Andas in i rummet det lämnar.',
  'med.invite.default': 'Låt den här energin röra sig genom dig, inte in i dig.',

  'med.ease.hard': 'Idag finns friktion i {dominant}. Du är inte här för att tränga dig igenom — bara för att känna det tydligt och stanna mjuk runt omkring.',
  'med.ease.soft': '{dominant} flödar idag. Lägg märke till lättheten, och tillåt dig att ta emot den.',
  'med.ease.neutral': '{dominant} är intensivt idag. Låt det gå genom dig i stället för att sätta sig i kroppen.',

  'med.dominant.aspect': '{planet} {verb} din radix-{other}',
  'med.dominant.sign': '{planet} i transit genom {sign}',
  'med.dominant.chartWord': 'karta',
  'med.domverb.conjunction': 'som möter',
  'med.domverb.opposition': 'i opposition till',
  'med.domverb.square': 'i kvadratur med',
  'med.domverb.trine': 'i trigon med',
  'med.domverb.sextile': 'i sextil med',

  'med.houseLine.known': 'Det här rör den del av ditt liv som handlar om {theme}. Håll det lätt. Här finns inget att bestämma — bara att lägga märke till.',
  'med.houseLine.unknown': 'Vad det än rör upp i ditt liv, låt det lägga sig under den här praktiken. Det finns kvar när du är klar, och du möter det med mer rymd.',

  'med.mantraLong.root': 'Jag är trygg. Jag är här. Jag har det jag behöver.',
  'med.mantraLong.sacral': 'Jag låter livet röra sig genom mig.',
  'med.mantraLong.solar-plexus': 'Jag litar på min eld.',
  'med.mantraLong.heart': 'Jag ger och tar emot kärlek fritt.',
  'med.mantraLong.throat': 'Jag säger min sanning med lätthet.',
  'med.mantraLong.third-eye': 'Jag litar på det jag ser inombords.',
  'med.mantraLong.crown': 'Jag är en del av något vidsträckt, och det bär mig.',

  'med.title.fallback': 'meditation för {chakra}-centrat',

  /* ---- sammanfattningen, läses en gång innan start ---- */
  'med.brief.lead': 'Läs det här en gång, blunda sedan. Varje steg öppnas med en klangskål — stanna kvar i det tills nästa.',
  'med.brief.close': 'Tre mjuka klangskålar avslutar praktiken. Kom tillbaka i din egen takt.',

  /* ---- allmänna steg ---- */
  'med.step.settle': 'Ögonen slutna. Låt kroppen sätta sig och andningen sakta av av sig själv.',
  'med.step.breath': 'Vila uppmärksamheten på andningen — följ den in, följ den ut. När sinnet vandrar är det märkandet praktiken. Kom tillbaka, mjukt.',
  'med.step.centre': 'För din uppmärksamhet till {seat}. Andas som om andningen själv nådde {chakraLower}. {planetInvite}',
  'med.step.transit': '{transitLine}',
  'med.step.affirm': 'Tyst, i takt med andningen: {affirmation}',
  'med.step.close': 'Släpp praktiken. Lägg märke till hur du känner dig nu, innan du öppnar ögonen.',

  /* ---- andningsmedvetenhet ---- */
  'med.step.ba.count': 'Räkna nu varje utandning — ett till tio, börja sedan om. Tappar du räkningen, börja bara på ett igen. Ingen håller poäng.',

  /* ---- kroppsskanning ---- */
  'med.step.scan.0': 'Svep uppmärksamheten långsamt från fotsulorna och uppåt — vrister, ben, höfter, mage, rygg, bröst, armar, händer. Vila några andetag där du möter spänning, och låt den mjukna.',
  'med.step.scan.1': 'Nu axlarna, halsen, käken, rummet runt ögonen, hårbotten. Känn sedan hela kroppen på en gång — tung, varm, andas av sig själv.',

  /* ---- kärleksfull vänlighet ---- */
  'med.step.metta.0': 'För fram dig själv i sinnet, precis som du är idag. Erbjud tyst: må jag vara trygg, må jag må väl, må jag vara i frid. Upprepa det långsamt och tillåt dig att verkligen mena det.',
  'med.step.metta.1': 'För fram någon du älskar lätt. Se ansiktet framför dig och erbjud detsamma: må du vara trygg, må du må väl, må du vara i frid.',
  'med.step.metta.2': 'Vidga det nu — någon du knappt känner, någon du finner svår, sedan alla, överallt: må alla varelser vara trygga, må alla varelser vara i frid.',

  /* ---- ljudbad ---- */
  'med.step.bath.0': 'Låt tonen komma i förgrunden. Du lyssnar inte ansträngt — du låter ljudet komma, så som ljus kommer.',
  'med.step.bath.1': 'Lägg märke till var i kroppen ljudet tycks landa — bröstet, skallen, händerna. Låt rummet mellan dig och ljudet lösas upp.',

  /* ---- tacksamhet ---- */
  'med.step.grat.0': 'För fram en sak från det senaste dygnet som gick bra, hur liten den än var. Nöj dig inte med att namnge den — känn var tacksamheten sätter sig i kroppen.',
  'med.step.grat.1': 'Nu något du brukar ta för givet — en fungerande kropp, ett tak, någon som stannade. Stanna kvar några andetag.',
  'med.step.grat.2': 'En till — något om dig själv. Ett sätt du var närvarande på, en sak du hanterade, en möda ingen såg. Håll alla tre samtidigt.',

  /* ---- trygg plats ---- */
  'med.step.safe.0': 'Föreställ dig en plats där du känner dig helt trygg — verklig eller påhittad. Se dig omkring långsamt: ljuset, tiden på dygnet, vad du hör, vad du känner mot huden.',
  'med.step.safe.1': 'Hitta stället här där du helst skulle vilja vila, och gå dit. Inget krävs av dig. Inget når dig som du inte tillåter.',

  /* ---- berg ---- */
  'med.step.mtn.0': 'Föreställ dig ett berg — dess breda bas, dess fasta sidor, dess stilla topp. Låt din kropp och berget bli samma form: sätet som bas, ryggraden som sluttning, huvudet som topp.',
  'med.step.mtn.1': 'Vädret kommer och går runt berget — ljus, moln, vind, storm. Dina tankar och stämningar är vädret. Berget bråkar inte med det, och blir inte mindre av det.',

  /* ---- öppen medvetenhet ---- */
  'med.step.open.0': 'Släpp andningens ankare. Låt uppmärksamheten vara vidöppen, inte på något särskilt. Ljud, förnimmelser, tankar uppstår och passerar — du varken jagar dem eller skjuter bort dem.',
  'med.step.open.1': 'Lägg märke till att medvetenheten själv inte rör sig. Saker sker inom den, så som moln sker inom himlen. Vila som den himlen — inget att lägga till, inget att ta bort.',

  /* ---- morgonavsikt ---- */
  'med.step.morn.0': 'Tre fylligare andetag, lite djupare än vanligt — låt dem väcka kroppen inifrån. Rulla axlarna bakåt en gång och känn kroppens framsida öppna sig.',
  'med.step.morn.1': 'För dagen som kommer löst i sinnet, välj sedan en avsikt — inte en uppgift, ett sätt att vara. Tålmodig. Ärlig. Modig. Vänlig. Säg det en gång: idag ska jag vara ___.',

  /* ---- kvällsutsläpp ---- */
  'med.step.eve.0': 'Låt dagen spelas upp lätt, som landskap från ett tågfönster — morgon, middag, kväll. Stanna inte på något. Om ett ögonblick drar, notera det och säg: inte nu.',
  'med.step.eve.1': 'Hitta ett ögonblick du är glad att det hände, och en sak du gjorde så bra du kunde. Låt det räcka. Släpp nu hela dagen — den är fullbordad helt enkelt för att den är över.',

  /* ---- yoga nidra ---- */
  'med.step.nidra.0': 'Ligg helt stilla — stillare än vad som känns naturligt, bara andningen rör sig. Sätt en kort avsikt, en enda lugn mening i presens. Säg den inombords tre gånger.',
  'med.step.nidra.1': 'För uppmärksamheten till varje plats allteftersom den nämns, utan att röra dig — höger hand: tumme, fingrar, handflata, handled, underarm, armbåge, axel. Sedan detsamma till vänster.',
  'med.step.nidra.2': 'Båda höfterna. Höger ben — lår, knä, smalben, vrist, fot, tår. Vänster ben likadant. Hela ryggen mot golvet, magen som höjs och sänks, bröstet, halsen.',
  'med.step.nidra.3': 'Ansiktet — käke, läppar, näsa, kinder, ögon, rummet mellan ögonbrynen, hårbotten. Nu hela kroppen på en gång, svagt lysande, buren av golvet. Återvänd till din avsikt.',
}
