import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { Mail, MapPin, Phone } from 'lucide-react'
import Container from '@/components/common/Container'
import { site } from '@/data/site'

const socialIcons = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  X: FaXTwitter,
  YouTube: FaYoutube,
}

const headingClass = 'mb-5 font-display text-xl font-normal uppercase tracking-[0.12em] !text-white'
const linkClass = 'text-white/70 transition-colors hover:text-white'

export default function Footer() {
  const { contact } = site
  return (
    <footer className="bg-ink text-white">
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="mb-5 inline-flex rounded-2xl bg-white p-2.5">
            <img src={site.logo} alt={site.fullName} width="600" height="359" className="h-14 w-auto" />
          </span>
          <p className="max-w-xs text-white/70">{site.brandText}</p>
          <ul className="mt-6 flex gap-3">
            {site.socials.map(({ name, href }) => {
              const Icon = socialIcons[name]
              return (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-primary"
                  >
                    <Icon size={16} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <nav aria-label="Quick links">
          <h2 className={headingClass}>Quick Links</h2>
          <ul className="space-y-2.5">
            {site.quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Shop categories">
          <h2 className={headingClass}>Shop Categories</h2>
          <ul className="space-y-2.5">
            {site.shopCategories.map((c) => (
              <li key={c}>
                <Link to={`/shop?category=${encodeURIComponent(c)}`} className={linkClass}>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>Contact</h2>
          <ul className="space-y-3.5 text-white/70">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" /> {contact.address}
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-white">
                {contact.phone}
              </a>
            </li>
            {contact.email && (
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${contact.email}`} className="break-all hover:text-white">
                  {contact.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink-line">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-center text-sm text-white/60 md:flex-row md:text-left">
          <p>
            {site.copyright}{' '}
            <a
              href={site.developer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              {site.developer.name}
            </a>
          </p>
          <p className="font-display text-lg uppercase tracking-[0.15em] text-white/80">{site.tagline}</p>
        </Container>
      </div>
    </footer>
  )
}
