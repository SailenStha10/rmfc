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

const headingClass = 'mb-4 font-heading text-base font-bold !text-white'
const linkClass = 'text-white/70 transition-colors hover:text-white'

export default function Footer() {
  const { contact } = site
  return (
    <footer className="bg-accent text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={site.logo} alt={site.fullName} width="600" height="359" className="mb-4 h-16 w-auto" />
          <p className="text-sm text-white/70">{site.brandText}</p>
          <ul className="mt-5 flex gap-3">
            {site.socials.map(({ name, href }) => {
              const Icon = socialIcons[name]
              return (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
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
          <ul className="space-y-2 text-sm">
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
          <ul className="space-y-2 text-sm">
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
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" /> {contact.address}
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0" />
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-white">
                {contact.phone}
              </a>
            </li>
            {contact.email && (
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-white/60 md:flex-row md:text-left">
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
          <p className="font-heading font-semibold text-white/80">{site.tagline}</p>
        </Container>
      </div>
    </footer>
  )
}
