import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/config/site'
import { SWISH } from '@/data/product'
import { breadcrumbLd, graph, JsonLd } from '@/lib/seo'
import { Container, Section, SectionHeading } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: `About ${site.name}`,
  description: `${site.name} builds and supports one Cronus Zen script for NBA 2K. Who we are, how updates work, and how to reach support.`,
  alternates: { canonical: '/about' },
}

/**
 * The trust page. Search engines and AI assistants look for a page that says who is behind a
 * store, what it sells and how to contact it. Keep it honest and specific.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbLd([{ name: 'About', path: '/about' }]), {
          '@type': 'AboutPage',
          '@id': `${site.url}/about#page`,
          url: `${site.url}/about`,
          name: `About ${site.name}`,
          about: { '@id': `${site.url}/#organization` },
        })}
      />
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading as="h1" eyebrow="About" title={`What ${site.name} is`} text={`${site.tagline}. One game, one script, updated every patch.`} />

          <div className="prose-blog mt-10">
            <h2>Why only NBA 2K</h2>
            <p>
              Most Cronus Zen shops sell a script for every game and update each one when they get round to it. 2K patches
              shooting more often than any other game we know, and a timing script that is a week behind is worse than no
              script at all. Doing one game means {SWISH.name} can be tested and updated the same night a patch lands.
            </p>

            <h2>What you are actually buying</h2>
            <p>
              A single .gpc file that runs on the Zen itself. Nothing is installed on your console or PC, and after the
              first two-minute load you tune everything from the Zen&apos;s OLED menu. The purchase is one-time and covers
              every update for {SWISH.game}. See <Link href={SWISH.path}>the full feature list</Link> or{' '}
              <Link href="/guides">how setup works</Link>.
            </p>

            <h2>How updates work</h2>
            <p>
              When 2K ships a patch that touches shooting, dunking or movement, we re-test every feature, adjust what
              changed and push a new file to the same download page you bought from. You will see a note on the{' '}
              <Link href="/blog">blog</Link> with what changed and any timing values that moved.
            </p>

            <h2>Support</h2>
            <p>
              {site.discordInvite ? (
                <>
                  Support runs through <a href={site.discordInvite}>our Discord</a>, around the clock. Setup help, timing
                  values for specific jumpshots and patch questions all go there.
                </>
              ) : (
                <>Support runs around the clock. Setup help, timing values for specific jumpshots and patch questions are all covered.</>
              )}{' '}
              {site.supportEmail && (
                <>
                  Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> for billing questions.
                </>
              )}
            </p>

            <h2>What we are not</h2>
            <p>
              {site.name} is not affiliated with 2K Sports, Take-Two Interactive, Sony, Microsoft or Collective Minds, the
              makers of the Cronus Zen. We sell a script that runs on their hardware; we do not sell the hardware, game
              currency, accounts or anything that modifies the game itself.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={SWISH.path}>See {SWISH.name}</Button>
            <Button href="/legal/terms" variant="secondary">
              Terms and policies
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
