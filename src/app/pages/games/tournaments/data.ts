type TournamentEvent = {
  title: string
  prize: string
  startsIn: string
  format: string
  slots: string
}

const UPCOMING_TOURNAMENTS: TournamentEvent[] = [
  {
    title: 'Galactic Gauntlet Series',
    prize: '¥15,000 coin pool + exclusive skins',
    startsIn: 'Starts in 3h',
    format: 'Trios • Double elimination • Cross-region',
    slots: '32/64 squads',
  },
  {
    title: 'Velocity Rush Invitational',
    prize: 'Custom pit crew banner + hardware bundle',
    startsIn: 'Starts Saturday',
    format: 'Solo time-trial • Qualifier + finals',
    slots: '128/200 racers',
  },
  {
    title: 'Community Creator Cup',
    prize: 'Creator revenue boost + featured playlist',
    startsIn: 'Starts next week',
    format: 'Creator teams • Best-of-five showcase',
    slots: '16/16 teams',
  },
]

export type { TournamentEvent }
export { UPCOMING_TOURNAMENTS }

