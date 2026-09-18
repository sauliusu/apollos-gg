import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-xl text-center">
        <p className="font-display text-7xl font-bold text-green/30">404</p>
        <h1 className="mt-2 font-display text-3xl font-bold">Airball.</h1>
        <p className="mt-3 text-fg-2">That page does not exist. The script does, though.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Home</Button>
          <Button href="/swish" variant="secondary">
            See Swish
          </Button>
        </div>
      </Container>
    </Section>
  )
}
