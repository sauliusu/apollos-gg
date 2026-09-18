/**
 * The catalogue. This brand ships one script, so there is one entry; add more objects to
 * PRODUCTS and the product page picks them up by slug.
 */
export type Feature = {
  group: 'Shooting' | 'Playmaking' | 'Defense'
  title: string
  description: string
  video: string
}

export type IncludedColumn = { title: string; blurb: string; items: string[] }

export type Product = {
  slug: string
  /** Vanity route, e.g. /swish */
  path: string
  name: string
  game: string
  shortGame: string
  status: 'available' | 'updating' | 'coming-soon'
  price: number
  originalPrice: number
  /** Whop plan id (plan_...). Empty string shows the "checkout being set up" state. */
  whopPlanId: string
  headline: string
  subheadline: string
  description: string
  checklist: string[]
  heroVideo: string
  features: Feature[]
  included: IncludedColumn[]
  /** Short list shown in the checkout summary. */
  highlights: string[]
}

export const SWISH: Product = {
  slug: 'swish-nba-2k27',
  path: '/swish',
  name: 'Swish',
  game: 'NBA 2K27',
  shortGame: '2K27',
  status: 'available',
  price: 55,
  originalPrice: 75,
  // Create the product and plan in THIS brand's own Whop company and paste the plan id here.
  // While empty, buy buttons open a "checkout is being set up" panel instead of a checkout.
  whopPlanId: '',
  headline: 'Green every shot.',
  subheadline:
    'Swish is a Cronus Zen script built only for NBA 2K27. Auto green from the stick, from the button and out of dribble moves, a timed dunk meter, dribble combos on the D-pad, and defense that stays in front. Set up in two minutes, updated every patch.',
  description:
    'The most complete NBA 2K27 Cronus Zen script: RS auto green, no-dip release, button tempo, timed dunk meter, infinite stamina, quickstop, D-pad dribble macros and defense AI. Works on PS5, Xbox and PC in every 2K27 mode.',
  checklist: [
    'Auto green from the right stick, the button and out of dribbles',
    'Timed dunk meter macro and no-dip release',
    'D-pad dribble combos, quickstop and infinite stamina',
    'Defense contest boost and hair triggers',
    'PS5, Xbox Series X|S and PC. Park, Rec, MyCareer, ProAm',
  ],
  heroVideo: '/videos/nba-main.mp4',
  features: [
    { group: 'Shooting', title: 'RS Auto-Green', description: 'Reads your right-stick timing and jumpshot animation so you green possession after possession.', video: '/videos/nba-rs-auto-green.mp4' },
    { group: 'Shooting', title: 'No-Dip Auto-Green', description: 'Auto green with a no-dip release, so the shot goes up instantly without the wind-up animation.', video: '/videos/nba-no-dip-autogreen.mp4' },
    { group: 'Shooting', title: 'Auto-Green From Dribble', description: 'Green window detection that works straight out of dribble moves and momentum combos.', video: '/videos/nba-autogreen-from-dribble.mp4' },
    { group: 'Shooting', title: 'Button Tempo', description: 'Turns every normal button shot into a tempo shot for a bigger green window on each release.', video: '/videos/nba-button-tempo.mp4' },
    { group: 'Shooting', title: 'No-Dip Shot', description: 'Skips the dip animation on L2 + Square so your release is faster and harder to contest.', video: '/videos/nba-no-dip-shot.mp4' },
    { group: 'Shooting', title: 'Easy Dunk', description: 'Timed dunk meter macro that turns contested dunks into easy two points.', video: '/videos/nba-easy-dunk.mp4' },
    { group: 'Shooting', title: 'Release Vibration', description: 'A controller rumble timed to your exact release window, so you feel the green without watching the meter.', video: '/videos/nba-shot-vibration.mp4' },
    { group: 'Playmaking', title: 'Infinite Stamina', description: 'Removes stamina drain entirely. Sprint the whole game without gassing out.', video: '/videos/nba-infinite-stamina.mp4' },
    { group: 'Playmaking', title: 'Quickstop', description: 'Go from a full sprint to a dead stop and a shot in one motion.', video: '/videos/nba-quick-stop.mp4' },
    { group: 'Playmaking', title: 'Dribble Macros', description: 'Momentum crossovers, step-backs and size-up packages pre-programmed on the D-pad.', video: '/videos/nba-dribble-macro.mp4' },
    { group: 'Defense', title: 'Defense AI', description: 'Automatic contest boost and lockdown movement so you stay in front of your man.', video: '/videos/nba-defense-ai.mp4' },
    { group: 'Defense', title: 'Hair Triggers', description: 'Zero-deadzone trigger activation for faster shot and pass release.', video: '/videos/nba-hair-trigger.mp4' },
  ],
  included: [
    {
      title: 'Shooting & finishing',
      blurb: 'Every way to put the ball in the basket.',
      items: [
        'Auto Green Rhythm Shooting (R3 / L3)',
        'Adjustable green timing (100 to 1000 ms)',
        'Turbo & fade auto green (R2 hold)',
        'Auto green no-dip release',
        'Auto green free throws',
        'Button Tempo (Square to Pro Stick shot)',
        'RS auto tempo and tempo ms',
        'Timed dunk meter macro',
        'Pump fake step-through macro',
        'Turbo shots (hop jumper, turbo fade)',
        'No-dip shot (L2 + Square)',
      ],
    },
    {
      title: 'Playmaking & defense',
      blurb: 'Movement, handles and lockdown.',
      items: [
        'Infinite stamina (instant or gradual)',
        'Quickstop flick shots (R2 / L2 + Square)',
        'D-pad dribble macros (auto mode)',
        'Custom combo picker (BTB spam, Curry, D Book, B Break, Escape, Momentum)',
        'Defense contest boost (L2 + R2)',
        'Spot take macro (hold Cross)',
        'Digital hair triggers',
        'Shot release vibration cue',
      ],
    },
    {
      title: 'Setup & support',
      blurb: 'On-device. No PC needed after the first load.',
      items: [
        '3 save profiles, switch mid-game (L2 + Share)',
        'On-screen OLED menu',
        'Zen LED and vibration control (7 colours + rainbow)',
        'Device overclock mode',
        'Settings saved on the Zen itself',
        '24/7 support',
        'Lifetime feature updates',
      ],
    },
  ],
  highlights: ['Auto green (RS, button, from dribble)', 'Timed dunk meter', 'Dribble combos and quickstop', 'Defense AI', 'Setup guide + 24/7 support', 'Lifetime updates'],
}

