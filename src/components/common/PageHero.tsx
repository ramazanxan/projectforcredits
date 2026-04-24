import type { PropsWithChildren, ReactNode } from 'react'
import { GlassCard } from '@/components/common/GlassCard'
import { SectionHeading } from '@/components/common/SectionHeading'

interface PageHeroProps extends PropsWithChildren {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  aside?: ReactNode
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  children,
}: PageHeroProps) {
  return (
    <GlassCard className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
      <div className="flex items-stretch justify-stretch">{aside}</div>
    </GlassCard>
  )
}
