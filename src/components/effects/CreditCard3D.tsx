import type { CSSProperties } from 'react'
import { useState } from 'react'
import { BrandMark } from '@/components/common/BrandMark'
import styles from '@/components/effects/CreditCard3D.module.css'
import { formatCurrency } from '@/utils/format'

export function CreditCard3D() {
  const [rotation, setRotation] = useState({ x: -8, y: 10, shineX: '58%', shineY: '28%' })

  return (
    <div className={styles.card}>
      <div
        className={styles.surface}
        onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          const px = (event.clientX - bounds.left) / bounds.width
          const py = (event.clientY - bounds.top) / bounds.height
          setRotation({
            x: (0.5 - py) * 18,
            y: (px - 0.5) * 18,
            shineX: `${px * 100}%`,
            shineY: `${py * 100}%`,
          })
        }}
        onMouseLeave={() => {
          setRotation({ x: -8, y: 10, shineX: '58%', shineY: '28%' })
        }}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div
          className={styles.shine}
          style={
            {
              '--shine-x': rotation.shineX,
              '--shine-y': rotation.shineY,
            } as CSSProperties
          }
        />
        <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow !text-[10px]">Карта клиента</p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">Персональный кредитный лимит</p>
            </div>
            <BrandMark className="h-12 w-12" />
          </div>

          <div>
            <p className="font-mono text-xl tracking-[0.4em] text-[var(--text-primary)]">
              4829 2048 7721 0954
            </p>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">
                  Лимит
                </p>
                <p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
                  {formatCurrency(4_800_000)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">
                  P(default)
                </p>
                <p className="mt-2 font-mono text-lg text-[var(--accent-cyan)]">18.2%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
