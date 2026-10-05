import Reveal from '@/components/common/Reveal'

// Scrapbook collage: every photo has its own tilt, height and offset, and neighbours overlap slightly.
// The pattern repeats every 8 photos; hovering or focusing a photo brings it to the front, straightened.
const PATTERN = [
  { shape: 'aspect-[4/5]', tilt: '-rotate-2', shift: 'translate-y-0', z: 'z-10' },
  { shape: 'aspect-square', tilt: 'rotate-2', shift: 'translate-y-6', z: 'z-20' },
  { shape: 'aspect-[5/4]', tilt: '-rotate-1', shift: '-translate-y-1', z: 'z-10' },
  { shape: 'aspect-[4/5]', tilt: 'rotate-3', shift: 'translate-y-8', z: 'z-20' },
  { shape: 'aspect-square', tilt: 'rotate-1', shift: 'translate-y-2', z: 'z-20' },
  { shape: 'aspect-[4/5]', tilt: '-rotate-3', shift: 'translate-y-0', z: 'z-10' },
  { shape: 'aspect-[5/4]', tilt: 'rotate-2', shift: 'translate-y-6', z: 'z-20' },
  { shape: 'aspect-square', tilt: '-rotate-2', shift: 'translate-y-1', z: 'z-10' },
]

// eagerCount: how many leading images are above the fold and should load immediately
// columns: 'four' (default) or 'three' at md and up
export default function GalleryGrid({ images, onOpen, eagerCount = 4, columns = 'four' }) {
  const cols = columns === 'three' ? 'md:grid-cols-3' : 'md:grid-cols-4'
  return (
    <div className="overflow-x-clip px-3 pb-12 pt-4 md:px-8">
      <ul className={`grid grid-cols-2 gap-x-0 gap-y-0 ${cols}`}>
        {images.map((img, i) => {
          const p = PATTERN[i % PATTERN.length]
          return (
            <Reveal
              as="li"
              key={img.id}
              delay={(i % 4) * 0.06}
              y={16}
              className={`relative -mb-4 px-0 md:-mb-8 md:px-0 ${p.z} hover:z-30 focus-within:z-30 [&:nth-child(odd)]:-mr-2 [&:nth-child(even)]:-ml-2 md:[&:nth-child(n)]:mx-[-0.6rem]`}
            >
              <button
                type="button"
                onClick={() => onOpen(i)}
                aria-label={`Open photo: ${img.alt}`}
                className={`group relative block w-full overflow-hidden rounded-xl border-[6px] border-white bg-secondary shadow-xl transition-transform duration-300 hover:z-30 hover:scale-105 hover:rotate-0 focus-visible:scale-105 focus-visible:rotate-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${p.shape} ${p.tilt} ${p.shift}`}
              >
                <img
                  src={img.thumb}
                  alt={img.alt}
                  width="640"
                  height="640"
                  loading={i < eagerCount ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-transparent p-3 text-left text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {img.caption}
                </span>
              </button>
            </Reveal>
          )
        })}
      </ul>
    </div>
  )
}
