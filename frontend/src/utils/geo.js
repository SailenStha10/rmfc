// Minimal equirectangular projection for a map of Nepal (SVG units: 100 per degree longitude).
export const MAP_BOUNDS = { west: 79.9, east: 88.3, north: 30.55, south: 26.25 }
const LAT_SCALE = 1.14 // stretch latitude so Nepal is not squashed at ~28°N
const K = 100

export const MAP_SIZE = {
  width: (MAP_BOUNDS.east - MAP_BOUNDS.west) * K,
  height: (MAP_BOUNDS.north - MAP_BOUNDS.south) * K * LAT_SCALE,
}

export function project([lng, lat]) {
  return [
    (lng - MAP_BOUNDS.west) * K,
    (MAP_BOUNDS.north - lat) * K * LAT_SCALE,
  ]
}

const ring = (coords) =>
  coords
    .map((c, i) => {
      const [x, y] = project(c)
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join('') + 'Z'

// GeoJSON Polygon / MultiPolygon geometry -> SVG path data
export function geometryToPath(geometry) {
  const polys = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
  return polys.map((p) => p.map(ring).join('')).join('')
}
