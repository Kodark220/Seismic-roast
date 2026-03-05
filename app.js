const QUESTIONS = [
  {
    text: 'How do you get paid?',
    key: 'pay',
    options: [
      { label: 'Crypto (public chain)', value: 'public' },
      { label: 'Crypto (private/Seismic)', value: 'private' },
      { label: 'Fiat only', value: 'fiat' },
      { label: "What's a job?", value: 'jobless' }
    ]
  },
  {
    text: 'Ever used Buy Now Pay Later?',
    key: 'bnpl',
    options: [
      { label: 'Yes, even for groceries', value: 'always' },
      { label: 'Sometimes', value: 'sometimes' },
      { label: 'Never', value: 'never' }
    ]
  },
  {
    text: 'Your crypto activity:',
    key: 'crypto',
    options: [
      { label: 'DeFi degen (I farm yield at 3 AM)', value: 'degen' },
      { label: 'Casual user', value: 'casual' },
      { label: 'HODLer only', value: 'hodl' },
      { label: "I don't use crypto", value: 'none' }
    ]
  },
  {
    text: 'How many people know your wallet address?',
    key: 'wallet',
    options: [
      { label: "It's literally in my Twitter bio", value: 'public' },
      { label: 'A few friends', value: 'friends' },
      { label: 'Nobody', value: 'nobody' },
      { label: "I don't have a wallet", value: 'nowallet' }
    ]
  },
  {
    text: 'Be honest: where are your seed phrases?',
    key: 'seed',
    options: [
      { label: 'Notes app on my phone', value: 'notes' },
      { label: 'Written down (hidden)', value: 'written' },
      { label: 'Hardware wallet', value: 'hardware' },
      { label: "Memorized (I'm built different)", value: 'memory' }
    ]
  }
];

