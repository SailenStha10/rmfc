import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import Badge from '@/components/common/Badge'
import { search } from '@/utils/search'

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const results = search(query)

  useEffect(() => {
    if (!open) return undefined
    inputRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-50 bg-black/60 px-4 pt-20 md:pt-28"
      onClick={onClose}
    >
      <div
        className="mx-auto max-w-2xl rounded-2xl bg-white p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-4">
          <Search size={18} className="text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, wings, matches, articles..."
            aria-label="Search the site"
            className="w-full bg-transparent py-3 text-sm focus:outline-none"
          />
          <button type="button" aria-label="Close search" onClick={onClose} className="p-1 hover:text-primary">
            <X size={18} />
          </button>
        </div>

        <div className="mt-3 max-h-[55vh] overflow-y-auto" aria-live="polite">
          {query.trim() === '' ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">Start typing to search.</p>
          ) : results.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
              No results for “{query.trim()}”.
            </p>
          ) : (
            <ul>
              {results.map((r) => (
                <li key={`${r.type}-${r.to}-${r.title}`}>
                  <Link
                    to={r.to}
                    onClick={onClose}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-3 hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <span className="font-heading text-sm font-semibold text-foreground">{r.title}</span>
                    <Badge tone="muted">{r.type}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
