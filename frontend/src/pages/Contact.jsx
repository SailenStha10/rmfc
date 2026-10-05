import { Mail, MapPin, Phone } from 'lucide-react'
import PageBanner from '@/components/common/PageBanner'
import Container from '@/components/common/Container'
import ContactForm from '@/components/forms/ContactForm'
import { contactForm } from '@/data/forms'
import { site } from '@/data/site'
import Seo from '@/components/common/Seo'

export default function Contact() {
  const { contact } = site
  const details = [
    { icon: MapPin, label: 'Address', value: contact.address },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  ]

  return (
    <>
      <Seo title="Contact Us" description="Get in touch with Real Madrid Fan Club Nepal. Address, phone, email and contact form." path="/contact" />
      <PageBanner title="Contact Us" />
      <section className="bg-white py-12 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-3xl">{contactForm.heading}</h2>
            <p className="mb-8 mt-3 text-muted-foreground">{contactForm.text}</p>
            <ul className="space-y-5">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="break-all text-muted-foreground hover:text-primary">{value}</a>
                    ) : (
                      <p className="text-muted-foreground">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div
              role="img"
              aria-label="Map placeholder for Kathmandu, Nepal"
              className="mt-8 flex h-52 items-center justify-center rounded-2xl border border-dashed border-border bg-secondary text-sm text-muted-foreground"
            >
              Map embed placeholder · Kathmandu, Nepal
            </div>
          </div>
          <div className="relative rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8 lg:col-span-3">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  )
}
