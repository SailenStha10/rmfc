import { motion, useReducedMotion } from 'framer-motion'

// Fade-and-rise on scroll into view; no motion for users who prefer reduced motion.
export default function Reveal({ as = 'div', delay = 0, y = 24, className = '', children }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </Tag>
  )
}