export const PRODUCTS: Product[] = [SWISH]

export function productBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}

/* ---------- Site-wide copy ---------- */

export const STEPS = [
  { n: '01', title: 'Buy on Whop', text: 'Checkout takes a minute. Card, Apple Pay, Google Pay or crypto. Your download is on the Whop purchases page straight away.' },
  { n: '02', title: 'Load it on your Zen', text: 'Plug the Zen into your PC, open Zen Studio, drag the .gpc into a slot and hit write. Two minutes, and you never need the PC again.' },
  { n: '03', title: 'Tune it on the OLED', text: 'Pick your green timing, release speed and shot cue from the Zen screen. Three save profiles switch mid-game with L2 + Share.' },
]

export type Review = { name: string; platform: string; text: string; avatar?: string; video?: string }

/**
 * PLACEHOLDERS. Replace with real reviews from this brand's own customers before launch, and
 * never reuse reviews, avatars or clips from another store. Add `avatar` and `video` paths
 * under /public when you have them.
 */
export const REVIEWS: Review[] = [
  { name: 'Reece', platform: 'PS5', text: 'Set up in about five minutes and I was auto greening in Rec the same night. Timing took two tweaks on the OLED and then it just stuck.' },
  { name: 'Marcus T.', platform: 'Xbox Series X', text: 'Button tempo is the feature I did not know I needed. My green window feels twice as big and I stopped bricking open threes.' },
  { name: 'Dev', platform: 'PS5', text: 'The dunk meter macro is genuinely free points. Loaded it before a Rec session and my contact dunks went in every time.' },
  { name: 'Kaine', platform: 'PC', text: 'Switching profiles mid-game is so clean. One for my slasher, one for my shooter, no menu digging.' },
  { name: 'Jordan R.', platform: 'PS5', text: 'Bought it for the auto green, stayed for the dribble combos. D-pad momentum moves feel like I actually learnt them.' },
  { name: 'Tay', platform: 'Xbox Series S', text: 'Update dropped the same night as the 2K patch. That is the whole reason I went with a 2K-only shop.' },
]

export const FAQ = [
  { id: 'ban', q: 'Will using a Cronus Zen get me banned in NBA 2K27?', a: 'The Zen works at the hardware level and shows up to the console as a normal controller. There is nothing installed on the console or in the game. Use the recommended timing settings in the guide and play like you normally would.' },
  { id: 'platforms', q: 'Does Swish work on PS5, Xbox and PC?', a: 'Yes. Swish runs on the Zen, so it works with PS5, PS4, Xbox Series X|S, Xbox One and PC, with any wired or wireless controller the Zen supports.' },
  { id: 'jumpshot', q: 'Do I need a specific jumpshot?', a: 'No. Green timing is adjustable from 100 to 1000 ms on the OLED, and the guide lists starting values for the popular 2K27 releases. Dial it in once and save it to a profile.' },
  { id: 'setup', q: 'How long does setup take?', a: 'About two minutes. Buy, download the .gpc from your Whop purchases page, drag it into Zen Studio, write it to a slot. The guide walks through it with screenshots, and support is there if anything is unclear.' },
  { id: 'updates', q: 'What happens when 2K patches?', a: 'Swish is updated for every 2K27 patch and every season. Updates are free for life and land on the same Whop page you downloaded from.' },
  { id: 'refund', q: 'Can I get a refund?', a: 'Scripts are digital and delivered instantly, so refunds are only considered if a problem is on our side and support could not fix it. See the refund policy for the full terms.' },
]
