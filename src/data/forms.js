export const membershipNotice = {
  heading: 'RMFCN MEMBERSHIP 26/27 IS NOW CLOSED!',
  paragraphs: [
    'A huge thank you to all our renewing and new members for being part of the RMFCN family this season!',
    'Hala Madrid!',
  ],
  reopening: 'Membership will reopen during the next season break in July 2027.',
  // The live Join Club page has no form yet ("Forms will be available soon"),
  // so these fields are our own for Sprint 7.
  fields: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: true },
    { name: 'address', label: 'Address', type: 'text', required: true },
    { name: 'wing', label: 'Preferred Wing', type: 'select', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: false },
  ],
}

export const contactForm = {
  heading: 'Get In Touch',
  text: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  fields: [
    { name: 'name', label: 'Your Name', type: 'text', required: true },
    { name: 'email', label: 'Your Email', type: 'email', required: true },
    { name: 'subject', label: 'Subject', type: 'text', required: true },
    { name: 'message', label: 'Your Message', type: 'textarea', required: true },
  ],
}
