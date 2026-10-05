const control =
  'w-full rounded-lg border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary'

export default function FormField({ field, id, value, error, onChange, onBlur, options = [] }) {
  const errId = `${id}-error`
  const common = {
    id,
    name: field.name,
    value,
    required: field.required,
    onChange: (e) => onChange(field.name, e.target.value),
    onBlur: () => onBlur(field.name),
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errId : undefined,
    className: `${control} ${error ? 'border-destructive' : 'border-border'}`,
  }

  let input
  if (field.type === 'textarea') input = <textarea rows={5} {...common} />
  else if (field.type === 'select') {
    input = (
      <select {...common}>
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    )
  } else input = <input type={field.type} autoComplete={field.autoComplete} {...common} />

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-foreground">
        {field.label}
        {field.required && <span className="text-destructive" aria-hidden="true"> *</span>}
      </label>
      {input}
      {error && (
        <p id={errId} role="alert" className="mt-1 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
