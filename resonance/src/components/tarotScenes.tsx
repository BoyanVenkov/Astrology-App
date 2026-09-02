import type { ReactNode } from 'react'
import type { Suit, TarotCard } from '../lib/tarot'
import {
  AceHand,
  Angel,
  Bird,
  Crown,
  Dog,
  Figure,
  Frame,
  Ground,
  GOLD,
  INK,
  Lantern,
  Lightning,
  Mountains,
  Moon,
  Pillar,
  Pips,
  Rose,
  Scales,
  Sea,
  StarBurst,
  SuitProp,
  Sun,
  Throne,
  Tower,
  Wheel,
  Wreath,
} from './tarotArt'

const s = (w = 2.4) => ({
  fill: 'none' as const,
  stroke: INK,
  strokeWidth: w,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

const Wall = ({ y = 236 }: { y?: number }) => (
  <path d={`M20 ${y}h160M40 ${y}v-14M80 ${y}v-14M120 ${y}v-14M160 ${y}v-14`} {...s(2)} />
)

/* ------------------------------------------------------------ major arcana */

const MAJOR: Record<number, ReactNode> = {
  0: (
    <>
      <Sun x={58} y={56} r={13} />
      <Mountains y={232} />
      <Ground y={250} />
      {/* the cliff edge, right */}
      <path d="M138 250q18 0 26 10v30h-30Z" {...s(2)} fill={`${INK}0d`} />
      <Figure x={92} y={244} h={86} pose="walk" />
      {/* the white rose in one hand, a satchel-staff over the shoulder */}
      <path d="M74 200l-14-16" {...s(2)} />
      <path d="M60 184a4 4 0 1 0 0 -1Z" {...s(1.8)} stroke={GOLD} />
      <Rose x={112} y={214} r={4} />
      <Dog x={66} y={248} />
    </>
  ),
  1: (
    <>
      <path d="M100 66c-7-11-24-11-24 0s17 11 24 0c7-11 24-11 24 0s-17 11-24 0Z" {...s(2.2)} stroke={GOLD} />
      <Figure x={100} y={214} h={78} pose="armsUp" />
      <path d="M92 176l4-20M108 200l14-10" {...s(2)} />
      <path d="M56 236h88" {...s(2.4)} />
      <SuitProp suit="wands" x={64} y={224} s={0.5} />
      <SuitProp suit="cups" x={86} y={226} s={0.5} />
      <SuitProp suit="swords" x={112} y={224} s={0.5} />
      <SuitProp suit="pentacles" x={136} y={226} s={0.5} />
      <Rose x={40} y={110} r={4} color={INK} />
      <Rose x={160} y={120} r={4} color={INK} />
    </>
  ),
  2: (
    <>
      <Pillar x={56} label="J" />
      <Pillar x={144} label="B" />
      <path d="M64 110h72v130H64Z" {...s(1.4)} stroke={`${INK}`} strokeDasharray="2 6" />
      <Figure x={100} y={236} h={92} robe={INK} />
      <path d="M88 60a12 12 0 1 0 12 12" {...s(2)} stroke={GOLD} />
      <path d="M92 244a8 5 0 1 0 16 0" {...s(2)} stroke={GOLD} />
    </>
  ),
  3: (
    <>
      <StarBurst x={100} y={54} R={7} points={7} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path key={i} d={`M${68 + i * 12} 236v18`} {...s(1.6)} stroke={GOLD} />
      ))}
      <Throne x={100} y={244} />
      <Figure x={100} y={240} h={86} />
      <path d="M118 200a8 8 0 1 1-16 0q8-10 16 0Z" {...s(1.8)} stroke={GOLD} />
    </>
  ),
  4: (
    <>
      <Mountains y={214} />
      <Throne x={100} y={250} />
      <path d="M70 190l-6-8 8-2 4 6M130 190l6-8-8-2-4 6" {...s(2)} stroke={GOLD} />
      <Figure x={100} y={248} h={92} />
      <circle cx={122} cy={214} r={6} {...s(1.8)} stroke={GOLD} />
      <path d="M78 210v-30" {...s(2)} stroke={GOLD} />
    </>
  ),
  5: (
    <>
      <Pillar x={54} />
      <Pillar x={146} />
      <Figure x={100} y={214} h={80} />
      <path d="M118 176l12-8" {...s(2)} />
      <Crown x={100} y={112} w={16} />
      <path d="M84 244l8-10M100 244v-10M116 244l-8-10" {...s(2)} stroke={GOLD} />
      <Figure x={80} y={268} h={30} />
      <Figure x={120} y={268} h={30} />
    </>
  ),
  6: (
    <>
      <Angel x={100} y={96} h={56} />
      <path d="M40 130q-6 40 0 96M160 130q6 40 0 96" {...s(2)} />
      <Figure x={68} y={256} h={64} />
      <Figure x={132} y={256} h={64} robe={GOLD} />
    </>
  ),
  7: (
    <>
      <Wall y={110} />
      <path d="M66 250v-40h68v40" {...s(2.4)} fill={`${INK}0d`} />
      <path d="M66 210l-8-16h84l-8 16" {...s(2)} />
      <Figure x={100} y={206} h={54} />
      <StarBurst x={100} y={160} R={5} points={6} />
      <path d="M60 264q10-10 20 0M120 264q10-10 20 0" {...s(2.4)} />
    </>
  ),
  8: (
    <>
      <path d="M100 60c-7-11-24-11-24 0s17 11 24 0c7-11 24-11 24 0s-17 11-24 0Z" {...s(2)} stroke={GOLD} />
      <Ground y={254} />
      <Figure x={82} y={248} h={72} pose="offer" />
      {/* the lion — crouched, head turned up to the hand */}
      <path d="M108 250q0-16 16-18 14-2 20 8 6 10-2 20-16 6-30 2Z" {...s(2.2)} fill={`${INK}0d`} />
      <path d="M120 232q-6-6-4-12 6 0 8 6M144 240q6 2 8 8" {...s(1.8)} />
      <circle cx={124} cy={238} r={1.2} fill={INK} />
      <path d="M108 262l-6 8M120 264l-2 8M134 262l2 8" {...s(1.6)} />
    </>
  ),
  9: (
    <>
      <path d="M40 260q30-30 120 0" {...s(2.4)} fill={`${INK}10`} />
      <Figure x={100} y={250} h={92} robe={`${INK}`} />
      <path d="M74 250v-40" {...s(2.6)} />
      <Lantern x={128} y={150} />
      <StarBurst x={128} y={158} R={5} points={6} />
    </>
  ),
  10: (
    <>
      <Wheel x={100} y={148} r={42} />
      {/* sphinx resting on top */}
      <path d="M88 100q0-10 12-10t12 10l6 6h-36Z" {...s(2)} stroke={GOLD} fill={`${GOLD}12`} />
      <path d="M100 90v-6" {...s(1.6)} stroke={GOLD} />
      {/* serpent descending, jackal rising */}
      <path d="M62 150q-14 6-14 22" {...s(2)} />
      <path d="M138 150q14 6 14 22" {...s(2)} />
      <Bird x={40} y={52} />
      <Bird x={160} y={52} />
    </>
  ),
  11: (
    <>
      <Pillar x={56} />
      <Pillar x={144} />
      <Throne x={100} y={246} />
      <Figure x={100} y={244} h={92} />
      <path d="M82 176V120" {...s(2.6)} stroke={GOLD} />
      <path d="M82 120l-4-6h8Z" fill={GOLD} />
      <Scales x={124} y={168} />
      <Crown x={100} y={112} w={16} />
    </>
  ),
  12: (
    <>
      <path d="M52 96h96M100 96v20" {...s(3)} fill="none" stroke={INK} />
      <path d="M52 96v-16M148 96v-16" {...s(3)} />
      <Figure x={100} y={200} h={84} pose="hang" />
      <StarBurst x={100} y={172} R={12} points={10} />
    </>
  ),
  13: (
    <>
      <path d="M64 60l-6-14M136 60l6-14" {...s(2)} stroke={GOLD} />
      <path d="M60 60h40v18H60ZM100 78h40V60h-40" {...s(2)} />
      <Sun x={100} y={68} r={9} />
      <Ground y={256} />
      <path d="M52 256q18-24 44-8 20-16 44 2v18H52Z" {...s(2.4)} fill={`${INK}12`} />
      <Figure x={96} y={244} h={64} robe={`${INK}`} />
      <path d="M120 200v-44" {...s(2.6)} />
      <path d="M120 156a7 7 0 1 1-14 0q7-9 14 0Z" {...s(1.8)} stroke={GOLD} />
      <Figure x={56} y={262} h={22} pose="lie" />
    </>
  ),
  14: (
    <>
      <Mountains y={210} />
      <Sun x={100} y={70} r={9} />
      <path d="M60 250h80" {...s(2)} />
      <Sea y={244} />
      <Angel x={100} y={216} h={92} />
      <path d="M78 190q22 12 44 0" {...s(2)} stroke={GOLD} strokeDasharray="1.5 5" />
      <SuitProp suit="cups" x={78} y={186} s={0.55} />
      <SuitProp suit="cups" x={122} y={186} s={0.55} />
    </>
  ),
  15: (
    <>
      <path d="M100 52l-8 22 22-8-14 14 14 14-22-8 8 22-14-14-14 14 8-22-22 8 14-14-14-14 22 8-8-22 14 14Z" {...s(1.6)} stroke={GOLD} fill={`${GOLD}12`} />
      <path d="M80 130l-8-10M120 130l8-10" {...s(2.2)} />
      <Figure x={100} y={210} h={80} robe={`${INK}`} />
      <path d="M84 148q-6-14 4-22M116 148q6-14-4-22" {...s(2)} />
      <path d="M74 236h52" {...s(2.4)} fill={`${INK}0d`} />
      <path d="M84 268v-24M116 268v-24" {...s(2.4)} />
      <path d="M78 250h44" {...s(1.8)} stroke={GOLD} strokeDasharray="1.5 4" />
    </>
  ),
  16: (
    <>
      <Lightning x={100} y={38} />
      <Tower x={100} y={252} />
      <path d="M64 200q-8 16 0 30M136 200q8 16 0 30" {...s(2)} stroke={GOLD} />
      <path d="M56 248l-8 8 8 4M144 248l8 8-8 4" {...s(2)} stroke={GOLD} />
    </>
  ),
  17: (
    <>
      <StarBurst x={100} y={66} R={16} points={8} small={[54, 78, 122, 146, 64, 100, 136]} />
      <Sea y={244} />
      <Ground y={252} wash={false} />
      <Figure x={100} y={250} h={68} pose="kneel" robe={INK} />
      <path d="M84 214q-6 12 0 22M116 214q6 12 0 22" {...s(2)} stroke={GOLD} />
      <path d="M64 118q10-20 20 0" {...s(2)} />
      <Bird x={84} y={112} />
    </>
  ),
  18: (
    <>
      <Moon x={100} y={64} r={17} />
      <path d="M100 84q-4 10-2 20M92 96l-6 6M108 96l6 6" {...s(1.6)} stroke={GOLD} />
      <path d="M52 250v-40l-6-8M148 250v-40l6-8" {...s(2.4)} />
      <path d="M64 250h72" {...s(2)} />
      <path d="M76 250q6-24 12 0M112 250q6-24 12 0" {...s(2)} />
      <path d="M96 256q4-8 8 0 4-6 0-10-4 4-8 0-4 6 0 10Z" {...s(1.8)} stroke={GOLD} />
      <path d="M100 236v-40" {...s(1.6)} stroke={INK} strokeDasharray="2 5" />
    </>
  ),
  19: (
    <>
      <Sun x={100} y={70} r={22} face />
      <path d="M40 232h120" {...s(2.4)} />
      <path d="M54 232v-20M70 232v-16M130 232v-16M146 232v-20" {...s(2)} stroke={GOLD} />
      {[54, 70, 130, 146].map((x, i) => (
        <Rose key={i} x={x} y={210} r={5} />
      ))}
      <Figure x={100} y={258} h={54} pose="armsUp" robe={GOLD} />
      <path d="M76 258q24 12 48 0" {...s(2)} />
    </>
  ),
  20: (
    <>
      <Mountains y={210} />
      <path d="M100 60l30 16-30 6-30-6Z" {...s(2)} stroke={GOLD} fill={`${GOLD}14`} />
      <path d="M130 76q12 2 12 10t-12 10" {...s(2)} stroke={GOLD} />
      <path d="M96 96h28v22H96Z" {...s(2)} stroke={GOLD} />
      <path d="M110 96V80" {...s(2)} stroke={GOLD} />
      <Sea y={250} />
      <Figure x={64} y={256} h={44} pose="armsUp" />
      <Figure x={100} y={258} h={50} pose="armsUp" />
      <Figure x={136} y={256} h={44} pose="armsUp" />
    </>
  ),
  21: (
    <>
      <Wreath x={100} y={166} rx={48} ry={78} />
      <Figure x={100} y={220} h={92} pose="offer" robe={INK} />
      <path d="M78 188l-10 14M122 188l10 14" {...s(2.2)} />
      <path d="M40 46q10-8 16 0M144 46q10-8 16 0" {...s(2)} />
      <path d="M40 290q10-8 16 0M144 290q10-8 16 0" {...s(2)} />
    </>
  ),
}

