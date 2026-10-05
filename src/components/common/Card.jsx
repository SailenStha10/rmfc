export default function Card({ as: Tag = 'div', className = '', children }) {
  return (
    <Tag className={`overflow-hidden rounded-xl border border-border bg-card shadow-sm ${className}`}>
      {children}
    </Tag>
  )
}
