import { Helmet } from 'react-helmet-async'
import { site } from '@/data/site'

// Per-page <title>, description and Open Graph tags. `path` is the route, e.g. "/about".
export default function Seo({ title, description, path = '/', image = site.ogImage, noindex = false }) {
  const fullTitle = title ? `${title} | ${site.fullName}` : `${site.fullName} – Nepal's Official Madridista Community`
  const desc = description ?? site.description
  const url = `${site.url}${path}`
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.fullName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${site.url}${image}`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}
