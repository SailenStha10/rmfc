import { useId } from 'react'
import Button from '@/components/common/Button'
import { useForm } from '@/hooks/useForm'
import FormField from './FormField'
import FormStatus from './FormStatus'

const HONEYPOT = { name: 'website', label: 'Company', type: 'text' }

// Shared renderer for all forms. No network calls: valid submits are only logged (S7-5).
export default function BaseForm({
  name,
  fields,
  submitLabel,
  successText,
  options = {},
  honeypot = false,
  children,
}) {
  const uid = useId()
  const state = useForm(honeypot ? [...fields, HONEYPOT] : fields, (values) => {
    if (values.website) return // honeypot filled => bot; show success but do nothing
    console.log(`[${name}] submitted`, values)
  })

  return (
    <form onSubmit={state.onSubmit} noValidate className="space-y-5">
      <FormStatus status={state.status} successText={successText} />
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          id={`${uid}-${field.name}`}
          value={state.values[field.name]}
          error={state.errors[field.name]}
          onChange={state.setField}
          onBlur={state.onBlur}
          options={options[field.name]}
        />
      ))}
      {honeypot && (
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>
            Company (leave empty)
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={state.values.website}
              onChange={(e) => state.setField('website', e.target.value)}
            />
          </label>
        </div>
      )}
      {children}
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}