const ROASTS = {
  criticalFailure: {
    title: 'CRITICAL FAILURE DETECTED',
    score: 'Privacy Score: 0/10',
    body:
      'My brother in Christ, you get paid in public crypto, finance groceries with BNPL, and keep your seed phrase in your notes app?\n\nYour entire financial life is screaming for help. You did not fail privacy, you speedran every possible mistake.',
    seismic: 'On Seismic: your salary, movements, and wallet activity would not be public by default.'
  },
  selfDoxSpeedrun: {
    title: 'SELF-DOXX SPEEDRUN (ANY%)',
    score: 'Privacy Score: 1/10',
    body:
      'Wallet in bio, public-chain pay, and 3 AM degen routes. You are not hiding, you are broadcasting.\n\nYou turned your threat model into content.',
    seismic: 'On Seismic: your degen moves can stay private instead of being a public livestream.'
  },
  downAstronomically: {
    title: 'DOWN ASTRONOMICALLY',
    score: 'Privacy Score: 1/10',
    body:
      'Unemployed, BNPL for groceries, and seeds in notes app is a catastrophic combo.\n\nThis score is not feedback. It is an intervention.',
    seismic: 'On Seismic: private rails help, but key management still needs immediate fixing.'
  },
  paranoidBoomer: {
    title: 'PARANOID BOOMER MODE ACTIVATED',
    score: 'Privacy Score: 8/10',
    body:
      'No crypto, no wallet, no BNPL, full avoidance strategy. You won by not playing.\n\nRespectfully secure. Painfully boring.',
    seismic: 'On Seismic: you could actually use crypto without giving up privacy standards.'
  },
  privacyGigachad: {
    title: 'PRIVACY GIGACHAD DETECTED',
    score: 'Privacy Score: 10/10',
    body:
      'Private chain, hardware-backed keys, no wallet exposure, and no BNPL dependency.\n\nYou came here to flex and the flex is legitimate.',
    seismic: 'You are already operating like a Seismic poster child.'
  },
  maximumSecurityThreat: {
    title: 'MAXIMUM SECURITY THREAT',
    score: 'Privacy Score: 0/10',
    body:
      'Wallet in bio and seeds in notes app is the digital version of unlocked doors and labeled valuables.\n\nYou are not just vulnerable. You are discoverable and vulnerable.',
    seismic: 'On Seismic: transaction privacy helps, but seed handling must move offline immediately.'
  },
  financiallyUnhinged: {
    title: 'FINANCIALLY UNHINGED',
    score: 'Privacy Score: 2/10',
    body:
      'Farming degen yields at 3 AM while financing groceries with BNPL is peak financial chaos.\n\nThe only thing compounding is risk.',
    seismic: 'On Seismic: at least your activity graph is not public while you experiment.'
  },
  privacyNeverHeard: {
    title: 'PRIVACY? NEVER HEARD OF HER',
    score: 'Privacy Score: 3/10',
    body:
      'Public salary and occasional BNPL leakage is enough for profiling engines to map your financial stress cycles.\n\nYou are transparent by accident.',
    seismic: 'On Seismic: chain activity stays private instead of feeding trackers.'
  },
  builtDifferentDelusional: {
    title: 'BUILT DIFFERENT (DELUSIONAL)',
    score: 'Privacy Score: 4/10',
    body:
      'Memorizing seed phrases is not elite security, it is fragile security.\n\nOne bad week and everything is gone.',
    seismic: 'On Seismic: privacy is strong, but recovery discipline still matters more than ego.'
  },
  normieDetected: {
    title: 'NORMIE DETECTED',
    score: 'Privacy Score: 5/10',
    body:
      'Fiat-only, occasional BNPL, no crypto footprint. Functional, safe-ish, and aggressively average.\n\nYou are not wrecked, just unremarkable.',
    seismic: 'On Seismic: you can keep convenience while reducing exposure once you go on-chain.'
  },
  diamondHands: {
    title: 'DIAMOND HANDS DETECTED',
    score: 'Privacy Score: 9/10',
    body:
      'Hardware wallet, hidden addresses, and pure HODL behavior. Opsec is clean.\n\nPortfolio pain may still exist, but at least it is private pain.',
    seismic: 'On Seismic: your strong security posture pairs perfectly with private transactions.'
  },
  decentCouldBeBetter: {
    title: 'DECENT BUT COULD BE BETTER',
    score: 'Privacy Score: 6/10',
    body:
      'Few friends know your wallet and seeds are written down. You are not failing, but you are not strict either.\n\nThis is B-grade privacy hygiene.',
    seismic: 'On Seismic: this setup becomes materially stronger with private-by-default transfers.'
  },
  casuallyExposing: {
    title: 'CASUALLY EXPOSING YOURSELF',
    score: 'Privacy Score: 4/10',
    body:
      'Casual user on a public chain equals casual self-doxxing.\n\nYou are too relaxed about data trails that never disappear.',
    seismic: 'On Seismic: casual usage no longer means public visibility.'
  },
  friendsKnowBroke: {
    title: 'YOUR FRIENDS KNOW YOU ARE BROKE',
    score: 'Privacy Score: 3/10',
    body:
      'BNPL groceries plus known wallet means your inner circle can infer your cash-flow stress in real time.\n\nPolite silence is not privacy.',
    seismic: 'On Seismic: you reduce passive wallet-based profiling by people around you.'
  },
  secureDegen: {
    title: 'SECURE DEGEN (RARE BREED)',
    score: 'Privacy Score: 7/10',
    body:
      'You did hardware and private salary correctly, then used it to degen anyway.\n\nProtected from strangers, not protected from your own strategy.',
    seismic: 'On Seismic: high-risk trades stay private, even when your judgment does not.'
  },
  joblessGambler: {
    title: 'JOBLESS GAMBLER DETECTED',
    score: 'Privacy Score: 1/10',
    body:
      'No job plus DeFi degen loops at 3 AM is not alpha, it is roulette with extra steps.\n\nYour risk budget is imaginary.',
    seismic: 'On Seismic: privacy hides your moves, but it cannot make bad bankroll management good.'
  },
  professionalSelfDoxxer: {
    title: 'PROFESSIONAL SELF-DOXXER',
    score: 'Privacy Score: 0/10',
    body:
      'Public-chain salary and wallet-in-bio is full-spectrum oversharing.\n\nYou are a walking surveillance endpoint.',
    seismic: 'On Seismic: salary and transfer context are not openly inspectable.'
  },
  preparedForNothing: {
    title: 'PREPARED FOR NOTHING',
    score: 'Privacy Score: 6/10',
    body:
      'Hardware wallet without active crypto usage is security cosplay.\n\nSafe, but for a scenario that is mostly hypothetical right now.',
    seismic: 'On Seismic: when you start using crypto, your baseline privacy can still stay intact.'
  },
  midEverything: {
    title: 'MID EVERYTHING',
    score: 'Privacy Score: 3/10',
    body:
      'Sometimes BNPL plus notes-app seeds is lazy-risk mode.\n\nNot catastrophic yet. Definitely preventable.',
    seismic: 'On Seismic: chain privacy improves, but note-taking your seed still ruins everything.'
  },
  overconfidentCasual: {
    title: 'OVERCONFIDENT CASUAL',
    score: 'Privacy Score: 5/10',
    body:
      'Nobody knows your wallet, but memorized seeds are a self-own waiting to happen.\n\nYour confidence is higher than your backup strategy.',
    seismic: 'On Seismic: keep the low exposure, replace memory-only with durable recovery practices.'
  },
  walkingRedFlag: {
    title: 'THE WALKING RED FLAG',
    score: 'Privacy Score: 1/10',
    body:
      'Public salary, BNPL groceries, wallet in bio. You assembled a complete anti-opsec starter pack.\n\nEvery scam funnel is tuned for this profile.',
    seismic: 'On Seismic: your on-chain history is no longer free intel for bad actors.'
  },
  richButStupid: {
    title: 'RICH BUT STUPID',
    score: 'Privacy Score: 2/10',
    body:
      'Public pay and wallet in bio with no BNPL pressure means you are flexing straight into exposure.\n\nIncome does not compensate for weak opsec.',
    seismic: 'On Seismic: you can keep utility without publicly pinning your balance narrative.'
  },
  cryptoCuriousDisaster: {
    title: 'CRYPTO CURIOUS DISASTER',
    score: 'Privacy Score: 2/10',
    body:
      'Fiat-only with BNPL sometimes, no real crypto usage, and inconsistent wallet story.\n\nThe setup is confused before it is even risky.',
    seismic: 'On Seismic: start with a coherent setup first, then privacy amplifies it.'
  },
  cautiousButLate: {
    title: 'CAUTIOUS BUT LATE',
    score: 'Privacy Score: 6/10',
    body:
      'No BNPL, hardware-ready, but still not active. You planned well and executed slowly.\n\nSecure potential is not the same as actual usage.',
    seismic: 'On Seismic: you can onboard when ready without sacrificing privacy by default.'
  },
  contradiction: {
    title: 'THE CONTRADICTION',
    score: 'Privacy Score: 4/10',
    body:
      'Private crypto rails plus BNPL-for-groceries is mixed-signal risk management.\n\nYou solved one leak and kept another huge one open.',
    seismic: 'On Seismic: chain privacy is handled; consumer-credit metadata still needs discipline.'
  },
  paranoidWrongWays: {
    title: 'PARANOID IN THE WRONG WAYS',
    score: 'Privacy Score: 5/10',
    body:
      'No active crypto footprint, no BNPL, and memorized seed behavior anyway.\n\nPreparedness without a system quickly becomes performance art.',
    seismic: 'On Seismic: use concrete setup practices, not imaginary threat modeling.'
  },
  trustFundKid: {
    title: 'TRUST FUND KID ENERGY',
    score: 'Privacy Score: 7/10',
    body:
      'Private salary, no BNPL pressure, decent controls, and low chaos.\n\nStability looks good on you, even if it roasts badly.',
    seismic: 'On Seismic: this becomes strong privacy with minimal behavioral change.'
  },
  hoarder: {
    title: 'THE HOARDER',
    score: 'Privacy Score: 6/10',
    body:
      'HODL-only, written seeds, and minimal wallet visibility. Very protected, barely active.\n\nYour assets are safer than your participation rate.',
    seismic: 'On Seismic: when you eventually move funds, your actions do not need to be public.'
  },
  degenLite: {
    title: 'DEGEN LITE',
    score: 'Privacy Score: 4/10',
    body:
      'Casual crypto, occasional BNPL, friends watching wallet behavior.\n\nNot full chaos, just consistent bad edging toward it.',
    seismic: 'On Seismic: casual activity can stay private before it turns into full degen mode.'
  },
  delusionalOptimist: {
    title: 'DELUSIONAL OPTIMIST',
    score: 'Privacy Score: 3/10',
    body:
      'Jobless and casual crypto with written seeds is hope-based financial planning.\n\nOptimism is not a risk control framework.',
    seismic: 'On Seismic: privacy can protect data trails while you stabilize fundamentals.'
  },
  humbleBragger: {
    title: 'THE HUMBLE BRAGGER',
    score: 'Privacy Score: 8/10',
    body:
      'Strong privacy posture, clean setup, and stable behavior.\n\nYou did not come for feedback. You came for validation.',
    seismic: 'On Seismic: this is exactly the type of user profile the network rewards.'
  },
  privacyNewbie: {
    title: 'PRIVACY NEWBIE',
    score: 'Privacy Score: 5/10',
    body:
      'Private rails are good, but wallet sharing and basic seed storage still leak edges.\n\nYou are on the right path with training wheels on.',
    seismic: 'On Seismic: keep iterating and this quickly moves from mid to solid.'
  },
  sleeperAgent: {
    title: 'SLEEPER AGENT',
    score: 'Privacy Score: 7/10',
    body:
      'HODL mode, hidden wallet, written backup, zero BNPL.\n\nYou are a financial ghost with a long time horizon.',
    seismic: 'On Seismic: your low-profile strategy remains low-profile when you transact.'
  },
  experimenter: {
    title: 'THE EXPERIMENTER',
    score: 'Privacy Score: 4/10',
    body:
      'Casual crypto plus BNPL dabbling and notes-app seeds is an unstable test environment.\n\nThis experiment fails hard under real pressure.',
    seismic: 'On Seismic: privacy by default helps, but seed hygiene still determines survivability.'
  },
  influencerBait: {
    title: 'INFLUENCER BAIT',
    score: 'Privacy Score: 1/10',
    body:
      'Wallet in bio, casual activity, BNPL sometimes. You optimized for visibility over security.\n\nEngagement is not protection.',
    seismic: 'On Seismic: performance and privacy do not have to be mutually exclusive.'
  },
  skeptic: {
    title: 'THE SKEPTIC',
    score: 'Privacy Score: 6/10',
    body:
      'Fiat-first, low-risk behavior, hardware readiness. Cautious and unconvinced.\n\nYou hedge with preparedness while avoiding commitment.',
    seismic: 'On Seismic: if you opt in, you can preserve the same cautious posture.'
  },
  serialRugVictim: {
    title: 'SERIAL RUG VICTIM',
    score: 'Privacy Score: 2/10',
    body:
      'Public-chain pay, degen behavior, and notes-app seeds is an attacker-friendly trifecta.\n\nYou are one bad click from legend status for all the wrong reasons.',
    seismic: 'On Seismic: private activity narrows exposure, but you still need contract discipline.'
  },
  minimalistKing: {
    title: 'MINIMALIST KING',
    score: 'Privacy Score: 8/10',
    body:
      'No crypto usage, no wallet exposure, no BNPL. Simple and low-surface by default.\n\nNot thrilling, but operationally clean.',
    seismic: 'On Seismic: when you do engage, you can keep this low-exposure baseline.'
  },
  giftedCrypto: {
    title: 'THE GIFTED CRYPTO',
    score: 'Privacy Score: 3/10',
    body:
      'HODL intentions with no active wallet footprint is dormant ownership energy.\n\nYou have the tools but not the operating model.',
    seismic: 'On Seismic: when you activate usage, your privacy posture can stay strong from day one.'
  },
  chaosIncarnate: {
    title: 'CHAOS INCARNATE',
    score: 'Privacy Score: 0/10',
    body:
      'Jobless, degen, BNPL groceries, notes-app seeds, wallet in bio.\n\nThis is the complete disaster configuration.',
    seismic: 'On Seismic: private infrastructure helps, but this behavior still needs a full reset.'
  },
  retiree: {
    title: 'THE RETIREE',
    score: 'Privacy Score: 7/10',
    body:
      'Private HODL strategy, hardware security, no BNPL, low noise.\n\nYou are either retired or spiritually retired.',
    seismic: 'On Seismic: your quiet strategy stays quiet, even during movement.'
  },
  fakeIt: {
    title: 'FAKE IT TIL YOU MAKE IT',
    score: 'Privacy Score: 2/10',
    body:
      'Fiat-only with wallet-in-bio signaling and BNPL dependence is identity cosplay.\n\nThe profile performs confidence while leaking stress.',
    seismic: 'On Seismic: build real usage foundations first, then turn on privacy advantages.'
  },
  controller: {
    title: 'THE CONTROLLER',
    score: 'Privacy Score: 9/10',
    body:
      'Private chain, hardware-backed custody, and tight wallet secrecy.\n\nYou run opsec like an operations center.',
    seismic: 'On Seismic: this is near-ideal execution for private-by-default crypto usage.'
  },
  weekendWarrior: {
    title: 'WEEKEND WARRIOR',
    score: 'Privacy Score: 5/10',
    body:
      'Casual use, written seed backups, no BNPL, partial wallet sharing.\n\nNot reckless, not disciplined, just consistently average.',
    seismic: 'On Seismic: moderate habits become meaningfully safer with private transfers.'
  },
  gamblersFallacy: {
    title: "THE GAMBLER'S FALLACY",
    score: 'Privacy Score: 2/10',
    body:
      'Jobless degen mode with memorized seed bravado is confidence without guardrails.\n\nYou cannot out-mindset unmanaged risk.',
    seismic: 'On Seismic: privacy can hide the bet slip, not fix the betting strategy.'
  },
  trustNoOne: {
    title: 'TRUST NO ONE',
    score: 'Privacy Score: 8/10',
    body:
      'Private rails, no BNPL, secret wallet, memory-only backup behavior.\n\nExcellent secrecy. Questionable recoverability.',
    seismic: 'On Seismic: pair this secrecy with durable backups and it becomes elite.'
  },
  enlightenedBroke: {
    title: 'THE ENLIGHTENED BROKE',
    score: 'Privacy Score: 4/10',
    body:
      'Jobless with strong hardware discipline and low-credit dependency.\n\nYour privacy instincts are better than your income engine.',
    seismic: 'On Seismic: good privacy foundations are in place for when cash flow improves.'
  },
  internetExplorer: {
    title: 'INTERNET EXPLORER USER',
    score: 'Privacy Score: 6/10',
    body:
      'Fiat-only, no wallet activity, written seeds anyway. You are preparing for a scenario you still avoid.\n\nCautious to the point of satire.',
    seismic: 'On Seismic: when you finally start, your privacy default can already be strong.'
  },
  optimisticFool: {
    title: 'THE OPTIMISTIC FOOL',
    score: 'Privacy Score: 3/10',
    body:
      'Public chain exposure, degen behavior, friends aware of wallet, BNPL sometimes.\n\nTransparent chaos with selective confidence.',
    seismic: 'On Seismic: fewer public breadcrumbs means less social and algorithmic profiling.'
  },
  perfectlyAverage: {
    title: 'PERFECTLY AVERAGE',
    score: 'Privacy Score: 5/10',
    body:
      'Not terrible, not excellent, just centered in the middle.\n\nYou make a few good calls, a few bad calls, and mostly hover in safe mediocrity.',
    seismic: 'On Seismic: average habits still improve when privacy is built into the base layer.'
  }
};

