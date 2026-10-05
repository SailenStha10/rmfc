import { useState } from 'react'

// Fixed-size club crest (no layout shift). Renders an empty spacer when there is no logo
// (static data) or the image fails to load.
export default function TeamLogo({ team, size = 24 }) {
  const [failed, setFailed] = useState(false)
  if (!team.logo || failed) return size >= 40 ? <span aria-hidden="true" style={{ width: size, height: size }} /> : null
  return (
    <img
      src={team.logo}
      alt={`${team.name} logo`}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  )
}
