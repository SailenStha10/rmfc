// Wide, evenly padded page frame: content (and the header) sit close to the viewport edges
// instead of floating in a narrow centred column.
export default function Container({ as: Tag = 'div', className = '', children }) {
  return <Tag className={`mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 ${className}`}>{children}</Tag>
}