const RULES = [
  { id: 'chaosIncarnate', when: (a) => a.pay === 'jobless' && a.crypto === 'degen' && a.bnpl === 'always' && a.seed === 'notes' && a.wallet === 'public' },
  { id: 'criticalFailure', when: (a) => a.pay === 'public' && a.bnpl === 'always' && a.seed === 'notes' },
  { id: 'professionalSelfDoxxer', when: (a) => a.wallet === 'public' && a.pay === 'public' },
  { id: 'maximumSecurityThreat', when: (a) => a.wallet === 'public' && a.seed === 'notes' },
  { id: 'selfDoxSpeedrun', when: (a) => a.pay === 'public' && a.wallet === 'public' && a.crypto === 'degen' },
  { id: 'walkingRedFlag', when: (a) => a.pay === 'public' && a.bnpl === 'always' && a.wallet === 'public' },
  { id: 'serialRugVictim', when: (a) => a.crypto === 'degen' && a.seed === 'notes' && a.pay === 'public' },
  { id: 'downAstronomically', when: (a) => a.pay === 'jobless' && a.bnpl === 'always' && a.seed === 'notes' },
  { id: 'financiallyUnhinged', when: (a) => a.crypto === 'degen' && a.bnpl === 'always' },
  { id: 'joblessGambler', when: (a) => a.pay === 'jobless' && a.crypto === 'degen' },
  { id: 'gamblersFallacy', when: (a) => a.pay === 'jobless' && a.crypto === 'degen' && a.seed === 'memory' },
  { id: 'richButStupid', when: (a) => a.pay === 'public' && a.bnpl === 'never' && a.wallet === 'public' },
  { id: 'influencerBait', when: (a) => a.wallet === 'public' && a.crypto === 'casual' && a.bnpl === 'sometimes' },
  { id: 'fakeIt', when: (a) => a.pay === 'fiat' && a.wallet === 'public' && a.bnpl === 'sometimes' },
  { id: 'privacyGigachad', when: (a) => a.pay === 'private' && a.seed === 'hardware' && a.wallet === 'nobody' && a.bnpl === 'never' && a.crypto === 'casual' },
  { id: 'humbleBragger', when: (a) => a.pay === 'private' && a.seed === 'hardware' && a.wallet === 'nobody' && a.bnpl === 'never' && a.crypto === 'hodl' },
  { id: 'controller', when: (a) => a.pay === 'private' && a.seed === 'hardware' && a.wallet === 'nobody' && a.bnpl === 'never' && a.crypto === 'degen' },
  { id: 'secureDegen', when: (a) => a.pay === 'private' && a.seed === 'hardware' && a.crypto === 'degen' },
  { id: 'retiree', when: (a) => a.crypto === 'hodl' && a.pay === 'private' && a.seed === 'hardware' && a.bnpl === 'never' },
  { id: 'trustNoOne', when: (a) => a.wallet === 'nobody' && a.seed === 'memory' && a.pay === 'private' && a.bnpl === 'never' },
  { id: 'trustFundKid', when: (a) => a.pay === 'private' && a.bnpl === 'never' && a.wallet === 'friends' },
  { id: 'privacyNewbie', when: (a) => a.pay === 'private' && a.wallet === 'friends' && a.seed === 'written' },
  { id: 'contradiction', when: (a) => a.pay === 'private' && a.bnpl === 'always' },
  { id: 'diamondHands', when: (a) => a.crypto === 'hodl' && a.wallet === 'nobody' && a.seed === 'hardware' },
  { id: 'sleeperAgent', when: (a) => a.crypto === 'hodl' && a.wallet === 'nobody' && a.seed === 'written' && a.bnpl === 'never' },
  { id: 'hoarder', when: (a) => a.crypto === 'hodl' && a.seed === 'written' && a.wallet === 'nobody' },
  { id: 'giftedCrypto', when: (a) => a.wallet === 'nowallet' && a.seed === 'hardware' && a.crypto === 'hodl' },
  { id: 'preparedForNothing', when: (a) => a.crypto === 'none' && a.seed === 'hardware' && a.bnpl !== 'always' },
  { id: 'paranoidBoomer', when: (a) => a.pay === 'fiat' && a.crypto === 'none' && a.wallet === 'nowallet' && a.bnpl === 'never' && a.seed === 'memory' },
  { id: 'minimalistKing', when: (a) => a.pay === 'fiat' && a.crypto === 'none' && a.wallet === 'nowallet' && a.bnpl === 'never' && a.seed === 'written' },
  { id: 'cautiousButLate', when: (a) => a.pay === 'fiat' && a.bnpl === 'never' && a.seed === 'hardware' && a.crypto === 'none' },
  { id: 'skeptic', when: (a) => a.pay === 'fiat' && a.crypto === 'none' && a.seed === 'hardware' && a.bnpl === 'never' && a.wallet === 'nobody' },
  { id: 'internetExplorer', when: (a) => a.pay === 'fiat' && a.crypto === 'none' && a.seed === 'written' && a.wallet === 'nowallet' },
  { id: 'paranoidWrongWays', when: (a) => a.pay === 'fiat' && a.bnpl === 'never' && a.seed === 'memory' && a.crypto === 'none' },
  { id: 'normieDetected', when: (a) => a.pay === 'fiat' && a.bnpl === 'sometimes' && a.crypto === 'none' },
  { id: 'cryptoCuriousDisaster', when: (a) => a.pay === 'fiat' && a.bnpl === 'sometimes' && a.wallet === 'friends' && a.crypto === 'none' },
  { id: 'privacyNeverHeard', when: (a) => a.pay === 'public' && a.bnpl === 'sometimes' },
  { id: 'casuallyExposing', when: (a) => a.pay === 'public' && a.crypto === 'casual' },
  { id: 'optimisticFool', when: (a) => a.pay === 'public' && a.crypto === 'degen' && a.wallet === 'friends' && a.bnpl === 'sometimes' },
  { id: 'friendsKnowBroke', when: (a) => a.bnpl === 'always' && a.wallet === 'friends' },
  { id: 'degenLite', when: (a) => a.crypto === 'casual' && a.bnpl === 'sometimes' && a.wallet === 'friends' },
  { id: 'weekendWarrior', when: (a) => a.crypto === 'casual' && a.wallet === 'friends' && a.seed === 'written' && a.bnpl === 'never' },
  { id: 'experimenter', when: (a) => a.crypto === 'casual' && a.bnpl === 'sometimes' && a.seed === 'notes' },
  { id: 'overconfidentCasual', when: (a) => a.wallet === 'nobody' && a.seed === 'memory' && a.crypto === 'casual' },
  { id: 'midEverything', when: (a) => a.bnpl === 'sometimes' && a.seed === 'notes' },
  { id: 'decentCouldBeBetter', when: (a) => a.wallet === 'friends' && a.seed === 'written' },
  { id: 'builtDifferentDelusional', when: (a) => a.seed === 'memory' },
  { id: 'delusionalOptimist', when: (a) => a.pay === 'jobless' && a.crypto === 'casual' && a.seed === 'written' },
  { id: 'enlightenedBroke', when: (a) => a.pay === 'jobless' && a.seed === 'hardware' && a.bnpl === 'never' }
];

