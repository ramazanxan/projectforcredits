import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '@/api/api'
import { Button } from '@/components/common/Button'
import { buttonClasses } from '@/components/common/buttonStyles'
import { Field } from '@/components/common/Field'
import { GlassCard } from '@/components/common/GlassCard'
import { LoadingScreen } from '@/components/common/LoadingScreen'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { getDefaultRoute, useAppStore } from '@/store/appStore'
import { cx } from '@/utils/format'

const INCOME_OPTIONS = ['До 300 000 сом', '300 000 - 700 000 сом', '700 000 - 1 500 000 сом', 'Свыше 1 500 000 сом']

export function RegisterPage() {
  const { t } = useTranslation()
  const auth = useAppStore((state) => state.auth)
  const setAuth = useAppStore((state) => state.setAuth)
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '+996',
    incomeBand: INCOME_OPTIONS[1],
    password: '',
  })

  const steps = useMemo(
    () => t('auth.register.steps', { returnObjects: true }) as string[],
    [t],
  )

  if (auth) {
    return <Navigate to={getDefaultRoute(auth.user.role)} replace />
  }

  async function submit() {
    setLoading(true)
    const result = await api.auth.register(form)
    setAuth({
      token: result.token,
      user: result.user,
    })
    navigate(getDefaultRoute(result.role), { replace: true })
  }

  return (
    <>
      <PublicHeader />
      <div className="auth-layout min-h-screen px-4 pb-12 pt-28 md:px-8">
        {loading ? <LoadingScreen /> : null}
        <div className="mx-auto max-w-4xl">
          <GlassCard className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="eyebrow">{t('auth.register.title')}</p>
                <h1 className="mt-3 font-display text-4xl font-extrabold text-[var(--text-primary)]">
                  {t('auth.register.subtitle')}
                </h1>
              </div>
              <Link to="/login" className={buttonClasses('ghost')}>
                {t('auth.login.action')}
              </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {steps.map((item, index) => (
                <div
                  key={item}
                  className={cx(
                    'rounded-[22px] border p-4',
                    index === step
                      ? 'border-[var(--border)] bg-[rgba(0,229,195,0.1)]'
                      : 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]',
                  )}
                >
                  <p className="font-mono text-sm text-[var(--accent-cyan)]">0{index + 1}</p>
                  <p className="mt-2 font-medium text-[var(--text-primary)]">{item}</p>
                </div>
              ))}
            </div>

            {step === 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                <Field label={t('auth.register.fullName')}>
                  <input
                    className="field-input"
                    value={form.fullName}
                    onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                  />
                </Field>
                <Field label={t('auth.login.email')}>
                  <input
                    className="field-input"
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  />
                </Field>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-5 md:grid-cols-2">
                <Field label={t('auth.register.phone')}>
                  <input
                    className="field-input"
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  />
                </Field>
                <Field label={t('auth.register.incomeBand')}>
                  <select
                    className="field-input"
                    value={form.incomeBand}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, incomeBand: event.target.value }))
                    }
                  >
                    {INCOME_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            ) : null}

            {step === 2 ? (
              <Field label={t('auth.login.password')}>
                <input
                  className="field-input"
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                />
              </Field>
            ) : null}

            <div className="flex flex-wrap gap-3">
              {step > 0 ? (
                <Button variant="secondary" onClick={() => setStep((current) => current - 1)}>
                  Назад
                </Button>
              ) : null}
              {step < steps.length - 1 ? (
                <Button onClick={() => setStep((current) => current + 1)}>
                  {t('common.continue')}
                </Button>
              ) : (
                <Button onClick={submit}>{t('auth.register.action')}</Button>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  )
}
