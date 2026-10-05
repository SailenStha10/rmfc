import BaseForm from './BaseForm'
import { contactForm } from '@/data/forms'

export default function ContactForm() {
  return (
    <BaseForm
      name="contact"
      fields={contactForm.fields}
      submitLabel={contactForm.submit}
      successText={contactForm.success}
      honeypot
    />
  )
}
