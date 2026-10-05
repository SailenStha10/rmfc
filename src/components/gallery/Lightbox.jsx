import YARL from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'

// Fullscreen viewer: next/prev buttons, arrow-key + Esc support and captions come from the library.
export default function Lightbox({ images, index, onClose }) {
  return (
    <YARL
      open={index >= 0}
      index={Math.max(index, 0)}
      close={onClose}
      plugins={[Captions]}
      slides={images.map((i) => ({ src: i.src, alt: i.alt, title: i.caption }))}
      carousel={{ finite: false }}
      controller={{ closeOnBackdropClick: true }}
    />
  )
}