const state = {
  index: 0,
  answers: {},
  mainView: 'landing'
};

const landingView = document.getElementById('landing-view');
const questionView = document.getElementById('question-view');
const resultView = document.getElementById('result-view');
const progressWrap = document.getElementById('progress-wrap');
const progressFill = document.getElementById('progress-fill');
const progressLabel = document.getElementById('progress-label');
const landingForm = document.getElementById('landing-form');
const landingUsernameInput = document.getElementById('landing-username-input');
const landingNote = document.getElementById('landing-note');
const shareLogo = new Image();
shareLogo.src = 'assets/seismic-icon.svg';
const shareLogoBg = new Image();
shareLogoBg.src = 'assets/seismic-icon.svg';
const shareCardBg = new Image();
shareCardBg.src = window.SCORE_CARD_DATA_URL || 'assets/score-card.png';
const ACTIVE_USER_KEY = 'seismic_active_username_v1';
const SUPABASE_CONFIG = window.SUPABASE_CONFIG || {};
const SUPABASE_URL = (SUPABASE_CONFIG.url || '').replace(/\/$/, '');
const SUPABASE_ANON_KEY = SUPABASE_CONFIG.anonKey || '';

function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function parsePrivacyScore(scoreText) {
  const m = /([0-9]+)\/10/.exec(scoreText || '');
  return m ? Number(m[1]) : null;
}

