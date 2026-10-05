import Reveal from '@/components/common/Reveal'

export default function GalleryGrid({ images, onOpen }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {images.map((img, i) => (
        <Reveal as="li" key={img.id} delay={(i % 4) * 0.06} y={16}>
          <button
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`Open photo: ${img.alt}`}
            className="group relative block aspect-square w-full overflow-hidden rounded-xl bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-3 text-left text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              {img.caption}
            </span>
          </button>
        </Reveal>
      ))}
    </ul>
  )
}
