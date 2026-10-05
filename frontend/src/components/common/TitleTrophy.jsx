import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'

// Small Champions League trophy that sits beside a title. As the title scrolls up the screen the trophy
// slides in from the side, turns upright and fades in; reduced-motion users just get it in place.
export default function TitleTrophy({ className = 'h-10 md:h-14' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 98%', 'start 62%'] })
  const x = useTransform(scrollYProgress, [0, 1], [-90, 0])
  const rotate = useTransform(scrollYProgress, [0, 1], [-28, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.8, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1])

  return (
    <m.span
      ref={ref}
      aria-hidden="true"
      className="inline-flex shrink-0"
      style={reduce ? undefined : { x, rotate, opacity, scale }}
    >
      <img
        src="/images/brand/trophy-sm.webp"
        alt=""
        width="124"
        height="200"
        loading="lazy"
        className={`${className} w-auto select-none drop-shadow-md`}
      />
    </m.span>
  )
}
