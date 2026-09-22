import type { OracleKey } from '../en/oracle'

/** Svenska — skärmen "AI-horoskop" (Pro). */
export const oracle: Record<OracleKey, string> = {
  'oracle.eyebrow': 'AI-horoskop',
  'oracle.title': 'Ditt horoskop, skrivet av AI — bara för dig',
  'oracle.blurb':
    'Inget generiskt horoskop — Claude läser dagens transiter mot ditt eget schema och berättar vad de verkligen betyder för dig idag.',
  'oracle.teaserSample1':
    '"Merkurius i opposition mot din Måne skärper gamla bråk idag — det här är inte dagen att ta upp dem igen."',
  'oracle.teaserSample2':
    '"Venus som glider in i ditt fjärde hus mjukar upp en hemfråga du har undvikit."',
  'oracle.unlock': 'Lås upp AI-horoskop',
  'oracle.reason': 'AI-horoskop',
  'oracle.consult': 'Hämta mitt AI-horoskop',
  'oracle.consultAgain': 'Fråga igen',
  'oracle.loading': 'Läser himlen för dig…',
  'oracle.remaining': '{n} läsningar kvar idag',
  'oracle.remainingOne': '1 läsning kvar idag',
  'oracle.noneLeft': 'Du har använt dagens läsningar — kom tillbaka imorgon',
  'oracle.errorGeneric': 'Oraklet är tyst just nu — försök igen om en stund.',
  'oracle.errorNotPro':
    'Din Pro-prenumeration visas inte som aktiv hos oss ännu. Prova Inställningar → Uppgradera → Återställ köp, eller kontakta supporten om du redan har debiterats.',
  'oracle.generatedAt': 'Läst kl. {time}',
  'oracle.addBirth': 'Lägg till dina födelseuppgifter för en helt personlig läsning →',
}
