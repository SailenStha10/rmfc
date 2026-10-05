export const membershipNotice = {
  heading: 'RMFCN MEMBERSHIP 26/27 IS NOW CLOSED!',
  paragraphs: [
    'A huge thank you to all our renewing and new members for being part of the RMFCN family this season!',
    'Hala Madrid!',
  ],
  reopening: 'Membership will reopen during the next season break in July 2027.',
}

// The live Join Club page has no form yet ("Forms will be available soon"),
// so these fields are our own. Options for `wing` come from wings.js.
export const joinClubForm = {
  heading: 'Join the Club',
  text: 'Fill in the form below and we will get in touch when membership opens.',
  submit: 'Submit Application',
  success: 'Thank you! Your application has been received. We will contact you soon. Hala Madrid!',
  fields: [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true, autoComplete: 'name' },
    { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel', required: true, autoComplete: 'tel' },
    { name: 'address', label: 'Address', type: 'text', required: true, autoComplete: 'street-address' },
    { name: 'wing', label: 'Preferred Wing', type: 'select', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: false },
  ],
}

export const contactForm = {
  heading: 'Get In Touch',
  text: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  submit: 'Send Message',
  success: "Thanks for reaching out! Your message has been sent and we'll reply as soon as possible.",
  fields: [
    { name: 'name', label: 'Your Name', type: 'text', required: true, autoComplete: 'name' },
    { name: 'email', label: 'Your Email', type: 'email', required: true, autoComplete: 'email' },
    { name: 'subject', label: 'Subject', type: 'text', required: true },
    { name: 'message', label: 'Your Message', type: 'textarea', required: true, minLength: 10 },
  ],
}

export const loginForm = {
  heading: 'Welcome Back',
  text: 'Log in to your Madridista account.',
  submit: 'Login',
  success: 'Login is not available yet. Your details were not sent anywhere.',
  fields: [
    { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
    { name: 'password', label: 'Password', type: 'password', required: true, autoComplete: 'current-password' },
  ],
}

export const registerForm = {
  heading: 'Create an Account',
  text: 'Register to become part of the Madridista community.',
  submit: 'Register',
  success: 'Registration is not available yet. Your details were not sent anywhere.',
  fields: [
    { name: 'name', label: 'Full Name', type: 'text', required: true, autoComplete: 'name' },
    { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
    { name: 'password', label: 'Password', type: 'password', required: true, minLength: 8, autoComplete: 'new-password' },
    { name: 'confirm', label: 'Confirm Password', type: 'password', required: true, matches: 'password', autoComplete: 'new-password' },
  ],
}
