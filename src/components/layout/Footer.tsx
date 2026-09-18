import Link from 'next/link'
import { site } from '@/config/site'
import { Logo } from '@/components/Logo'
import { Container } from '@/components/ui/Container'

type FooterLink = { label: string; href: string; external?: boolean }

function Column({ title, links }: { title: string; links: readonly FooterLink[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-3">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-fg-2 hover:text-fg">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-sm text-fg-2 hover:text-fg">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-3">
              {site.tagline}. One script, one game, updated every patch.
            </p>
          </div>
          <Column title="Product" links={site.footer.product} />
          <Column
            title="Support"
            links={[
              ...site.footer.support,
              ...(site.discordInvite ? [{ label: 'Discord', href: site.discordInvite, external: true }] : []),
            ]}
          />
          <Column title="Legal" links={site.footer.legal} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-lg">
            Not affiliated with 2K, Take-Two Interactive, Sony, Microsoft or Cronus. Cronus Zen is a trademark of Collective
            Minds.
          </p>
        </div>
      </Container>
    </footer>
  )
}
