import { useEffect, useMemo, useState } from 'react'

const COLS = 18
const ROWS = 12

function mulberry32(seed) {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function buildFrame(seed, focusCol) {
  const rand = mulberry32(seed)
  const cells = []

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const dx = (col - focusCol) / COLS
      const dy = (row - ROWS / 2) / ROWS
      const ridge = Math.exp(-(dx * dx * 18 + dy * dy * 6))
      const noise = rand()
      const base = noise * 0.35 + ridge * 0.55
      const sparse = noise > 0.72 ? noise * 0.5 : 0
      const value = Math.min(1, base * 0.65 + sparse)
      cells.push(value)
    }
  }

  return cells
}

function cellFill(value) {
  if (value < 0.12) return 'rgba(255,255,255,0.04)'
  if (value < 0.28) return 'rgba(255,255,255,0.1)'
  if (value < 0.48) return 'rgba(255,255,255,0.2)'
  if (value < 0.68) return 'rgba(255,255,255,0.38)'
  if (value < 0.84) return 'rgba(255,255,255,0.58)'
  return 'rgba(255,255,255,0.82)'
}

/**
 * Activation-map style panel — closer to real interpretability tooling
 * than a textbook neural-net cartoon.
 */
export default function NeuralNetVisual({ className = '' }) {
  const [seed, setSeed] = useState(1)
  const [focusCol, setFocusCol] = useState(4)

  const cells = useMemo(() => buildFrame(seed, focusCol), [seed, focusCol])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const timer = window.setInterval(() => {
      setSeed((current) => current + 1)
      setFocusCol((current) => {
        const next = current + 1
        return next >= COLS - 2 ? 2 : next
      })
    }, 900)

    return () => window.clearInterval(timer)
  }, [])

  const cellW = 14
  const cellH = 12
  const gap = 2
  const padX = 14
  const padY = 16
  const width = padX * 2 + COLS * cellW + (COLS - 1) * gap
  const height = padY * 2 + ROWS * cellH + (ROWS - 1) * gap + 18

  return (
    <div
      className={`neural-net relative h-64 w-72 shrink-0 sm:h-80 sm:w-[22rem] lg:h-[22rem] lg:w-[26rem] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="pointer-events-none absolute inset-0 m-auto h-full w-full origin-center scale-[1.08] select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="8"
          y="10"
          width={width - 16}
          height={height - 16}
          rx="2"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          fill="rgba(0,0,0,0.12)"
        />

        {cells.map((value, index) => {
          const col = index % COLS
          const row = Math.floor(index / COLS)
          const x = padX + col * (cellW + gap)
          const y = padY + row * (cellH + gap)
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={cellW}
              height={cellH}
              fill={cellFill(value)}
              style={{ transition: 'fill 0.65s ease' }}
            />
          )
        })}

        <text
          x={padX}
          y={height - 14}
          fill="rgba(255,255,255,0.35)"
          fontSize="8"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          {`t=${String(seed).padStart(3, '0')}  ·  sparse units`}
        </text>
      </svg>
    </div>
  )
}
