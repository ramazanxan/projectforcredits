import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { api } from '@/api/api'
import { Button } from '@/components/common/Button'
import { Field } from '@/components/common/Field'
import { GlassCard } from '@/components/common/GlassCard'
import { LoadingScreen } from '@/components/common/LoadingScreen'
import { PageHero } from '@/components/common/PageHero'
import { ScoreResponsePanel } from '@/components/score/ScoreResponsePanel'
import { AppShell } from '@/components/layout/AppShell'
import { useAppStore } from '@/store/appStore'
import type { ScoreFormData } from '@/types/domain'
import { calculateScore } from '@/utils/scoring'
import { formatCurrency } from '@/utils/format'

const TERM_OPTIONS = [6, 12, 24, 36, 60, 84]
const AMOUNT_CHIPS = [100_000, 500_000, 1_000_000, 5_000_000]

const DEFAULT_FORM: ScoreFormData = {
  age: 28,
  monthly_income: 0,
  employment_years: 2,
  loan_amount: 0,
  loan_term_months: 24,
  interest_rate: 16,
  past_due_30d: 0,
  inquiries_6m: 0,
}

export function ScorePage() {
  const { t } = useTranslation()
  const setLastScoreResult = useAppStore((state) => state.setLastScoreResult)
  const [form, setForm] = useState<ScoreFormData>(DEFAULT_FORM)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ReturnType<typeof calculateScore> | null>(null)

  const preview = useMemo(() => calculateScore(form), [form])
  const isComplete =
    form.monthly_income > 0 &&
    form.employment_years >= 0 &&
    form.loan_amount > 0 &&
    form.loan_term_months > 0 &&
    form.interest_rate > 0

  const riskDots = preview.riskLevel === 'low' ? 2 : preview.riskLevel === 'medium' ? 3 : 5

  function updateField<Key extends keyof ScoreFormData>(key: Key, value: ScoreFormData[Key]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isComplete) {
      return
    }

    setLoading(true)
    const next = await api.score.predict(form)
    setResult(next)
    setLastScoreResult(next)
    setLoading(false)
  }

  return (
    <AppShell role="client">
      {loading ? <LoadingScreen /> : null}
      <PageHero
        eyebrow={t('common.dashboard')}
        title={t('client.score.title')}
        description={t('client.score.text')}
        aside={
          <GlassCard className="flex h-full flex-col justify-between">
            <p className="eyebrow">{t('common.probability')}</p>
            <div>
              <p className="font-mono text-4xl font-semibold text-[var(--text-primary)]">
                {Math.round(preview.probabilityDefault * 100)}%
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Предварительный расчет до отправки запроса
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-muted)]">
                  {t('client.score.previewPayment')}
                </span>
                <span className="font-medium text-[var(--text-primary)]">
                  {formatCurrency(preview.monthlyPayment)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-muted)]">
                  {t('client.score.previewOverpayment')}
                </span>
                <span className="font-medium text-[var(--text-primary)]">
                  {formatCurrency(preview.totalOverpayment)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-muted)]">
                  {t('client.score.previewRisk')}
                </span>
                <span className="flex gap-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        background:
                          index < riskDots ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.08)',
                      }}
                    />
                  ))}
                </span>
              </div>
            </div>
          </GlassCard>
        }
      />

      <form className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]" onSubmit={handleSubmit}>
        <GlassCard className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t('client.score.age')} hint={`${form.age} лет`}>
              <div className="space-y-3">
                <input
                  className="w-full accent-[var(--accent-cyan)]"
                  type="range"
                  min={18}
                  max={80}
                  value={form.age}
                  onChange={(event) => updateField('age', Number(event.target.value))}
                />
                <input
                  className="field-input"
                  type="number"
                  value={form.age}
                  onChange={(event) => updateField('age', Number(event.target.value))}
                />
              </div>
            </Field>

            <Field label={t('client.score.monthlyIncome')}>
              <input
                className="field-input"
                type="number"
                min={0}
                value={form.monthly_income || ''}
                onChange={(event) => updateField('monthly_income', Number(event.target.value))}
                placeholder="1 500 000 сом"
              />
            </Field>

            <Field label={t('client.score.employmentYears')} hint={`${form.employment_years} лет`}>
              <div className="space-y-3">
                <input
                  className="w-full accent-[var(--accent-cyan)]"
                  type="range"
                  min={0}
                  max={40}
                  value={form.employment_years}
                  onChange={(event) => updateField('employment_years', Number(event.target.value))}
                />
                <input
                  className="field-input"
                  type="number"
                  min={0}
                  value={form.employment_years}
                  onChange={(event) => updateField('employment_years', Number(event.target.value))}
                />
              </div>
            </Field>

            <Field label={t('client.score.loanAmount')}>
              <input
                className="field-input"
                type="number"
                min={0}
                value={form.loan_amount || ''}
                onChange={(event) => updateField('loan_amount', Number(event.target.value))}
                placeholder="3 500 000 сом"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {AMOUNT_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className="rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-2 text-xs text-[var(--text-primary)] transition hover:border-[var(--border)]"
                    onClick={() => updateField('loan_amount', chip)}
                  >
                    {formatCurrency(chip)}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <Field label={t('client.score.loanTerm')}>
            <div className="segmented-control">
              {TERM_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={form.loan_term_months === option ? 'is-active' : ''}
                  onClick={() => updateField('loan_term_months', option)}
                >
                  {option} мес.
                </button>
              ))}
            </div>
          </Field>

          <Field label={t('client.score.interestRate')} hint={`${form.interest_rate}%`}>
            <div className="space-y-3">
              <input
                className="w-full accent-[var(--accent-cyan)]"
                type="range"
                min={5}
                max={35}
                value={form.interest_rate}
                onChange={(event) => updateField('interest_rate', Number(event.target.value))}
              />
              <p className="text-sm text-[var(--text-muted)]">
                Ежемесячный платеж: {formatCurrency(preview.monthlyPayment)}
              </p>
            </div>
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label={t('client.score.pastDue')}
              hint={form.past_due_30d > 2 ? 'Повышенный риск' : undefined}
            >
              <div className="stepper">
                <button
                  type="button"
                  onClick={() => updateField('past_due_30d', Math.max(0, form.past_due_30d - 1))}
                >
                  -
                </button>
                <span>{form.past_due_30d}</span>
                <button type="button" onClick={() => updateField('past_due_30d', form.past_due_30d + 1)}>
                  +
                </button>
              </div>
            </Field>

            <Field
              label={t('client.score.inquiries')}
              hint={form.inquiries_6m > 4 ? 'Повышенный риск' : undefined}
            >
              <div className="stepper">
                <button
                  type="button"
                  onClick={() => updateField('inquiries_6m', Math.max(0, form.inquiries_6m - 1))}
                >
                  -
                </button>
                <span>{form.inquiries_6m}</span>
                <button type="button" onClick={() => updateField('inquiries_6m', form.inquiries_6m + 1)}>
                  +
                </button>
              </div>
            </Field>
          </div>

          <Button type="submit" disabled={!isComplete}>
            {t('common.calculate')}
          </Button>
        </GlassCard>

        <GlassCard className="space-y-5">
          <p className="eyebrow">{t('common.brand')}</p>
          <h3 className="font-display text-3xl font-bold text-[var(--text-primary)]">
            Предварительный расчет
          </h3>
          <div className="space-y-4 rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-muted)]">
                {t('client.score.previewPayment')}
              </span>
              <span className="font-medium text-[var(--text-primary)]">
                {formatCurrency(preview.monthlyPayment)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-muted)]">
                {t('client.score.previewOverpayment')}
              </span>
              <span className="font-medium text-[var(--text-primary)]">
                {formatCurrency(preview.totalOverpayment)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-muted)]">P(default)</span>
              <span className="font-mono text-[var(--accent-cyan)]">
                {Math.round(preview.probabilityDefault * 100)}%
              </span>
            </div>
          </div>
        </GlassCard>
      </form>

      {result ? <ScoreResponsePanel result={result} onRetry={() => setResult(null)} /> : null}
    </AppShell>
  )
}