/* ---------------------------------------------------------------- minors */

const ELEMENT: Record<Suit, ReactNode> = {
  wands: (
    <>
      <path d="M20 246h160" {...s(2)} />
      <path d="M36 246l10-14 8 10M150 246l8-12 8 12" {...s(1.8)} />
    </>
  ),
  cups: <Sea y={244} />,
  swords: (
    <g {...s(1.6)} opacity={0.7}>
      <path d="M20 70q20-10 40 0t40 0 40 0 40 0" />
      <path d="M20 250q20-10 40 0t40 0 40 0 40 0" />
    </g>
  ),
  pentacles: (
    <>
      <Ground y={246} />
      <path d="M40 246v-12M60 246v-16M140 246v-16M160 246v-12" {...s(1.6)} stroke={GOLD} />
    </>
  ),
}

const SUIT_HUE: Record<Suit, string> = {
  wands: '#f6a35c',
  cups: '#6cc4e6',
  swords: '#cbb9f2',
  pentacles: '#7bd6a6',
}

const court = (suit: Suit, rank: number): ReactNode => {
  const knight = rank === 12
  const page = rank === 11
  return (
    <>
      {ELEMENT[suit]}
      {!page && !knight && <Throne x={100} y={244} />}
      {knight ? (
        <>
          <path d="M56 250q10-30 44-24 30 6 44 24" {...s(2.4)} fill={`${INK}0d`} />
          <path d="M60 226l-8-10 10-2" {...s(2)} />
          <Figure x={100} y={214} h={58} pose="offer" robe={SUIT_HUE[suit]} />
        </>
      ) : (
        <Figure
          x={100}
          y={page ? 250 : 242}
          h={page ? 74 : 92}
          pose={rank === 13 ? 'stand' : 'offer'}
          robe={SUIT_HUE[suit]}
        />
      )}
      <SuitProp suit={suit} x={knight ? 132 : 130} y={knight ? 180 : 170} s={0.9} />
      {rank >= 13 && <Crown x={100} y={page ? 172 : 150} w={15} />}
    </>
  )
}

