import { useTranslation } from 'react-i18next'
import { GlassCard } from '@/components/common/GlassCard'
import { PageHero } from '@/components/common/PageHero'
import { AppShell } from '@/components/layout/AppShell'
import { modelVersions } from '@/data/mockDb'
import type { ModelVersion } from '@/types/domain'

const MODEL_STAGE_LABELS: Record<ModelVersion['stage'], string> = {
  production: 'Рабочая версия',
  shadow: 'Теневая версия',
  candidate: 'Кандидат',
}

export function AdminItFormulasPage() {
  const { t } = useTranslation()

  return (
    <AppShell role="admin_it">
      <PageHero title={t('adminIt.formulas.title')} description={t('adminIt.formulas.text')} />
      <div className="grid gap-6 lg:grid-cols-2">
        {modelVersions.map((model) => (
          <GlassCard key={model.id}>
            <p className="eyebrow">{MODEL_STAGE_LABELS[model.stage]}</p>
            <h3 className="mt-4 font-display text-3xl font-bold text-[var(--text-primary)]">
              {model.name}
            </h3>
            <pre className="mt-6 overflow-x-auto rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-5 font-mono text-sm text-[var(--text-primary)]">
{`score = sigmoid(
  w1 * income +
  w2 * employment_years -
  w3 * past_due_30d +
  w4 * inquiries_6m
)`}
            </pre>
          </GlassCard>
        ))}
      </div>
    </AppShell>
  )
}
