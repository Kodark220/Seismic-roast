import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { CATEGORY_KEYS, QUESTION_POOL, ROAST_PROFILES } from './lib/game-data';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Progress } from './components/ui/progress';

const ACTIVE_USER_KEY = 'seismic_active_username_v1';
const SUPABASE_CONFIG = window.SUPABASE_CONFIG || {};
const SUPABASE_URL = (SUPABASE_CONFIG.url || '').replace(/\/$/, '');
const SUPABASE_ANON_KEY = SUPABASE_CONFIG.anonKey || '';

const pageMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.25, ease: 'easeOut' }
};

function normalizeUsername(raw) {
  const value = raw.trim();
  if (!value) return null;
  const normalized = value.startsWith('@') ? value : `@${value}`;
  if (!/^@[A-Za-z0-9_]{2,24}$/.test(normalized)) return null;
  return normalized;
}

function parsePrivacyScore(scoreText) {
  const m = /([0-9]+)\s*\/\s*10/.exec(scoreText || '');
  return m ? Number(m[1]) : null;
}

function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
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
    console.error(error);
  }
}

async function persistResult(username, answers, result) {
  try {
    await supabaseInsert('roast_results', {
      username,
      pay: answers.receive_money || answers.pay || null,
      bnpl: answers.bnpl_use || answers.bnpl || null,
      crypto: answers.crypto_activity || answers.crypto || null,
      wallet: answers.wallet_known || answers.wallet || null,
      seed: answers.seed_storage || answers.seed || null,
      roast_title: result.title,
      privacy_score: parsePrivacyScore(result.score),
      roast_body: result.body,
      seismic_line: result.seismic,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error(error);
  }
}

const QUESTION_LOOKUP = Object.fromEntries(QUESTION_POOL.map((q) => [q.key, q]));
const RISK_CATEGORY_KEYS = ['privacyRisk', 'securityChaos', 'financialChaos', 'degenEnergy'];

function getOptionLabel(questionKey, value) {
  if (!questionKey || value == null) return '';
  const question = QUESTION_LOOKUP[questionKey];
  if (!question) return '';
  const option = question.options.find((opt) => opt.value === value);
  return option?.label || '';
}

function pickRandomQuestions(pool, total = 5) {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.max(5, Math.min(total, copy.length)));
}

function calculateCategoryTotals(answers) {
  const totals = CATEGORY_KEYS.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  Object.entries(answers).forEach(([key, value]) => {
    const question = QUESTION_LOOKUP[key];
    if (!question) return;
    const option = question.options.find((opt) => opt.value === value);
    if (!option) return;
    CATEGORY_KEYS.forEach((category) => {
      totals[category] += option.points?.[category] || 0;
    });
  });
  return totals;
}

function detectLowCryptoUsage(answers) {
  const signals = [
    answers.crypto_activity === 'none',
    answers.receive_money === 'bank_only',
    answers.wallet_known === 'nowallet',
    answers.money_flow_style === 'centralized',
    answers.stablecoin_reaction === 'no_idea'
  ].filter(Boolean).length;
  return signals >= 3;
}

function determineRoastId(answers, totals) {
  const publicExposureSignals = [
    answers.receive_money === 'public_crypto',
    answers.wallet_known === 'bio',
    ['often', 'did_not_know'].includes(answers.wallet_address_reuse || ''),
    ['usually_allow', 'always_allow'].includes(answers.tracking_permission_prompt || ''),
    ['not_private', 'exposed'].includes(answers.self_privacy_rating || ''),
    answers.data_sharing_online === 'enter_anyway'
  ].filter(Boolean).length;

  const dataDonationSignals = [
    answers.data_sharing_online === 'enter_anyway',
    answers.data_sharing_between_apps === 'happens_anyway',
    answers.tracking_permission_prompt === 'always_allow',
    answers.app_tracking_audit === 'never',
    answers.spending_visibility_comfort === 'dont_care'
  ].filter(Boolean).length;

  const termsSpeedSignals = [
    ['accept_fast', 'dont_look'].includes(answers.signup_permissions || ''),
    ['usually_allow', 'always_allow'].includes(answers.tracking_permission_prompt || ''),
    answers.new_finance_app_behavior === 'download_all'
  ].filter(Boolean).length;

  const degenSignals = [
    answers.new_platform_first_move === 'jump_in',
    answers.new_project_approach === 'friend_in',
    ['frequent', 'always'].includes(answers.fomo_buying || ''),
    answers.biggest_financial_fear === 'missing_out'
  ].filter(Boolean).length;

  const cautiousSignals = [
    ['start_small', 'research_first'].includes(answers.new_platform_first_move || ''),
    ['research', 'small_test'].includes(answers.new_project_approach || ''),
    answers.signup_permissions === 'read',
    answers.spend_tracking_method === 'budget_app'
  ].filter(Boolean).length;

  const strongSecuritySignals = [
    answers.seed_storage === 'hardware',
    answers.password_hygiene === 'manager',
    ['auth_app', 'security_key'].includes(answers.twofa || ''),
    ['test_first', 'safe_book'].includes(answers.onchain_send_style || ''),
    answers.contract_approval_style === 'read'
  ].filter(Boolean).length;

  const stableSignals = [
    answers.stablecoin_reaction === 'digital_dollars',
    answers.fomo_buying === 'never',
    answers.salary_spend_pattern === 'disciplined'
  ].filter(Boolean).length;

  if (totals.privacyRisk <= -4 && totals.securityChaos <= -3 && totals.financialChaos <= 1 && totals.degenEnergy <= 1) {
    return 'privacyGigachad';
  }

  if (totals.privacyRisk <= -3 && answers.financial_privacy_meaning === 'essential' && answers.company_data_knowledge === 'yes') {
    return 'dataAwareHuman';
  }

  if (strongSecuritySignals >= 3 && cautiousSignals >= 2 && totals.securityChaos <= 0 && totals.degenEnergy <= 2) {
    return 'responsibleAdult';
  }

  if (stableSignals >= 2 && totals.financialChaos <= 2 && totals.degenEnergy <= 2) {
    return 'stablecoinSurvivor';
  }

  if (detectLowCryptoUsage(answers) || (totals.traditionalFinance >= 4 && totals.degenEnergy <= 1)) {
    return 'bankAppLoyalist';
  }

  if (answers.wallet_balance_check === 'many' && ['losing_money', 'missing_out'].includes(answers.biggest_financial_fear || '')) {
    return 'walletBalanceTherapist';
  }

  if (answers.new_platform_first_move === 'follow_friends' || answers.new_project_approach === 'friend_in') {
    return 'twitterResearcher';
  }

  if (degenSignals >= 3 || (totals.degenEnergy >= 7 && totals.financialChaos >= 4)) {
    return 'exitLiquidityProvider';
  }

  if (answers.new_platform_first_move === 'jump_in' || answers.new_finance_app_behavior === 'download_all' || totals.degenEnergy >= 6) {
    return 'financiallyUnhinged';
  }

  if (termsSpeedSignals >= 2 || totals.securityChaos >= 7) {
    return 'termsSpeedrunner';
  }

  if (dataDonationSignals >= 3) {
    return 'dataDonationProgram';
  }

  if (publicExposureSignals >= 3 || totals.privacyRisk >= 8) {
    return 'publicLedgerCelebrity';
  }

  if (['many', 'lost_count'].includes(answers.finance_app_count || '') || totals.financialChaos >= 6) {
    return 'fintechTourist';
  }

  if (cautiousSignals >= 2 && totals.degenEnergy <= 3 && totals.financialChaos <= 3) {
    return 'curiousExplorer';
  }

  if (
    ['complicated', 'nice_idea'].includes(answers.financial_privacy_meaning || '') ||
    ['somewhat', 'not_really'].includes(answers.company_data_knowledge || '') ||
    totals.privacyRisk >= 2
  ) {
    return 'privacyCurious';
  }

  const dominant = [...CATEGORY_KEYS].sort((a, b) => totals[b] - totals[a])[0];
  if (dominant === 'traditionalFinance') return 'bankAppLoyalist';
  if (dominant === 'privacyRisk') return 'publicLedgerCelebrity';
  if (dominant === 'securityChaos') return 'termsSpeedrunner';
  if (dominant === 'financialChaos') return 'fintechTourist';
  if (dominant === 'degenEnergy') return 'financiallyUnhinged';
  return 'privacyCurious';
}

function computePrivacyScore(totals) {
  const chaosSum = RISK_CATEGORY_KEYS.reduce((sum, key) => sum + Math.max(0, totals[key]), 0);
  return Math.max(0, Math.min(10, 10 - Math.round(chaosSum / 3)));
}

function pickRoast(answers) {
  const totals = calculateCategoryTotals(answers);
  const id = determineRoastId(answers, totals);
  const profile = ROAST_PROFILES[id] || ROAST_PROFILES.fintechTourist;
  const score = computePrivacyScore(totals);
  return {
    ...profile,
    id,
    totals,
    score: `Privacy Score: ${score} / 10`
  };
}

const BONUS_RULES = [
  {
    when: (a) => a.wallet_known === 'bio' && a.receive_money === 'public_crypto',
    line: 'Your wallet is not private. It is public entertainment.'
  },
  {
    when: (a) => a.seed_storage === 'notes',
    line: 'Hackers call this low effort mode.'
  },
  {
    when: (a) =>
      a.bnpl_use === 'always' &&
      (a.crypto_activity === 'degen' || a.new_platform_first_move === 'jump_in' || a.fomo_buying === 'always'),
    line: 'Financing groceries while trading crypto is elite financial optimism.'
  },
  {
    when: (a) => a.finance_app_count === 'lost_count' || a.finance_app_count === 'many',
    line: 'Your financial life looks like a startup tech stack diagram.'
  },
  {
    when: (a) => a.wallet_balance_check === 'many',
    line: 'Your wallet balance is your emotional support animal.'
  },
  {
    when: (a) => a.stablecoin_reaction === 'no_idea',
    line: 'You are in crypto conversations the way people review movies they never watched.'
  },
  {
    when: (a) => a.new_platform_first_move === 'jump_in',
    line: 'Your research strategy is figure it out later.'
  },
  {
    when: (a) => a.password_hygiene === 'same',
    line: 'Hackers love people like you. It saves them time.'
  },
  {
    when: (a) => a.seed_storage === 'unknown',
    line: 'You are one tutorial away from a crisis.'
  },
  {
    when: (a) => a.new_project_approach === 'friend_in',
    line: 'Your investment strategy is peer pressure.'
  },
  {
    when: (a) => ['accept_fast', 'dont_look'].includes(a.signup_permissions || ''),
    line: 'Your terms-and-conditions strategy is speed, not safety.'
  },
  {
    when: (a) => a.tracking_permission_prompt === 'always_allow',
    line: 'Your data sharing settings are aggressively generous.'
  }
];

const BONUS_FALLBACKS = [
  'You treat every new protocol like a flash sale.',
  'Your threat model is currently vibes-based architecture.',
  'Your portfolio is one push notification from a plot twist.',
  'This setup is funny until it is expensive.'
];

const FUN_OUTRO_BY_ROAST = {
  publicLedgerCelebrity: [
    { line1: 'You are broadcasting premium chaos.', line2: 'At least now the audience cannot watch live.' },
    { line1: 'Main character energy, no opsec.', line2: 'Now your mistakes happen off-camera.' },
    { line1: 'Wallet reality TV got cancelled.', line2: 'Private mode is finally enabled.' }
  ],
  termsSpeedrunner: [
    { line1: 'Security by optimism is a wild strategy.', line2: 'Now your chain activity is less exposed.' },
    { line1: 'Hackers were one click away.', line2: 'Now they have fewer breadcrumbs.' },
    { line1: 'You were speedrunning bad hygiene.', line2: 'Now at least the data trail is private.' }
  ],
  dataDonationProgram: [
    { line1: 'Data brokers appreciate your generosity.', line2: 'Now your transaction graph is less collectible.' },
    { line1: 'You were running a free analytics program.', line2: 'Now financial activity is harder to scrape.' },
    { line1: 'Tracking scripts loved your habits.', line2: 'Now they get less signal.' }
  ],
  financiallyUnhinged: [
    { line1: 'Your strategy is caffeine and courage.', line2: 'Now your on-chain plot twists stay private.' },
    { line1: 'Risk management is still missing.', line2: 'But spectators are now locked out.' },
    { line1: 'You trade like it is a game mode.', line2: 'Now your moves are less public theater.' }
  ],
  fintechTourist: [
    { line1: 'Your money map needs a GPS.', line2: 'Now the map is not public.' },
    { line1: 'Organized chaos remains chaos.', line2: 'At least it is encrypted chaos.' },
    { line1: 'Finance stack: vibes + tabs.', line2: 'Now fewer people can track your tabs.' }
  ],
  privacyGigachad: [
    { line1: 'Strong habits, low noise.', line2: 'Now your privacy posture is even cleaner.' },
    { line1: 'You actually did the boring things right.', line2: 'That is how people stay safe.' },
    { line1: 'Discipline looks good on you.', line2: 'Keep it private by default.' }
  ],
  default: [
    { line1: 'Still making questionable decisions...', line2: "but at least now they're PRIVATE." },
    { line1: 'Your wallet arc is still dramatic.', line2: 'Now it is not a public series.' },
    { line1: 'You are still you, respectfully.', line2: 'Now your chain moves stay off the timeline.' },
    { line1: 'Chaos level unchanged.', line2: 'Visibility level reduced.' },
    { line1: 'You can keep being unpredictable.', line2: 'Now do it in private.' },
    { line1: 'The energy is still unhinged.', line2: 'The metadata is less exposed.' }
  ]
};

const POSITIVE_SEISMIC_FIX_LINES = [
  'Strong score. Seismic keeps your financial activity private by default.',
  'You are already doing a lot right. Seismic makes privacy seamless from here.',
  'Great habits. Seismic helps you keep moving privately without extra stress.'
];

const POSITIVE_SHARE_SEISMIC_FIX_LINES = [
  'Great habits stay private by default.',
  'Strong setup. Seismic keeps it private.',
  'You are doing it right. Privacy stays on by default.'
];

const SEISMIC_FIX_RULES = [
  {
    kind: 'privacy',
    when: (a) => a.wallet_known === 'bio' || a.receive_money === 'public_crypto',
    fix: 'Your exposure point is public visibility. Seismic keeps salary flows, transfers, and balances private by default.',
    shareFix: 'Your public wallet trail can be private.'
  },
  {
    kind: 'security',
    when: (a) => a.seed_storage === 'notes' || a.seed_storage === 'unknown',
    fix: 'Seed handling is the risk center. Move recovery data offline and pair that with private transaction rails on Seismic.',
    shareFix: 'Fix key hygiene and keep activity private.'
  },
  {
    kind: 'degen',
    when: (a) => a.new_platform_first_move === 'jump_in' || a.fomo_buying === 'always',
    fix: 'Your speed is high, your risk is higher. Seismic gives private execution while you test with smaller, safer steps.',
    shareFix: 'Move fast, but keep transactions private.'
  },
  {
    kind: 'finance',
    when: (a) => ['many', 'lost_count'].includes(a.finance_app_count || '') || a.money_flow_style === 'mix' || a.money_flow_style === 'unknown',
    fix: 'Your flows are fragmented. Seismic helps consolidate movement privacy across wallets, apps, and platforms.',
    shareFix: 'Messy flows get safer with private rails.'
  },
  {
    kind: 'traditional',
    when: (a) => a.crypto_activity === 'none' || a.receive_money === 'bank_only',
    fix: 'Your setup is conservative. Seismic lets you adopt on-chain finance later without sacrificing privacy standards.',
    shareFix: 'Conservative setup, private upgrade path.'
  }
];

const POSITIVE_SEISMIC_FIX_RULES = [
  {
    kind: 'security',
    when: (a) => a.seed_storage === 'hardware' || a.password_hygiene === 'manager',
    fix: 'Strong security posture. Seismic complements that by keeping transaction-level data private by default.',
    shareFix: 'Strong security + private execution.'
  },
  {
    kind: 'privacy',
    when: (a) => a.financial_privacy_meaning === 'essential' || a.company_data_knowledge === 'yes',
    fix: 'You already value privacy correctly. Seismic turns that mindset into default on-chain behavior.',
    shareFix: 'Privacy mindset, protocol-level defaults.'
  },
  {
    kind: 'finance',
    when: (a) => a.money_flow_style === 'private_direct' || a.receive_money === 'private_crypto',
    fix: 'Your flow design is already smart. Seismic keeps that discipline consistent as your activity scales.',
    shareFix: 'Private flow, scaled cleanly.'
  }
];

const ROAST_SEISMIC_KIND_PREFERENCE = {
  publicLedgerCelebrity: ['privacy'],
  dataDonationProgram: ['privacy'],
  termsSpeedrunner: ['security'],
  financiallyUnhinged: ['degen', 'finance'],
  walletBalanceTherapist: ['finance', 'degen'],
  fintechTourist: ['finance'],
  exitLiquidityProvider: ['degen', 'finance'],
  twitterResearcher: ['degen', 'privacy'],
  privacyCurious: ['privacy'],
  curiousExplorer: ['security', 'privacy'],
  stablecoinSurvivor: ['finance'],
  bankAppLoyalist: ['traditional', 'privacy'],
  dataAwareHuman: ['privacy'],
  responsibleAdult: ['security', 'privacy'],
  privacyGigachad: ['privacy', 'security']
};

function stableHash(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function pickFunOutro(roastId, answers) {
  const pool = [...(FUN_OUTRO_BY_ROAST[roastId] || []), ...FUN_OUTRO_BY_ROAST.default];
  const signature = Object.entries(answers || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|');
  const idx = stableHash(`${roastId}|${signature}`) % pool.length;
  return pool[idx];
}

function deriveSeismicFixFromAnswers(answers, scoreValue, roastId, fallbackFix, fallbackShareFix) {
  const preferredKinds = ROAST_SEISMIC_KIND_PREFERENCE[roastId] || [];
  const matchByKinds = (rules) => {
    for (const kind of preferredKinds) {
      const matched = rules.find((rule) => rule.kind === kind && rule.when(answers));
      if (matched) return matched;
    }
    return rules.find((rule) => rule.when(answers));
  };

  const isPositive = scoreValue >= 7;
  if (isPositive) {
    const matchedPositive = matchByKinds(POSITIVE_SEISMIC_FIX_RULES);
    if (matchedPositive) {
      return { fix: matchedPositive.fix, shareFix: matchedPositive.shareFix };
    }
    const idx = stableHash(`${roastId}|${scoreValue}|positive-fix`) % POSITIVE_SEISMIC_FIX_LINES.length;
    const shareIdx = stableHash(`${roastId}|${scoreValue}|positive-share`) % POSITIVE_SHARE_SEISMIC_FIX_LINES.length;
    return {
      fix: POSITIVE_SEISMIC_FIX_LINES[idx],
      shareFix: POSITIVE_SHARE_SEISMIC_FIX_LINES[shareIdx]
    };
  }

  const matched = matchByKinds(SEISMIC_FIX_RULES);
  if (matched) {
    return { fix: matched.fix, shareFix: matched.shareFix };
  }

  return { fix: fallbackFix, shareFix: fallbackShareFix };
}

const ROAST_BEHAVIOR_MAP = {
  publicLedgerCelebrity: { key: 'wallet_known', label: 'privacy strategy' },
  dataDonationProgram: { key: 'tracking_permission_prompt', label: 'data policy' },
  termsSpeedrunner: { key: 'signup_permissions', label: 'permission style' },
  financiallyUnhinged: { key: 'new_platform_first_move', label: 'investment strategy' },
  walletBalanceTherapist: { key: 'wallet_balance_check', label: 'hobby' },
  fintechTourist: { key: 'finance_app_count', label: 'financial stack' },
  exitLiquidityProvider: { key: 'fomo_buying', label: 'market timing' },
  twitterResearcher: { key: 'new_platform_first_move', label: 'research method' },
  privacyCurious: { key: 'financial_privacy_meaning', label: 'mindset' },
  curiousExplorer: { key: 'new_project_approach', label: 'strategy' },
  stablecoinSurvivor: { key: 'stablecoin_reaction', label: 'safe asset' },
  bankAppLoyalist: { key: 'receive_money', label: 'financial tool' },
  dataAwareHuman: { key: 'company_data_knowledge', label: 'data mindset' },
  responsibleAdult: { key: 'new_platform_first_move', label: 'strategy' },
  privacyGigachad: { key: 'seed_storage', label: 'security setup' },
  fallback: { key: 'new_platform_first_move', label: 'strategy' }
};

function getBehaviorLine(answers, totals, roastId) {
  const mapped = ROAST_BEHAVIOR_MAP[roastId];
  if (mapped) {
    const label = getOptionLabel(mapped.key, answers[mapped.key]);
    if (label) return { label: mapped.label, quote: label };
  }

  const prioritySignals = [
    { key: 'new_platform_first_move', label: 'research method' },
    { key: 'new_project_approach', label: 'investment strategy' },
    { key: 'wallet_balance_check', label: 'wallet relationship' },
    { key: 'seed_storage', label: 'security setup' },
    { key: 'wallet_known', label: 'privacy strategy' },
    { key: 'tracking_permission_prompt', label: 'tracking choice' },
    { key: 'finance_app_count', label: 'financial stack' },
    { key: 'receive_money', label: 'financial tool' }
  ];
  for (const signal of prioritySignals) {
    const label = getOptionLabel(signal.key, answers[signal.key]);
    if (label) return { label: signal.label, quote: label };
  }

  const dominant = [...CATEGORY_KEYS].sort((a, b) => totals[b] - totals[a])[0];
  if (dominant === 'securityChaos') {
    return { label: 'security strategy', quote: 'Hope nobody notices.' };
  }
  if (dominant === 'financialChaos') {
    return { label: 'budget plan', quote: 'Try everything and hope it works.' };
  }
  if (dominant === 'degenEnergy') {
    return { label: 'risk management', quote: 'What is the worst that could happen?' };
  }
  return { label: 'financial strategy', quote: 'Privacy first, chaos later.' };
}

function getPunchlineLines(body) {
  const lines = (body || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  return [
    lines[0] || 'Apparently your setup is running on vibes.',
    lines[1] || 'This might be entertaining, but it is not secure.'
  ];
}

function stripSeismicPrefix(text) {
  return (text || '').replace(/^On Seismic:\s*/i, '').trim();
}

function getBonusRoasts(answers) {
  const mapped = BONUS_RULES.filter((item) => item.when(answers)).map((item) => item.line);
  const unique = [...new Set(mapped)];
  for (const line of BONUS_FALLBACKS) {
    if (unique.length >= 2) break;
    if (!unique.includes(line)) unique.push(line);
  }
  return unique.slice(0, 2);
}

function buildResultPresentation(result, answers) {
  const mappedBehavior = ROAST_BEHAVIOR_MAP[result.id];
  const mappedPickedOption = mappedBehavior ? getOptionLabel(mappedBehavior.key, answers[mappedBehavior.key]) : '';
  const behavior = mappedPickedOption
    ? { label: mappedBehavior.label, quote: mappedPickedOption }
    : result.shareBehaviorLabel && result.shareBehaviorQuote
      ? { label: result.shareBehaviorLabel, quote: result.shareBehaviorQuote }
      : getBehaviorLine(answers, result.totals || {}, result.id);
  const storyParagraphs = (result.body || '')
    .split('\n\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const bonusRoasts = getBonusRoasts(answers);
  const [defaultLine1, defaultLine2] = getPunchlineLines(result.shareLine || result.body);
  const personalizedLine = result.shareLine || defaultLine1;
  const personalizedLine2 = result.shareLine2 || '';
  const funOutro = pickFunOutro(result.id, answers);
  const scoreValue = parsePrivacyScore(result.score) ?? 5;
  const baseSeismicFix = stripSeismicPrefix(result.seismic) || 'Your bad decisions stay private.';
  const baseShareSeismicFix = result.shareSeismicFix || 'Your bad decisions stay private on Seismic.';
  const derivedFix = deriveSeismicFixFromAnswers(
    answers,
    scoreValue,
    result.id,
    baseSeismicFix,
    baseShareSeismicFix
  );

  return {
    title: result.title,
    scoreText: result.score,
    behaviorLabel: behavior.label,
    behaviorQuote: behavior.quote,
    punchlineLine1: personalizedLine,
    punchlineLine2: personalizedLine2,
    storyParagraphs,
    bonusRoasts,
    seismicTitle: '🚀 SEISMIC FIX',
    seismicFix: derivedFix.fix,
    shareSeismicFix: derivedFix.shareFix,
    funOutroLine1: funOutro.line1,
    funOutroLine2: funOutro.line2,
    footerCta: 'Try it -> seismic.systems'
  };
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function limitLines(ctx, text, maxWidth, maxLines) {
  const paragraphs = text.split('\n');
  const out = [];
  for (const p of paragraphs) {
    const lines = p.trim() ? wrapText(ctx, p.trim(), maxWidth) : [''];
    for (const line of lines) {
      if (out.length < maxLines) out.push(line);
    }
    if (out.length >= maxLines) break;
  }
  if (out.length === maxLines) {
    const last = out[maxLines - 1];
    let trimmed = last;
    while (trimmed.length && ctx.measureText(`${trimmed}...`).width > maxWidth) {
      trimmed = trimmed.slice(0, -1);
    }
    out[maxLines - 1] = `${trimmed}${trimmed === last ? '' : '...'}`;
  }
  return out;
}

function drawCenteredLines(ctx, text, centerX, startY, maxWidth, maxLines, lineHeight) {
  const lines = limitLines(ctx, text, maxWidth, maxLines);
  let y = startY;
  lines.forEach((line) => {
    const lineWidth = ctx.measureText(line).width;
    ctx.fillText(line, centerX - lineWidth / 2, y);
    y += lineHeight;
  });
  return y;
}

function roundedRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

async function drawScoreCard(result, presentation, withBrand = true, username = '') {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1320;
  const ctx = canvas.getContext('2d');

  const logo = new Image();
  logo.src = '/assets/seismic-icon.svg';
  await new Promise((resolve) => {
    logo.onload = resolve;
    logo.onerror = resolve;
  });

  const gradient = ctx.createRadialGradient(220, 180, 80, 620, 620, 1020);
  gradient.addColorStop(0, '#1a1a27');
  gradient.addColorStop(1, '#0b0b0f');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  roundedRect(ctx, 60, 56, 1080, 1208, 36);
  ctx.fillStyle = 'rgba(17, 17, 24, 0.92)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.24)';
  ctx.lineWidth = 2;
  ctx.stroke();

  if (logo.naturalWidth > 0 && logo.naturalHeight > 0) {
    const maxW = 420;
    const maxH = 620;
    const scale = Math.min(maxW / logo.naturalWidth, maxH / logo.naturalHeight);
    const w = logo.naturalWidth * scale;
    const h = logo.naturalHeight * scale;
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.drawImage(logo, canvas.width / 2 - w / 2, canvas.height / 2 - h / 2, w, h);
    ctx.restore();
  }

  const centerX = canvas.width / 2;
  const contentWidth = 900;
  const sectionX = 120;
  const sectionW = 960;
  let y = 130;

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 28px Inter, Space Grotesk, sans-serif';
  y = drawCenteredLines(ctx, '🔥 YOUR RESULT 🔥', centerX, y, contentWidth, 1, 34);
  y += 10;

  ctx.font = '800 56px Inter, Space Grotesk, sans-serif';
  y = drawCenteredLines(ctx, presentation.title, centerX, y, contentWidth, 2, 62);
  y += 10;

  ctx.font = '700 32px Inter, Space Grotesk, sans-serif';
  const scoreText = presentation.scoreText;
  const scoreWidth = ctx.measureText(scoreText).width + 42;
  const scoreX = centerX - scoreWidth / 2;
  roundedRect(ctx, scoreX, y - 34, scoreWidth, 54, 27);
  ctx.fillStyle = 'rgba(139, 92, 246, 0.25)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(167, 139, 250, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(scoreText, centerX - ctx.measureText(scoreText).width / 2, y);
  y += 38;

  // Summary section
  roundedRect(ctx, sectionX, y, sectionW, 96, 16);
  ctx.fillStyle = 'rgba(42, 23, 35, 0.35)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(167, 139, 250, 0.28)';
  ctx.stroke();
  ctx.fillStyle = '#F8E7EF';
  ctx.font = '700 27px Inter, Space Grotesk, sans-serif';
  drawCenteredLines(ctx, 'Congratulations?', centerX, y + 56, sectionW - 60, 1, 30);
  y += 116;

  // Story + bonus block
  roundedRect(ctx, sectionX, y, sectionW, 420, 16);
  ctx.fillStyle = 'rgba(42, 23, 35, 0.35)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(167, 139, 250, 0.28)';
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '500 26px Inter, Space Grotesk, sans-serif';
  const storyText = presentation.storyParagraphs.join('\n\n');
  const storyLines = limitLines(ctx, storyText, sectionW - 62, 8);
  let storyY = y + 42;
  storyLines.forEach((line) => {
    ctx.fillText(line, sectionX + 30, storyY);
    storyY += 31;
  });

  ctx.fillStyle = '#CFC0DC';
  ctx.font = '700 22px Inter, Space Grotesk, sans-serif';
  ctx.fillText('BONUS ROASTS', sectionX + 30, y + 330);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '500 24px Inter, Space Grotesk, sans-serif';
  const b1 = presentation.bonusRoasts[0] || '';
  const b2 = presentation.bonusRoasts[1] || '';
  const bullet1 = limitLines(ctx, `• ${b1}`, sectionW - 62, 1)[0] || '';
  const bullet2 = limitLines(ctx, `• ${b2}`, sectionW - 62, 1)[0] || '';
  ctx.fillText(bullet1, sectionX + 30, y + 366);
  ctx.fillText(bullet2, sectionX + 30, y + 398);
  y += 440;

  // Seismic fix block
  roundedRect(ctx, sectionX, y, sectionW, 188, 16);
  ctx.fillStyle = 'rgba(42, 23, 35, 0.35)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(167, 139, 250, 0.28)';
  ctx.stroke();
  ctx.fillStyle = '#CFC0DC';
  ctx.font = '700 22px Inter, Space Grotesk, sans-serif';
  ctx.fillText('🚀 SEISMIC FIX', sectionX + 30, y + 38);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '500 25px Inter, Space Grotesk, sans-serif';
  const fixLines = limitLines(ctx, presentation.seismicFix, sectionW - 62, 3);
  let fixY = y + 74;
  fixLines.forEach((line) => {
    ctx.fillText(line, sectionX + 30, fixY);
    fixY += 31;
  });
  ctx.fillStyle = '#F8E7EF';
  ctx.font = '500 24px Inter, Space Grotesk, sans-serif';
  ctx.fillText(presentation.funOutroLine1, sectionX + 30, y + 152);
  ctx.font = '700 24px Inter, Space Grotesk, sans-serif';
  ctx.fillText(presentation.funOutroLine2, sectionX + 30, y + 180);

  return canvas;
}

export default function App() {
  const [view, setView] = useState('landing');
  const [username, setUsername] = useState(localStorage.getItem(ACTIVE_USER_KEY) || '');
  const [landingInput, setLandingInput] = useState(localStorage.getItem(ACTIVE_USER_KEY) || '');
  const [landingError, setLandingError] = useState('');
  const [quizQuestions, setQuizQuestions] = useState(() => pickRandomQuestions(QUESTION_POOL, 5));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [persisted, setPersisted] = useState(false);
  const resultCardRef = useRef(null);

  const currentQuestion = quizQuestions[questionIndex];
  const progress = useMemo(() => {
    const total = quizQuestions.length || 5;
    return ((questionIndex + 1) / total) * 100;
  }, [questionIndex, quizQuestions.length]);
  const result = useMemo(() => (view === 'result' ? pickRoast(answers) : null), [view, answers]);
  const presentation = useMemo(
    () => (result ? buildResultPresentation(result, answers) : null),
    [result, answers]
  );

  useEffect(() => {
    if (!result || !username || persisted) return;
    setPersisted(true);
    persistResult(username, answers, result);
  }, [result, username, answers, persisted]);

  const submitLanding = async (e) => {
    e.preventDefault();
    const normalized = normalizeUsername(landingInput);
    if (!normalized) {
      setLandingError('Use 2-24 letters, numbers, or underscores.');
      return;
    }

    localStorage.setItem(ACTIVE_USER_KEY, normalized);
    setUsername(normalized);
    setLandingError('');
    setQuizQuestions(pickRandomQuestions(QUESTION_POOL, 5));
    setQuestionIndex(0);
    setAnswers({});
    setPersisted(false);
    setView('quiz');
    persistUsername(normalized);
  };

  const answerQuestion = (key, value) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (questionIndex < quizQuestions.length - 1) {
      setQuestionIndex((v) => v + 1);
      return;
    }
    setView('result');
  };

  const retry = () => {
    setQuizQuestions(pickRandomQuestions(QUESTION_POOL, 5));
    setQuestionIndex(0);
    setAnswers({});
    setPersisted(false);
    setView('quiz');
  };

  const shareOnX = () => {
    if (!result || !presentation) return;
    const text = encodeURIComponent(
      `🔥 I got roasted.\n\n${presentation.title}\n${presentation.scoreText}\n\n${presentation.punchlineLine1}`
    );
    const url = encodeURIComponent('https://seismic.systems');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const downloadRoastCard = async () => {
    if (!result || !presentation) return;
    try {
      if (resultCardRef.current) {
        const captureCanvas = await html2canvas(resultCardRef.current, {
          backgroundColor: '#111118',
          scale: Math.max(2, Math.min(3, (window.devicePixelRatio || 1) * 2)),
          useCORS: true,
          logging: false,
          removeContainer: true
        });
        const captureBlob = await new Promise((resolve) => captureCanvas.toBlob(resolve, 'image/png'));
        if (captureBlob) {
          const captureUrl = URL.createObjectURL(captureBlob);
          const a = document.createElement('a');
          a.href = captureUrl;
          a.download = 'roast-card.png';
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(captureUrl), 1500);
          return;
        }
      }

      const canvas = await drawScoreCard(result, presentation, true, username);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (blob) {
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = 'roast-card.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
        return;
      }

      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'roast-card.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Roast card download failed:', error);
    }
  };

  return (
    <main className="seismic-shell">
      <Card className={view === 'result' ? 'max-w-[800px]' : ''}>
        {view !== 'result' && (
          <header className="mb-4 md:mb-6">
            <img src="/assets/seismic-icon.svg" alt="Seismic" className="mb-3 h-10 w-auto" />
            <h1 className="text-4xl font-extrabold text-seismic-50 md:text-5xl">Your money habits might be public.</h1>
            <p className="mt-1 text-seismic-100/80">Let's find out.</p>
          </header>
        )}

        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.section key="landing" {...pageMotion} className="space-y-4">
              <h2 className="text-2xl font-bold text-seismic-50">Enter Username to Start</h2>
              <form onSubmit={submitLanding} className="flex flex-col gap-3 md:flex-row">
                <Input
                  value={landingInput}
                  onChange={(e) => setLandingInput(e.target.value)}
                  placeholder="@yourname"
                  maxLength={24}
                />
                <Button type="submit" variant="primary" className="md:w-auto">Enter Game</Button>
              </form>
              {landingError ? <p className="text-sm text-rose-200">{landingError}</p> : null}
            </motion.section>
          )}

          {view === 'quiz' && (
            <motion.section key="quiz" {...pageMotion} className="space-y-5">
              <div>
                <div className="mb-2 text-sm text-seismic-100/80">
                  Question {questionIndex + 1} of {quizQuestions.length}
                </div>
                <Progress value={progress} />
              </div>

              <h2 className="text-2xl font-bold text-seismic-50 md:text-3xl">{currentQuestion?.text}</h2>
              <div className="grid gap-3">
                {currentQuestion?.options.map((opt) => (
                  <Button
                    key={opt.value}
                    onClick={() => answerQuestion(currentQuestion.key, opt.value)}
                    className="w-full justify-start text-left text-base"
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </motion.section>
          )}

          {view === 'result' && result && presentation && (
            <motion.section key="result" {...pageMotion} className="space-y-4">
              <div
                ref={resultCardRef}
                className="relative mx-auto w-full max-w-[760px] overflow-hidden rounded-3xl border border-seismic-300/35 bg-[#111118]/95 p-4 md:p-5 shadow-card"
              >
                <img
                  src="/assets/seismic-icon.svg"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.08] select-none md:h-[420px]"
                />
                <div className="relative z-10 space-y-4">
                <div className="space-y-1 text-center">
                  <p className="text-sm font-bold tracking-[0.18em] text-seismic-200">🔥 YOUR RESULT 🔥</p>
                  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-seismic-50 md:text-4xl">
                    {presentation.title}
                  </h2>
                  <div className="inline-block rounded-full border border-seismic-300/45 bg-seismic-300/20 px-3 py-1 text-sm font-bold text-seismic-50">
                    {presentation.scoreText}
                  </div>
                </div>

                <div className="space-y-2 rounded-xl border border-seismic-300/35 bg-seismic-100/10 p-4 text-center text-seismic-50/95">
                  <p className="font-semibold text-seismic-50">Congratulations?</p>
                </div>

                <div className="border-t border-seismic-300/35" />

                <div className="space-y-2 rounded-xl border border-seismic-300/35 bg-seismic-100/10 p-4 text-seismic-50/95">
                  {presentation.storyParagraphs.map((paragraph, idx) => (
                    <p key={`${idx}-${paragraph.slice(0, 24)}`} className="break-words leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  <div className="text-xs font-bold tracking-[0.16em] text-seismic-200">BONUS ROASTS</div>
                  <ul className="mt-2 list-disc space-y-2 pl-5 leading-relaxed">
                    {presentation.bonusRoasts.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-seismic-300/35" />

                <div className="space-y-2 rounded-xl border border-seismic-300/35 bg-seismic-100/10 p-4 text-seismic-50/95">
                  <div className="text-xs font-bold tracking-[0.16em] text-seismic-200">{presentation.seismicTitle}</div>
                  <p className="break-words leading-relaxed">{presentation.seismicFix}</p>
                  <p className="leading-relaxed">{presentation.funOutroLine1}</p>
                  <p className="font-semibold text-seismic-100/90">{presentation.funOutroLine2}</p>
                </div>
              </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button onClick={shareOnX} variant="primary">Share on X</Button>
                <Button onClick={downloadRoastCard}>Download Roast Card</Button>
                <Button onClick={retry}>Play Again</Button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </Card>
    </main>
  );
}

