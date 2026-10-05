import { useCallback, useEffect, useState } from 'react'
import { getMatches } from '@/services/matchService'

// Session cache: the first successful response is shared by every component and page visit.
let cached = null
let pending = null

function load(force) {
  if (cached && !force) return Promise.resolve(cached)
  pending ??= getMatches()
    .then((data) => {
      cached = data
      return data
    })
    .finally(() => {
      pending = null
    })
  return pending
}

export function useMatches() {
  const [state, setState] = useState({ data: cached, loading: !cached, error: null })

  const run = useCallback((force = false) => {
    setState((s) => ({ ...s, loading: true, error: null }))
    return load(force).then(
      (data) => setState({ data, loading: false, error: null }),
      (error) => setState((s) => ({ data: s.data, loading: false, error })),
    )
  }, [])

  // Initial state already says "loading" when nothing is cached, so no state is set before the fetch resolves.
  useEffect(() => {
    if (cached) return
    load().then(
      (data) => setState({ data, loading: false, error: null }),
      (error) => setState({ data: null, loading: false, error }),
    )
  }, [])

  return { ...state, refetch: () => run(true) }
}
