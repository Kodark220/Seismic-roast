export const CATEGORY_KEYS = [
  'privacyRisk',
  'securityChaos',
  'financialChaos',
  'degenEnergy',
  'traditionalFinance'
];

export const QUESTION_POOL = [
  {
    key: 'data_sharing_online',
    text: 'How do you usually handle personal data online?',
    options: [
      { label: 'Share only what is necessary', value: 'minimal', points: { privacyRisk: -2 } },
      { label: 'I try to limit it, but it is hard', value: 'limit_some', points: { privacyRisk: -1 } },
      { label: 'I do not really think about it', value: 'dont_think', points: { privacyRisk: 2 } },
      { label: 'If asked, I probably enter it', value: 'enter_anyway', points: { privacyRisk: 3 } }
    ]
  },
  {
    key: 'signup_permissions',
    text: 'When signing up for apps, you usually...',
    options: [
      { label: 'Read permissions carefully', value: 'read', points: { privacyRisk: -2, securityChaos: -1 } },
      { label: 'Skim quickly', value: 'skim', points: { privacyRisk: 1 } },
      { label: 'Click accept immediately', value: 'accept_fast', points: { privacyRisk: 2, securityChaos: 1 } },
      { label: 'I do not even look', value: 'dont_look', points: { privacyRisk: 3, securityChaos: 2 } }
    ]
  },
  {
    key: 'phone_number_request',
    text: 'If a website asks for your phone number...',
    options: [
      { label: 'I avoid giving it', value: 'avoid', points: { privacyRisk: -2 } },
      { label: 'Only if required', value: 'required_only', points: { privacyRisk: -1 } },
      { label: 'I give it without thinking', value: 'give_anyway', points: { privacyRisk: 2 } },
      { label: 'I use burner/fake numbers', value: 'burner', points: { privacyRisk: -1, securityChaos: 1 } }
    ]
  },
  {
    key: 'app_tracking_audit',
    text: 'How often do you check what apps track your data?',
    options: [
      { label: 'Regularly', value: 'regular', points: { privacyRisk: -2 } },
      { label: 'Sometimes', value: 'sometimes', points: { privacyRisk: -1 } },
      { label: 'Rarely', value: 'rarely', points: { privacyRisk: 1 } },
      { label: 'Never', value: 'never', points: { privacyRisk: 3 } }
    ]
  },
  {
    key: 'spending_visibility_comfort',
    text: 'How comfortable are you with companies seeing your spending habits?',
    options: [
      { label: 'Not comfortable at all', value: 'not_comfortable', points: { privacyRisk: -2 } },
      { label: 'Slightly uncomfortable', value: 'slight', points: { privacyRisk: -1 } },
      { label: 'Neutral', value: 'neutral', points: { privacyRisk: 1 } },
      { label: 'I do not really care', value: 'dont_care', points: { privacyRisk: 3 } }
    ]
  },
  {
    key: 'onchain_privacy_thought',
    text: 'When using crypto, do you think about transaction privacy?',
    options: [
      { label: 'Yes, very important', value: 'very_important', points: { privacyRisk: -3 } },
      { label: 'Sometimes', value: 'sometimes', points: { privacyRisk: -1 } },
      { label: 'Rarely', value: 'rarely', points: { privacyRisk: 2 } },
      { label: 'Never thought about it', value: 'never_thought', points: { privacyRisk: 4 } }
    ]
  },
  {
    key: 'wallet_address_reuse',
    text: 'Do you reuse the same wallet address?',
    options: [
      { label: 'Never', value: 'never', points: { privacyRisk: -2 } },
      { label: 'Sometimes', value: 'sometimes', points: { privacyRisk: 1 } },
      { label: 'Often', value: 'often', points: { privacyRisk: 3 } },
      { label: 'I did not know that mattered', value: 'did_not_know', points: { privacyRisk: 4 } }
    ]
  },
  {
    key: 'blockchain_public_awareness',
    text: 'How public do you think blockchain transactions are?',
    options: [
      { label: 'Completely public', value: 'fully_public', points: { privacyRisk: -2 } },
      { label: 'Mostly public', value: 'mostly_public', points: { privacyRisk: -1 } },
      { label: 'Somewhat private', value: 'somewhat_private', points: { privacyRisk: 2 } },
      { label: 'I am not sure', value: 'not_sure', points: { privacyRisk: 3 } }
    ]
  },
  {
    key: 'wallet_tracking_worry',
    text: 'Do you worry about people tracking your wallet activity?',
    options: [
      { label: 'Yes', value: 'yes', points: { privacyRisk: -2 } },
      { label: 'Sometimes', value: 'sometimes', points: { privacyRisk: -1 } },
      { label: 'Not really', value: 'not_really', points: { privacyRisk: 1 } },
      { label: 'Never thought about it', value: 'never_thought', points: { privacyRisk: 3 } }
    ]
  },
  {
    key: 'wallet_history_lookup_feel',
    text: 'If someone searched your wallet history...',
    options: [
      { label: 'They would not find much', value: 'clean', points: { privacyRisk: -1 } },
      { label: 'They would see some activity', value: 'some', points: { privacyRisk: 1 } },
      { label: 'They would see everything', value: 'everything', points: { privacyRisk: 3 } },
      { label: 'That sounds terrifying', value: 'terrifying', points: { privacyRisk: -2 } }
    ]
  },
  {
    key: 'spend_tracking_method',
    text: 'How do you usually track your spending?',
    options: [
      { label: 'Budget app', value: 'budget_app', points: { financialChaos: -2 } },
      { label: 'Bank notifications', value: 'bank_alerts', points: { financialChaos: -1, traditionalFinance: 1 } },
      { label: 'I check occasionally', value: 'occasionally', points: { financialChaos: 1 } },
      { label: 'I hope for the best', value: 'hope', points: { financialChaos: 4 } }
    ]
  },
  {
    key: 'online_purchase_style',
    text: 'When making online purchases you...',
    options: [
      { label: 'Check platform carefully', value: 'check', points: { securityChaos: -2, financialChaos: -1 } },
      { label: 'Trust known platforms', value: 'known', points: { securityChaos: -1 } },
      { label: 'Try new ones randomly', value: 'random', points: { securityChaos: 2, financialChaos: 1 } },
      { label: 'Click buy immediately', value: 'impulse', points: { securityChaos: 2, financialChaos: 3 } }
    ]
  },
  {
    key: 'finance_app_count',
    text: 'How many financial apps are on your phone?',
    options: [
      { label: '1-2', value: 'few', points: { financialChaos: -1, traditionalFinance: 1 } },
      { label: '3-5', value: 'mid', points: { financialChaos: 1 } },
      { label: '6+', value: 'many', points: { financialChaos: 3, degenEnergy: 1 } },
      { label: 'I lost count', value: 'lost_count', points: { financialChaos: 5, degenEnergy: 1 } }
    ]
  },
  {
    key: 'data_sharing_between_apps',
    text: 'How do you feel about financial data being shared between apps?',
    options: [
      { label: 'I try to avoid it', value: 'avoid', points: { privacyRisk: -2 } },
      { label: 'Depends on service', value: 'depends', points: { privacyRisk: -1 } },
      { label: 'I do not think about it', value: 'dont_think', points: { privacyRisk: 2 } },
      { label: 'It probably happens anyway', value: 'happens_anyway', points: { privacyRisk: 3 } }
    ]
  },
  {
    key: 'financial_privacy_meaning',
    text: 'When you hear financial privacy, you think...',
    options: [
      { label: 'Essential', value: 'essential', points: { privacyRisk: -3 } },
      { label: 'Important but complicated', value: 'complicated', points: { privacyRisk: -1 } },
      { label: 'Nice idea', value: 'nice_idea', points: { privacyRisk: 2 } },
      { label: 'Never thought about it', value: 'never_thought', points: { privacyRisk: 4 } }
    ]
  },
  {
    key: 'company_data_knowledge',
    text: 'Do you know how companies use your financial data?',
    options: [
      { label: 'Yes', value: 'yes', points: { privacyRisk: -2 } },
      { label: 'Somewhat', value: 'somewhat', points: { privacyRisk: -1 } },
      { label: 'Not really', value: 'not_really', points: { privacyRisk: 2 } },
      { label: 'No idea', value: 'no_idea', points: { privacyRisk: 3 } }
    ]
  },
  {
    key: 'bank_data_check',
    text: 'Have you checked what data your bank collects?',
    options: [
      { label: 'Yes', value: 'yes', points: { privacyRisk: -2, traditionalFinance: 1 } },
      { label: 'Once or twice', value: 'once_or_twice', points: { privacyRisk: -1, traditionalFinance: 1 } },
      { label: 'Never', value: 'never', points: { privacyRisk: 2 } },
      { label: 'Did not know I could', value: 'did_not_know', points: { privacyRisk: 3 } }
    ]
  },
  {
    key: 'new_finance_app_behavior',
    text: 'When a new finance app launches you...',
    options: [
      { label: 'Research first', value: 'research_first', points: { securityChaos: -2, degenEnergy: -1 } },
      { label: 'Wait for reviews', value: 'wait_reviews', points: { securityChaos: -1 } },
      { label: 'Try immediately', value: 'try_now', points: { degenEnergy: 2, financialChaos: 1 } },
      { label: 'Download everything', value: 'download_all', points: { degenEnergy: 3, financialChaos: 2 } }
    ]
  },
  {
    key: 'screenshot_sharing_habit',
    text: 'How careful are you sharing financial screenshots?',
    options: [
      { label: 'Very careful', value: 'very_careful', points: { privacyRisk: -2 } },
      { label: 'Somewhat careful', value: 'somewhat', points: { privacyRisk: -1 } },
      { label: 'Sometimes careless', value: 'careless', points: { privacyRisk: 2 } },
      { label: 'I share freely', value: 'free_share', points: { privacyRisk: 4 } }
    ]
  },
  {
    key: 'privacy_tools_usage',
    text: 'Do you use tools that protect privacy online?',
    options: [
      { label: 'Yes', value: 'yes', points: { privacyRisk: -2, securityChaos: -1 } },
      { label: 'Sometimes', value: 'sometimes', points: { privacyRisk: -1 } },
      { label: 'Rarely', value: 'rarely', points: { privacyRisk: 1 } },
      { label: 'Never', value: 'never', points: { privacyRisk: 3, securityChaos: 1 } }
    ]
  },
  {
    key: 'wallet_balance_check',
    text: 'How often do you check your wallet balance?',
    options: [
      { label: 'Multiple times a day', value: 'many', points: { degenEnergy: 3 } },
      { label: 'Once a day', value: 'daily', points: { degenEnergy: 2 } },
      { label: 'Occasionally', value: 'occasionally', points: {} },
      { label: 'I am scared to look', value: 'scared', points: { financialChaos: 2 } }
    ]
  },
  {
    key: 'biggest_financial_fear',
    text: 'Your biggest financial fear is...',
    options: [
      { label: 'Losing money', value: 'losing_money', points: { financialChaos: 1 } },
      { label: 'Getting hacked', value: 'getting_hacked', points: { securityChaos: 1 } },
      { label: 'Being tracked', value: 'being_tracked', points: { privacyRisk: -1 } },
      { label: 'Missing out', value: 'missing_out', points: { degenEnergy: 3 } }
    ]
  },
  {
    key: 'new_platform_first_move',
    text: 'When trying a new financial platform you...',
    options: [
      { label: 'Start small', value: 'start_small', points: { securityChaos: -1, degenEnergy: -1 } },
      { label: 'Research first', value: 'research_first', points: { securityChaos: -2, degenEnergy: -1 } },
      { label: 'Jump in', value: 'jump_in', points: { degenEnergy: 3, financialChaos: 1 } },
      { label: 'Follow what friends do', value: 'follow_friends', points: { degenEnergy: 2, financialChaos: 1 } }
    ]
  },
  {
    key: 'tracking_permission_prompt',
    text: 'When apps ask to track activity you...',
    options: [
      { label: 'Decline', value: 'decline', points: { privacyRisk: -2 } },
      { label: 'Sometimes allow', value: 'sometimes_allow', points: { privacyRisk: 1 } },
      { label: 'Usually allow', value: 'usually_allow', points: { privacyRisk: 2 } },
      { label: 'Always allow', value: 'always_allow', points: { privacyRisk: 4 } }
    ]
  },
  {
    key: 'self_privacy_rating',
    text: 'How private do you think your financial life is?',
    options: [
      { label: 'Very private', value: 'very_private', points: { privacyRisk: -1 } },
      { label: 'Somewhat private', value: 'somewhat_private', points: {} },
      { label: 'Not very private', value: 'not_private', points: { privacyRisk: 2 } },
      { label: 'Probably exposed', value: 'exposed', points: { privacyRisk: 3 } }
    ]
  },
  {
    key: 'receive_money',
    text: 'How do you receive money most often?',
    options: [
      { label: 'Crypto on public chain', value: 'public_crypto', points: { privacyRisk: 4 } },
      { label: 'Crypto on private chain', value: 'private_crypto', points: { privacyRisk: -2 } },
      { label: 'Bank transfer only', value: 'bank_only', points: { traditionalFinance: 2, degenEnergy: -1 } },
      { label: 'Mix of both', value: 'mix', points: { privacyRisk: 1 } }
    ]
  },
  {
    key: 'bnpl_use',
    text: 'Have you used Buy Now Pay Later?',
    options: [
      { label: 'Yes, regularly (even essentials)', value: 'always', points: { financialChaos: 4 } },
      { label: 'Sometimes', value: 'sometimes', points: { financialChaos: 2 } },
      { label: 'Never', value: 'never', points: { financialChaos: -1 } },
      { label: 'I pay cash', value: 'cash', points: { financialChaos: -1, traditionalFinance: 1 } }
    ]
  },
  {
    key: 'crypto_activity',
    text: 'What is your crypto activity level?',
    options: [
      { label: 'DeFi degen', value: 'degen', points: { degenEnergy: 4, financialChaos: 1 } },
      { label: 'Casual user', value: 'casual', points: { degenEnergy: 1 } },
      { label: 'HODL only', value: 'hodl', points: { degenEnergy: 0 } },
      { label: 'I do not use crypto', value: 'none', points: { degenEnergy: -2, traditionalFinance: 2 } }
    ]
  },
  {
    key: 'wallet_known',
    text: 'Where do people know your wallet address from?',
    options: [
      { label: 'It is in my social bio', value: 'bio', points: { privacyRisk: 5 } },
      { label: 'A few friends know', value: 'friends', points: { privacyRisk: 1 } },
      { label: 'Nobody knows', value: 'nobody', points: { privacyRisk: -2 } },
      { label: 'I do not have a wallet', value: 'nowallet', points: { traditionalFinance: 1 } }
    ]
  },
  {
    key: 'seed_storage',
    text: 'Where do you store your seed phrase?',
    options: [
      { label: 'Notes app or cloud', value: 'notes', points: { securityChaos: 5 } },
      { label: 'Written down and hidden', value: 'written', points: { securityChaos: 1 } },
      { label: 'Hardware wallet', value: 'hardware', points: { securityChaos: -2 } },
      { label: 'Memorized only', value: 'memory', points: { securityChaos: 3 } },
      { label: 'What is a seed phrase?', value: 'unknown', points: { securityChaos: 6 } }
    ]
  },
  {
    key: 'password_hygiene',
    text: 'Password behavior across platforms?',
    options: [
      { label: 'Same password everywhere', value: 'same', points: { securityChaos: 5 } },
      { label: 'Similar variations', value: 'similar', points: { securityChaos: 3 } },
      { label: 'Unique with password manager', value: 'manager', points: { securityChaos: -2 } },
      { label: 'Unique memorized passwords', value: 'unique_mem', points: { securityChaos: -1 } }
    ]
  },
  {
    key: 'twofa',
    text: 'How do you handle 2FA?',
    options: [
      { label: 'SMS', value: 'sms', points: { securityChaos: 2 } },
      { label: 'Email', value: 'email', points: { securityChaos: 3 } },
      { label: 'Authenticator app', value: 'auth_app', points: { securityChaos: -1 } },
      { label: 'Hardware security key', value: 'security_key', points: { securityChaos: -2 } },
      { label: 'What is 2FA?', value: 'unknown', points: { securityChaos: 5 } }
    ]
  },
  {
    key: 'onchain_send_style',
    text: 'How do you usually send money on-chain?',
    options: [
      { label: 'Test tx first', value: 'test_first', points: { securityChaos: -1 } },
      { label: 'Copy-paste and pray', value: 'pray', points: { securityChaos: 3 } },
      { label: 'Address book and checks', value: 'safe_book', points: { securityChaos: -2 } },
      { label: 'Wrong chain often', value: 'wrong_chain', points: { securityChaos: 2, financialChaos: 3 } }
    ]
  },
  {
    key: 'contract_approval_style',
    text: 'How do you approve smart contracts?',
    options: [
      { label: 'Read permissions', value: 'read', points: { securityChaos: -2 } },
      { label: 'Quick glance', value: 'quick', points: { securityChaos: 1 } },
      { label: 'Approve max always', value: 'max', points: { securityChaos: 4 } },
      { label: 'Click confirm blindly', value: 'blind', points: { securityChaos: 5 } }
    ]
  },
  {
    key: 'stablecoin_reaction',
    text: 'Stablecoins are...',
    options: [
      { label: 'Digital dollars', value: 'digital_dollars', points: { financialChaos: -1 } },
      { label: 'Useful for trading', value: 'for_trading', points: { degenEnergy: 1 } },
      { label: 'Heard of them, not sure', value: 'heard_not_sure', points: { financialChaos: 1 } },
      { label: 'No idea honestly', value: 'no_idea', points: { financialChaos: 3 } }
    ]
  },
  {
    key: 'fomo_buying',
    text: 'How often do you FOMO buy green candles?',
    options: [
      { label: 'Never', value: 'never', points: { degenEnergy: -1 } },
      { label: 'Sometimes', value: 'sometimes', points: { degenEnergy: 2 } },
      { label: 'Frequently', value: 'frequent', points: { degenEnergy: 4, financialChaos: 1 } },
      { label: 'Every time', value: 'always', points: { degenEnergy: 6, financialChaos: 2 } }
    ]
  },
  {
    key: 'money_flow_style',
    text: 'If asked how your money moves online, you would say...',
    options: [
      { label: 'Private wallets and direct transfers', value: 'private_direct', points: { privacyRisk: -2 } },
      { label: 'Mix of exchanges and wallets', value: 'mix', points: { financialChaos: 1 } },
      { label: 'Mostly centralized platforms', value: 'centralized', points: { privacyRisk: 1, traditionalFinance: 1 } },
      { label: 'Honestly, not sure', value: 'unknown', points: { financialChaos: 3 } }
    ]
  },
  {
    key: 'salary_spend_pattern',
    text: 'When salary hits your account, what happens first?',
    options: [
      { label: 'Bills first, then invest', value: 'disciplined', points: { financialChaos: -1 } },
      { label: 'Straight to trading', value: 'trade_first', points: { degenEnergy: 2, financialChaos: 2 } },
      { label: 'Split across apps randomly', value: 'random_split', points: { financialChaos: 3 } },
      { label: 'Gone in 48 hours', value: 'gone_fast', points: { financialChaos: 5 } }
    ]
  },
  {
    key: 'new_project_approach',
    text: 'Your approach to new crypto projects is...',
    options: [
      { label: 'Research deeply before touching it', value: 'research', points: { degenEnergy: -1, securityChaos: -1 } },
      { label: 'Watch from the sidelines', value: 'watch', points: {} },
      { label: 'Test with small funds', value: 'small_test', points: { degenEnergy: 1 } },
      { label: 'A friend told me, so I am in', value: 'friend_in', points: { degenEnergy: 3, financialChaos: 1 } }
    ]
  }
];

