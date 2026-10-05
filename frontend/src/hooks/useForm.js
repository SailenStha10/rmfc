import { useState } from 'react'
import { validateAll, validateField } from '@/utils/validate'

// Client-side only: validates, then hands values to onValid. status: idle | error | success
export function useForm(fields, onValid) {
  const initial = Object.fromEntries(fields.map((f) => [f.name, '']))
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const setField = (name, value) => {
    const next = { ...values, [name]: value }
    setValues(next)
    if (errors[name] !== undefined) {
      const field = fields.find((f) => f.name === name)
      setErrors((e) => ({ ...e, [name]: validateField(field, value, next) }))
    }
  }

  const onBlur = (name) => {
    const field = fields.find((f) => f.name === name)
    setErrors((e) => ({ ...e, [name]: validateField(field, values[name], values) }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validateAll(fields, values)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('error')
      return
    }
    onValid(values)
    setValues(initial)
    setErrors({})
    setStatus('success')
  }

  const reset = () => setStatus('idle')

  return { values, errors, status, setField, onBlur, onSubmit, reset }
}