/** Narrative overrides for the more scenic minor cards. */
const NARRATIVE: Record<string, ReactNode> = {
  'wands-02': (
    <>
      <Wall y={140} />
      <Sea y={250} />
      <Figure x={96} y={210} h={60} pose="offer" />
      <circle cx={122} cy={176} r={7} {...s(1.8)} stroke={GOLD} />
      <SuitProp suit="wands" x={66} y={170} s={0.8} />
      <SuitProp suit="wands" x={134} y={170} s={0.8} />
    </>
  ),
  'wands-03': (
    <>
      <Sea y={244} />
      <path d="M40 244l14-10-2 10M150 244l10-8v8" {...s(1.6)} />
      <Figure x={92} y={228} h={64} />
      <SuitProp suit="wands" x={62} y={168} s={0.85} />
      <SuitProp suit="wands" x={100} y={162} s={0.85} />
      <SuitProp suit="wands" x={138} y={168} s={0.85} />
    </>
  ),
  'wands-05': (
    <>
      {ELEMENT.wands}
      <Figure x={60} y={244} h={56} pose="armsUp" />
      <Figure x={100} y={248} h={58} pose="armsUp" />
      <Figure x={140} y={244} h={56} pose="armsUp" />
      {[52, 78, 100, 122, 148].map((x, i) => (
        <SuitProp key={i} suit="wands" x={x} y={150 + (i % 2) * 12} s={0.7} rot={i * 12 - 24} />
      ))}
    </>
  ),
  'wands-06': (
    <>
      {ELEMENT.wands}
      <Figure x={100} y={242} h={70} pose="offer" robe={SUIT_HUE.wands} />
      <Wreath x={100} y={120} rx={16} ry={12} />
      {[64, 84, 116, 136, 100, 100].map((x, i) => (
        <SuitProp key={i} suit="wands" x={x} y={i < 4 ? 160 : 150} s={0.6} />
      ))}
    </>
  ),
  'wands-08': (
    <>
      <Mountains y={244} />
      <Ground y={252} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <SuitProp key={i} suit="wands" x={44 + i * 16} y={80 + i * 18} s={0.7} rot={38} />
      ))}
    </>
  ),
  'wands-10': (
    <>
      {ELEMENT.wands}
      <Figure x={100} y={252} h={66} pose="walk" />
      {[76, 84, 92, 100, 108, 116, 124, 90, 100, 110].map((x, i) => (
        <SuitProp key={i} suit="wands" x={x} y={186 + (i > 6 ? 8 : 0)} s={0.55} rot={i * 6 - 20} />
      ))}
    </>
  ),
  'cups-02': (
    <>
      <Sea y={250} />
      <Figure x={70} y={244} h={58} pose="offer" />
      <Figure x={130} y={244} h={58} pose="offer" robe={SUIT_HUE.cups} />
      <SuitProp suit="cups" x={84} y={200} s={0.6} />
      <SuitProp suit="cups" x={116} y={200} s={0.6} />
      <path d="M100 176v18M92 182h16" {...s(1.6)} stroke={GOLD} />
    </>
  ),
  'cups-03': (
    <>
      {ELEMENT.pentacles}
      <Figure x={62} y={244} h={62} pose="armsUp" />
      <Figure x={100} y={246} h={64} pose="armsUp" robe={SUIT_HUE.cups} />
      <Figure x={138} y={244} h={62} pose="armsUp" />
      <SuitProp suit="cups" x={54} y={168} s={0.6} />
      <SuitProp suit="cups" x={100} y={162} s={0.6} />
      <SuitProp suit="cups" x={146} y={168} s={0.6} />
    </>
  ),
  'cups-05': (
    <>
      <path d="M40 244h50l6-8h20l6 8h32" {...s(2)} />
      <Sea y={252} />
      <Figure x={94} y={240} h={78} robe={`${INK}`} />
      <SuitProp suit="cups" x={70} y={224} s={0.5} rot={40} />
      <SuitProp suit="cups" x={86} y={228} s={0.5} rot={-30} />
      <SuitProp suit="cups" x={102} y={226} s={0.5} rot={20} />
      <SuitProp suit="cups" x={128} y={210} s={0.5} />
      <SuitProp suit="cups" x={142} y={210} s={0.5} />
    </>
  ),
  'cups-06': (
    <>
      <Wall y={236} />
      <Figure x={72} y={244} h={48} />
      <Figure x={112} y={248} h={40} />
      {[52, 76, 100, 124, 148, 100].map((x, i) => (
        <g key={i}>
          <SuitProp suit="cups" x={x} y={i < 5 ? 200 : 168} s={0.5} />
          <Rose x={x} y={i < 5 ? 190 : 158} r={2.5} />
        </g>
      ))}
    </>
  ),
  'cups-07': (
    <>
      <Figure x={64} y={252} h={56} pose="offer" />
      {[
        [110, 110],
        [150, 118],
        [92, 148],
        [136, 156],
        [108, 196],
        [150, 200],
        [128, 232],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x - 18} ${y}q18 -10 36 0`} {...s(1.4)} opacity={0.5} />
          <SuitProp suit="cups" x={x} y={y + 6} s={0.5} />
        </g>
      ))}
    </>
  ),
  'cups-08': (
    <>
      <Moon x={100} y={62} r={14} />
      <Mountains y={240} />
      <Sea y={250} />
      <Figure x={112} y={252} h={64} pose="walk" robe={`${INK}`} />
      {[64, 80, 72, 64, 80, 68, 76, 72].map((x, i) => (
        <SuitProp key={i} suit="cups" x={x} y={214 - (i % 3) * 18} s={0.5} />
      ))}
    </>
  ),
  'cups-09': (
    <>
      {ELEMENT.pentacles}
      <path d="M40 200q60 -34 120 0" {...s(2)} />
      {Array.from({ length: 9 }).map((_, i) => (
        <SuitProp key={i} suit="cups" x={44 + i * 14} y={196 - Math.sin((i / 8) * Math.PI) * 26} s={0.5} />
      ))}
      <Figure x={100} y={252} h={56} pose="bound" robe={SUIT_HUE.cups} />
    </>
  ),
  'cups-10': (
    <>
      <path d="M44 120q56 -50 112 0" {...s(2.4)} stroke={GOLD} />
      {Array.from({ length: 10 }).map((_, i) => (
        <SuitProp key={i} suit="cups" x={48 + i * 11.5} y={116 - Math.sin(((i + 0.5) / 10) * Math.PI) * 30} s={0.42} />
      ))}
      <Ground y={252} />
      <Figure x={72} y={250} h={58} pose="armsUp" />
      <Figure x={108} y={250} h={58} pose="armsUp" robe={SUIT_HUE.cups} />
      <Figure x={140} y={256} h={34} />
    </>
  ),
  'swords-02': (
    <>
      <Sea y={250} />
      <Moon x={150} y={60} r={10} />
      <Figure x={100} y={244} h={78} pose="bound" robe={`${INK}`} />
      <path d="M100 132l-40 60M100 132l40 60" {...s(2.6)} stroke={INK} />
      <path d="M84 200h32" {...s(2)} stroke={`${INK}`} />
    </>
  ),
  'swords-03': (
    <>
      <path d="M60 60q6 20 0 40M100 54q6 24 0 44M140 60q6 20 0 40" {...s(1.4)} opacity={0.5} />
      <path d="M100 130q-28-20-28 8t28 30q28-2 28-30t-28-8Z" {...s(2.4)} stroke={SUIT_HUE.swords} fill={`${SUIT_HUE.swords}12`} />
      <path d="M100 96l-46 44M100 96l46 44M100 92v72" {...s(2.6)} stroke={INK} />
    </>
  ),
  'swords-04': (
    <>
      <path d="M56 250h88v-10H56Z" {...s(2.4)} fill={`${INK}0d`} />
      <Figure x={100} y={238} h={16} pose="lie" />
      <path d="M64 210h72M74 194h52M86 178h28" {...s(2.4)} stroke={INK} />
      <path d="M100 262v-18" {...s(2.4)} stroke={INK} />
      <rect x={130} y={70} width={26} height={34} rx={13} {...s(1.6)} stroke={GOLD} />
    </>
  ),
  'swords-05': (
    <>
      <path d="M20 70q16-16 30 0t30 0" {...s(1.4)} opacity={0.5} />
      <Sea y={252} />
      <Figure x={70} y={244} h={60} pose="offer" />
      <Figure x={128} y={250} h={48} />
      <Figure x={150} y={252} h={44} />
      {[54, 66, 78, 96, 110].map((x, i) => (
        <path key={i} d={`M${x} ${168 + i * 8}v34`} {...s(2)} stroke={INK} />
      ))}
    </>
  ),
  'swords-06': (
    <>
      <Sea y={244} />
      <path d="M52 244q48 24 96 0l-8 16H60Z" {...s(2.4)} fill={`${INK}10`} />
      <Figure x={80} y={244} h={44} />
      <Figure x={112} y={248} h={30} />
      <Figure x={140} y={236} h={54} />
      {[70, 80, 90, 100, 110, 120].map((x, i) => (
        <path key={i} d={`M${x} ${240}v-46`} {...s(2)} stroke={INK} />
      ))}
    </>
  ),
  'swords-07': (
    <>
      {ELEMENT.pentacles}
      <path d="M40 130h40v40H40Z" {...s(1.6)} opacity={0.6} />
      <Figure x={112} y={250} h={58} pose="walk" />
      {[92, 100, 108, 116, 124].map((x, i) => (
        <path key={i} d={`M${x} ${212}l-6-30`} {...s(2)} stroke={INK} />
      ))}
      <path d="M60 246v-30M74 246v-30" {...s(2)} stroke={INK} />
    </>
  ),
  'swords-08': (
    <>
      <Wall y={90} />
      {ELEMENT.pentacles}
      <Figure x={100} y={248} h={76} pose="bound" robe={`${INK}`} />
      {[52, 66, 80, 120, 134, 148, 100, 100].map((x, i) => (
        <path key={i} d={`M${x} ${246}v${i > 5 ? -70 : -50}`} {...s(2)} stroke={INK} />
      ))}
    </>
  ),
  'swords-09': (
    <>
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={i} d={`M${40 + i * 15} 84v${44 + (i % 3) * 8}`} {...s(2)} stroke={INK} />
      ))}
      <path d="M48 250h104v-40H48Z" {...s(2.4)} fill={`${INK}0d`} />
      <Figure x={100} y={238} h={40} pose="offer" robe={`${INK}`} />
    </>
  ),
  'swords-10': (
    <>
      <path d="M20 58q30 8 60 0t60 0 60 0" {...s(1.6)} stroke={GOLD} opacity={0.45} />
      <Sea y={252} />
      {/* prone figure face-down on the shore */}
      <path d="M44 246q4-10 16-10h64q12 0 16 10Z" {...s(2.4)} fill={`${INK}12`} />
      <circle cx={52} cy={236} r={6.5} {...s(2)} stroke={INK} fill={`${INK}12`} />
      <path d="M60 236h56" {...s(2)} stroke={INK} />
      {Array.from({ length: 10 }).map((_, i) => (
        <path key={i} d={`M${66 + i * 8} 240l-3-44`} {...s(1.8)} stroke={INK} />
      ))}
    </>
  ),
  'pentacles-02': (
    <>
      <Sea y={244} />
      <path d="M40 244l12-8-2 8M150 244l8-6v6" {...s(1.4)} />
      <Figure x={100} y={244} h={62} pose="offer" />
      <path d="M74 176c14-18 38-18 38 0s-24 18-38 0Z" {...s(1.8)} stroke={GOLD} />
      <SuitProp suit="pentacles" x={70} y={176} s={0.5} />
      <SuitProp suit="pentacles" x={116} y={176} s={0.5} />
    </>
  ),
  'pentacles-03': (
    <>
      <path d="M60 110a40 40 0 0 1 80 0v130H60Z" {...s(2)} fill={`${INK}08`} />
      <Figure x={100} y={244} h={66} pose="armsUp" />
      <Figure x={64} y={244} h={54} />
      <Figure x={136} y={244} h={54} />
      <SuitProp suit="pentacles" x={100} y={128} s={0.55} />
      <SuitProp suit="pentacles" x={80} y={150} s={0.4} />
      <SuitProp suit="pentacles" x={120} y={150} s={0.4} />
    </>
  ),
  'pentacles-04': (
    <>
      <Wall y={252} />
      <Figure x={100} y={246} h={82} pose="bound" robe={`${INK}`} />
      <SuitProp suit="pentacles" x={100} y={92} s={0.55} />
      <SuitProp suit="pentacles" x={100} y={168} s={0.6} />
      <SuitProp suit="pentacles" x={78} y={262} s={0.5} />
      <SuitProp suit="pentacles" x={122} y={262} s={0.5} />
    </>
  ),
  'pentacles-05': (
    <>
      <path d="M40 60h60v70H40Z" {...s(1.6)} stroke={GOLD} opacity={0.7} />
      {[52, 68, 84, 60, 76].map((x, i) => (
        <SuitProp key={i} suit="pentacles" x={x} y={i < 3 ? 82 : 106} s={0.4} />
      ))}
      <g {...s(1.2)} opacity={0.5}>
        <path d="M20 250q16-6 32 0t32 0 32 0 32 0 32 0" />
      </g>
      <Figure x={110} y={256} h={58} pose="walk" robe={`${INK}`} />
      <Figure x={140} y={258} h={46} pose="bound" />
    </>
  ),
  'pentacles-06': (
    <>
      {ELEMENT.pentacles}
      <Figure x={100} y={244} h={78} pose="offer" robe={SUIT_HUE.pentacles} />
      <Figure x={56} y={252} h={44} pose="kneel" />
      <Figure x={144} y={252} h={44} pose="kneel" />
      <Scales x={100} y={150} />
      {[74, 88, 112, 126].map((x, i) => (
        <SuitProp key={i} suit="pentacles" x={x} y={200} s={0.4} />
      ))}
    </>
  ),
  'pentacles-07': (
    <>
      <path d="M56 246q0-70 88-40" {...s(2)} fill={`${INK}0a`} />
      {[70, 92, 114, 136, 80, 104, 128].map((x, i) => (
        <SuitProp key={i} suit="pentacles" x={x} y={i < 4 ? 150 : 190} s={0.45} />
      ))}
      <Figure x={48} y={252} h={64} pose="bound" />
      <path d="M40 252v-40" {...s(2.4)} />
    </>
  ),
  'pentacles-08': (
    <>
      {ELEMENT.pentacles}
      <path d="M60 250v-30h80v30" {...s(2.4)} fill={`${INK}0a`} />
      <Figure x={100} y={218} h={54} pose="offer" />
      <SuitProp suit="pentacles" x={130} y={196} s={0.5} />
      {[46, 46, 46, 46, 46, 46].map((x, i) => (
        <SuitProp key={i} suit="pentacles" x={x} y={90 + i * 22} s={0.42} />
      ))}
    </>
  ),
  'pentacles-09': (
    <>
      <path d="M40 240q0-90 120-70v70" {...s(2)} fill={`${INK}08`} />
      {Array.from({ length: 9 }).map((_, i) => (
        <SuitProp key={i} suit="pentacles" x={60 + (i % 3) * 40} y={120 + Math.floor(i / 3) * 34} s={0.4} />
      ))}
      <Figure x={100} y={252} h={70} pose="offer" robe={SUIT_HUE.pentacles} />
      <Bird x={140} y={210} />
    </>
  ),
  'pentacles-10': (
    <>
      <path d="M52 100a48 48 0 0 1 96 0v140H52Z" {...s(2)} fill={`${INK}08`} />
      {[
        [100, 74],
        [76, 100],
        [124, 100],
        [76, 140],
        [124, 140],
        [100, 128],
        [76, 180],
        [124, 180],
        [100, 168],
        [100, 208],
      ].map(([x, y], i) => (
        <SuitProp key={i} suit="pentacles" x={x} y={y} s={0.36} />
      ))}
      <Figure x={68} y={250} h={56} />
      <Figure x={104} y={252} h={50} />
      <Figure x={134} y={256} h={30} />
      <Dog x={148} y={258} />
    </>
  ),
}

/* --------------------------------------------------------------- resolve */

function sceneFor(card: TarotCard): ReactNode {
  if (card.arcana === 'major') {
    return MAJOR[card.rank] ?? <StarBurst />
  }
  const nar = NARRATIVE[card.id]
  if (nar) return nar
  if (card.rank === 1) {
    return (
      <>
        {ELEMENT[card.arcana]}
        <AceHand suit={card.arcana} />
      </>
    )
  }
  if (card.rank >= 11) return court(card.arcana, card.rank)
  return (
    <>
      {ELEMENT[card.arcana]}
      <Pips suit={card.arcana} n={card.rank} id={card.id} />
    </>
  )
}

/* wrapper so TarotCard only needs one import */
export function TarotScene({
  card,
  reversed,
  color,
  name,
}: {
  card: TarotCard
  reversed?: boolean
  color: string
  /** Localised card name; falls back to the deck's English name. */
  name?: string
}) {
  return (
    <Frame
      id={card.id}
      name={name ?? card.name}
      reversed={reversed}
      color={color}
    >
      {sceneFor(card)}
    </Frame>
  )
}
