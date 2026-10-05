// Single-select category chips (All + categories).
export default function FilterChips({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={`rounded-full px-4 py-2 font-heading text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
            value === o ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-border'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