export const ROAST_PROFILES = {
  publicLedgerCelebrity: {
    title: 'PUBLIC LEDGER CELEBRITY',
    rarity: 9,
    body:
      'You treat the internet like a diary.\nYour transactions are public.\nYour habits are predictable.\n\nYour financial life is basically a documentary series.',
    seismic: 'Seismic encrypts transactions so your financial activity does not become public entertainment.',
    shareBehaviorLabel: 'privacy strategy',
    shareBehaviorQuote: 'Everyone can see everything.',
    shareLine: 'Apparently my wallet is financial reality TV.',
    shareSeismicFix: 'Your bad decisions stay private on Seismic.'
  },
  dataDonationProgram: {
    title: 'DATA DONATION PROGRAM',
    rarity: 11,
    body:
      'Your personal data has traveled more than most passports.\nApps track you.\nPlatforms profile you.\n\nYou are not just a user. You are a data supplier.',
    seismic: 'Financial activity should stay private, not become part of a data marketplace.',
    shareBehaviorLabel: 'data policy',
    shareBehaviorQuote: 'If apps ask, I allow it.',
    shareLine: 'My privacy settings are mostly vibes.',
    shareSeismicFix: 'Less data leakage, more private finance.'
  },
  termsSpeedrunner: {
    title: 'TERMS AND CONDITIONS SPEEDRUNNER',
    rarity: 10,
    body:
      'You accept permissions faster than anyone reads them.\nTracking? Accepted.\nData sharing? Accepted.\n\nYou are one click away from giving away too much.',
    seismic: 'Financial privacy should not depend on reading 40-page agreements.',
    shareBehaviorLabel: 'permission style',
    shareBehaviorQuote: 'Accept now, read never.',
    shareLine: 'I set records for clicking Agree.',
    shareSeismicFix: 'Keep transactions private by default.'
  },
  financiallyUnhinged: {
    title: 'FINANCIALLY UNHINGED',
    rarity: 10,
    body:
      'Your financial strategy appears to be: let us see what happens.\nYou try platforms instantly.\nYou explore everything.\n\nRisk management is mostly vibes.',
    seismic: 'Even chaotic financial explorers deserve private transactions.',
    shareBehaviorLabel: 'investment strategy',
    shareBehaviorQuote: 'Let us see what happens.',
    shareLine: 'Risk management appears to be vibes.',
    shareSeismicFix: 'Even chaotic trades can stay private.'
  },
  walletBalanceTherapist: {
    title: 'WALLET BALANCE THERAPIST',
    rarity: 13,
    body:
      'You check your wallet balance like it is a mood tracker.\nUp means joy.\nDown means existential dread.\n\nYour emotions are tied to numbers on a screen.',
    seismic: 'At least your financial activity does not have to be public.',
    shareBehaviorLabel: 'hobby',
    shareBehaviorQuote: 'Checking my wallet again.',
    shareLine: 'My mood chart is basically a price chart.',
    shareSeismicFix: 'Your transactions can stay private.'
  },
  fintechTourist: {
    title: 'FINTECH TOURIST',
    rarity: 15,
    body:
      'Your phone has bank apps, wallets, exchanges, and trackers.\n\nYour phone is not a phone anymore.\nIt is a financial operating system.',
    seismic: 'Modern finance should include modern privacy.',
    shareBehaviorLabel: 'financial stack',
    shareBehaviorQuote: 'Every app looked useful.',
    shareLine: 'My phone is a fintech app store.',
    shareSeismicFix: 'Modern finance needs modern privacy.'
  },
  exitLiquidityProvider: {
    title: 'EXIT LIQUIDITY PROVIDER',
    rarity: 12,
    body:
      'You have a special talent for buying exactly when everyone else exits.\nMarket top? You are there.\nMarket dump? Also there.\n\nYour timing is consistently expensive.',
    seismic: 'At least your trades do not need to be public entertainment.',
    shareBehaviorLabel: 'market timing',
    shareBehaviorQuote: 'Buy when it feels exciting.',
    shareLine: 'Somehow I always buy the top.',
    shareSeismicFix: 'At least my trades stay private.'
  },
  twitterResearcher: {
    title: 'TWITTER RESEARCHER',
    rarity: 13,
    body:
      'Your research process is simple.\nRead a thread.\nTrust the vibe.\nMove funds.\n\nTraditional finance has analysts. Crypto has your timeline.',
    seismic: 'Your research can stay public. Your financial activity does not have to.',
    shareBehaviorLabel: 'research method',
    shareBehaviorQuote: 'Someone online said it was safe.',
    shareLine: 'My due diligence is mostly timelines.',
    shareSeismicFix: 'Research public, transactions private.'
  },
  privacyCurious: {
    title: 'PRIVACY CURIOUS',
    rarity: 18,
    body:
      'You are starting to realize financial systems see everything.\nBanks track.\nApps profile.\nChains expose.\n\nWelcome to the privacy rabbit hole.',
    seismic: 'Seismic keeps financial activity encrypted by default.',
    shareBehaviorLabel: 'mindset',
    shareBehaviorQuote: 'Privacy sounds important now.',
    shareLine: 'I just realized the internet remembers everything.',
    shareSeismicFix: 'Financial activity stays encrypted.'
  },
  curiousExplorer: {
    title: 'CURIOUS EXPLORER',
    rarity: 16,
    body:
      'You experiment carefully.\nYou test with small amounts.\nYou do not confuse hype with homework.\n\nSuspiciously competent behavior for crypto.',
    seismic: 'Smart exploration deserves private transactions.',
    shareBehaviorLabel: 'strategy',
    shareBehaviorQuote: 'Start small, then decide.',
    shareLine: 'Being careful in crypto is suspicious.',
    shareSeismicFix: 'Smart exploration deserves privacy.'
  },
  stablecoinSurvivor: {
    title: 'STABLECOIN SURVIVOR',
    rarity: 17,
    body:
      'While others ride volatility, you found calm.\nStable assets.\nControlled moves.\n\nSome call it boring. Others call it survival.',
    seismic: 'Even stable financial activity deserves privacy.',
    shareBehaviorLabel: 'safe asset',
    shareBehaviorQuote: 'Digital dollars keep me sane.',
    shareLine: 'I discovered the calm part of crypto.',
    shareSeismicFix: 'Stable assets deserve privacy.'
  },
  bankAppLoyalist: {
    title: 'BANK APP LOYALIST',
    rarity: 19,
    body:
      'Your financial stack is mostly your bank app.\nNo chaos.\nNo late-night protocol roulette.\n\nSomewhere a crypto maximalist just fainted.',
    seismic: 'Even modern banking should still protect privacy.',
    shareBehaviorLabel: 'financial tool',
    shareBehaviorQuote: 'My bank app works fine.',
    shareLine: 'Somewhere a crypto maximalist fainted.',
    shareSeismicFix: 'Even banks need privacy.'
  },
  dataAwareHuman: {
    title: 'DATA AWARE HUMAN',
    rarity: 12,
    body:
      'You understand your data is valuable.\nYour habits are traceable.\nYour financial life should be private by default.\n\nYou are paying attention.',
    seismic: 'Seismic encrypts financial activity at the protocol level.',
    shareBehaviorLabel: 'data mindset',
    shareBehaviorQuote: 'My financial data is not free.',
    shareLine: 'I actually think about data trails.',
    shareSeismicFix: 'Privacy should be default, not optional.'
  },
  responsibleAdult: {
    title: 'RESPONSIBLE ADULT',
    rarity: 11,
    body:
      'You research before moving money.\nYou use sane security habits.\nYou do not ape every trend.\n\nThis is extremely rare behavior in digital finance.',
    seismic: 'Responsible finance deserves private infrastructure.',
    shareBehaviorLabel: 'strategy',
    shareBehaviorQuote: 'Research first, move later.',
    shareLine: 'Reading instructions is apparently my superpower.',
    shareSeismicFix: 'Responsible habits with private rails.'
  },
  privacyGigachad: {
    title: 'PRIVACY GIGACHAD',
    rarity: 6,
    body:
      'You value privacy.\nYou think before sharing.\nYou use solid security habits.\n\nYou came to get roasted and somehow passed.',
    seismic: 'Keep your finances private by default.',
    shareBehaviorLabel: 'setup',
    shareBehaviorQuote: 'Caution plus privacy by design.',
    shareLine: 'I came to a roast game and passed.',
    shareSeismicFix: 'Keep your finances private by default.'
  }
};