async function supabaseInsert(table, payload) {
  if (!hasSupabaseConfig()) return;
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: 'return=minimal'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Supabase insert failed (${response.status})`);
  }
}

async function persistUsername(username) {
  try {
    await supabaseInsert('roast_users', { username });
  } catch (error) {
    console.error('persistUsername failed:', error);
  }
}

async function persistQuizResult(username, answers, result) {
  try {
    await supabaseInsert('roast_results', {
      username,
      pay: answers.pay || null,
      bnpl: answers.bnpl || null,
      crypto: answers.crypto || null,
      wallet: answers.wallet || null,
      seed: answers.seed || null,
      roast_title: result.title,
      privacy_score: parsePrivacyScore(result.score),
      roast_body: result.body,
      seismic_line: result.seismic,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('persistQuizResult failed:', error);
  }
}

function showMainView(view) {
  state.mainView = view;
  landingView.classList.toggle('hidden', view !== 'landing');
  questionView.classList.toggle('hidden', view !== 'question');
  resultView.classList.toggle('hidden', view !== 'result');
  progressWrap.classList.toggle('hidden', view === 'landing');

  if (view === 'landing') {
    progressLabel.textContent = 'Ready';
    progressFill.style.width = '0%';
    return;
  }

  if (view === 'result') {
    progressLabel.textContent = 'Result';
    progressFill.style.width = '100%';
    return;
  }

  progressLabel.textContent = `Question ${state.index + 1} of ${QUESTIONS.length}`;
  progressFill.style.width = `${((state.index + 1) / QUESTIONS.length) * 100}%`;
}

function renderQuestion() {
  const q = QUESTIONS[state.index];
  state.mainView = 'question';
  progressLabel.textContent = `Question ${state.index + 1} of ${QUESTIONS.length}`;
  progressFill.style.width = `${((state.index + 1) / QUESTIONS.length) * 100}%`;

  questionView.innerHTML = `
    <h2 class="question-title">${q.text}</h2>
    <div class="option-grid">
      ${q.options
        .map(
          (opt) => `<button class="option-btn" type="button" data-key="${q.key}" data-value="${opt.value}">${opt.label}</button>`
        )
        .join('')}
    </div>
  `;

  questionView.querySelectorAll('.option-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.answers[btn.dataset.key] = btn.dataset.value;
      if (state.index < QUESTIONS.length - 1) {
        state.index += 1;
        renderQuestion();
      } else {
        renderResult();
      }
    });
  });
}

function pickRoast(a) {
  const matched = RULES.find((rule) => rule.when(a));
  return matched ? ROASTS[matched.id] : ROASTS.perfectlyAverage;
}

function getTweetText(result) {
  return `${result.title} | ${result.score}. Took the Seismic Get Roasted quiz.`;
}

function waitForImage(image, timeoutMs = 2000) {
  return new Promise((resolve) => {
    if (image.complete && image.naturalWidth > 0) {
      resolve(true);
      return;
    }

    let done = false;
    const finish = (ok) => {
      if (done) return;
      done = true;
      resolve(ok);
    };

    const onLoad = () => finish(true);
    const onError = () => finish(false);
    image.addEventListener('load', onLoad, { once: true });
    image.addEventListener('error', onError, { once: true });
    setTimeout(() => finish(false), timeoutMs);
  });
}

function triggerDownloadFromCanvas(canvas, filename) {
  return new Promise((resolve, reject) => {
    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas export returned empty blob.'));
          return;
        }
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = filename;
        a.click();
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
        resolve();
      }, 'image/png');
      return;
    }

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = filename;
      a.click();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function drawShareCard(ctx, canvas, result, options) {
  const { useTemplate, useBrandWatermark, useTopLogo } = options;
  const baseWidth = 1200;
  const baseHeight = 628;
  canvas.width = baseWidth;
  canvas.height = baseHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (useTemplate && shareCardBg.complete && shareCardBg.naturalWidth > 0) {
    const scale = Math.max(canvas.width / shareCardBg.naturalWidth, canvas.height / shareCardBg.naturalHeight);
    const drawWidth = shareCardBg.naturalWidth * scale;
    const drawHeight = shareCardBg.naturalHeight * scale;
    const dx = (canvas.width - drawWidth) / 2;
    const dy = (canvas.height - drawHeight) / 2;
    ctx.drawImage(shareCardBg, dx, dy, drawWidth, drawHeight);
  } else {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#554148');
    grad.addColorStop(1, '#000000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (useBrandWatermark && shareLogoBg.complete && shareLogoBg.naturalWidth > 0) {
    const markWidth = 320;
    const markHeight = Math.round((shareLogoBg.naturalHeight / shareLogoBg.naturalWidth) * markWidth);
    const markX = (canvas.width - markWidth) / 2;
    const markY = (canvas.height - markHeight) / 2;
    ctx.save();
    ctx.globalAlpha = 0.16;
    ctx.drawImage(shareLogoBg, markX, markY, markWidth, markHeight);
    ctx.restore();
  }

  if (useTopLogo && shareLogo.complete) {
    ctx.drawImage(shareLogo, 70, 40, 36, 52);
  }

  const x = 90;
  const maxWidth = 1020;

  ctx.fillStyle = '#111111';
  ctx.font = '800 44px Space Grotesk, sans-serif';
  const titleLines = getWrappedMultilineLines(ctx, result.title, maxWidth, 2);
  titleLines.forEach((line, i) => ctx.fillText(line, x, 128 + i * 50));

  const scoreY = 128 + titleLines.length * 50 + 8;
  ctx.fillStyle = '#1f1f1f';
  ctx.font = '700 30px Space Grotesk, sans-serif';
  ctx.fillText(result.score, x, scoreY);

  const bodyStartY = scoreY + 44;
  ctx.fillStyle = '#171717';
  ctx.font = '600 20px Space Grotesk, sans-serif';
  const bodyLines = getWrappedMultilineLines(ctx, result.body, maxWidth, 9);
  bodyLines.forEach((line, i) => ctx.fillText(line, x, bodyStartY + i * 28));

  const seismicStartY = bodyStartY + bodyLines.length * 28 + 18;
  ctx.fillStyle = '#171717';
  ctx.font = '700 20px Space Grotesk, sans-serif';
  const seismicLines = getWrappedMultilineLines(ctx, result.seismic, maxWidth, 3);
  seismicLines.forEach((line, i) => ctx.fillText(line, x, seismicStartY + i * 28));
}

function renderResult() {
  const result = pickRoast(state.answers);
  showMainView('result');

  resultView.innerHTML = `
    <h2 class="result-head">${result.title}</h2>
    <div class="score">${result.score}</div>
    <p class="result-body">${result.body}</p>
    <div class="seismic">${result.seismic}</div>
    <div class="actions">
      <button class="action primary" id="tweet-btn" type="button">Share on X</button>
      <button class="action" id="image-btn" type="button">Download Score Card</button>
      <button class="action" id="retry-btn" type="button">Try Again</button>
    </div>
  `;

  document.getElementById('retry-btn').addEventListener('click', () => {
    state.index = 0;
    state.answers = {};
    showMainView('question');
    renderQuestion();
  });

  document.getElementById('tweet-btn').addEventListener('click', () => {
    const text = encodeURIComponent(getTweetText(result));
    const url = encodeURIComponent('https://seismic.systems');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  });

  document.getElementById('image-btn').addEventListener('click', async () => {
    const canvas = document.getElementById('share-canvas');
    const ctx = canvas.getContext('2d');
    await waitForImage(shareCardBg, 2500);

    try {
      drawShareCard(ctx, canvas, result, { useTemplate: true, useBrandWatermark: true, useTopLogo: true });
      await triggerDownloadFromCanvas(canvas, 'score-card.png');
    } catch (error) {
      try {
        drawShareCard(ctx, canvas, result, { useTemplate: true, useBrandWatermark: false, useTopLogo: false });
        await triggerDownloadFromCanvas(canvas, 'score-card.png');
      } catch (fallbackError) {
        try {
          drawShareCard(ctx, canvas, result, { useTemplate: false, useBrandWatermark: false, useTopLogo: false });
          await triggerDownloadFromCanvas(canvas, 'score-card.png');
        } catch (finalError) {
          console.error('Score card download failed:', finalError);
          const a = document.createElement('a');
          a.href = 'assets/score-card.png';
          a.download = 'score-card.png';
          a.click();
        }
      }
    }
  });
}

function normalizeUsername(raw) {
  const value = raw.trim();
  if (!value) return null;
  const normalized = value.startsWith('@') ? value : `@${value}`;
  if (!/^@[A-Za-z0-9_]{2,24}$/.test(normalized)) {
    return null;
  }
  return normalized;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  const lines = [];

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    const w = ctx.measureText(testLine).width;
    if (w > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });

  if (line) {
    lines.push(line);
  }

  return lines;
}

function trimToWidthWithEllipsis(ctx, text, maxWidth) {
  const ellipsis = '...';
  if (ctx.measureText(text).width <= maxWidth) {
    return text;
  }

  let out = text;
  while (out.length > 0 && ctx.measureText(`${out}${ellipsis}`).width > maxWidth) {
    out = out.slice(0, -1);
  }
  return `${out}${ellipsis}`;
}

function getWrappedMultilineLines(ctx, text, maxWidth, maxLines = Infinity) {
  const paragraphs = text.split('\n');
  const renderedLines = [];
  let exhausted = false;

  paragraphs.forEach((paragraph, pIdx) => {
    if (exhausted) {
      return;
    }

    if (!paragraph.trim()) {
      if (renderedLines.length < maxLines) {
        renderedLines.push('');
      }
      return;
    }

    const lines = wrapText(ctx, paragraph.trim(), 0, 0, maxWidth, 0);
    lines.forEach((line) => {
      if (exhausted) {
        return;
      }
      if (renderedLines.length < maxLines) {
        renderedLines.push(line);
      } else {
        renderedLines[maxLines - 1] = trimToWidthWithEllipsis(ctx, renderedLines[maxLines - 1], maxWidth);
        exhausted = true;
      }
    });

    if (pIdx < paragraphs.length - 1) {
      if (renderedLines.length < maxLines) {
        renderedLines.push('');
      } else {
        renderedLines[maxLines - 1] = trimToWidthWithEllipsis(ctx, renderedLines[maxLines - 1], maxWidth);
        exhausted = true;
      }
    }
  });

  return renderedLines;
}

renderQuestion();
showMainView('landing');

const existingActive = localStorage.getItem(ACTIVE_USER_KEY);
if (existingActive) {
  landingUsernameInput.value = existingActive;
}

landingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const normalized = normalizeUsername(landingUsernameInput.value);
  if (!normalized) {
    landingNote.textContent = 'Use 2-24 letters, numbers, or underscores.';
    landingNote.classList.remove('hidden');
    return;
  }

  localStorage.setItem(ACTIVE_USER_KEY, normalized);
  landingNote.classList.add('hidden');
  state.index = 0;
  state.answers = {};
  showMainView('question');
  renderQuestion();
});




