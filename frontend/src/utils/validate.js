const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^\+?[0-9\s-]{7,15}$/

// field: { name, label, type, required, minLength, matches }
export function validateField(field, value, values = {}) {
  const v = (value ?? '').trim()
  if (!v) return field.required ? `${field.label} is required` : ''
  if (field.type === 'email' && !EMAIL.test(v)) return 'Enter a valid email address'
  if (field.type === 'tel' && !PHONE.test(v)) return 'Enter a valid phone number'
  if (field.minLength && v.length < field.minLength) {
    return `${field.label} must be at least ${field.minLength} characters`
  }
  if (field.matches && v !== values[field.matches]) return 'Passwords do not match'
  return ''
}

export function validateAll(fields, values) {
  const errors = {}
  fields.forEach((f) => {
    const msg = validateField(f, values[f.name], values)
    if (msg) errors[f.name] = msg
  })
  return errors
}
