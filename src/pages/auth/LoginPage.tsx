import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api } from '@/api/api'
import { Badge } from '@/components/common/Badge'
import { BrandMark } from '@/components/common/BrandMark'
import { Button } from '@/components/common/Button'
import { buttonClasses } from '@/components/common/buttonStyles'
import { Field } from '@/components/common/Field'
import { GlassCard } from '@/components/common/GlassCard'
import { LoadingScreen } from '@/components/common/LoadingScreen'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { getDefaultRoute, useAppStore } from '@/store/appStore'

const DEMO_ACCOUNTS = [
  { email: 'client@neurobank.ai', hint: 'Кабинет клиента' },
  { email: 'moderator@neurobank.ai', hint: 'Проверка заявок' },
  { email: 'it@neurobank.ai', hint: 'ИТ-панель' },
  { email: 'bank@neurobank.ai', hint: 'Панель банка' },
]

export function LoginPage() {
  const { t } = useTranslation()
  const auth = useAppStore((state) => state.auth)
  const setAuth = useAppStore((state) => state.setAuth)
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('client@neurobank.ai')
  const [password, setPassword] = useState('demo1234')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (auth) {
    return <Navigate to={getDefaultRoute(auth.user.role)} replace />
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await api.auth.login({ email, password })
      setAuth({
        token: result.token,
        user: result.user,
      })

      const target = (location.state as { from?: string } | null)?.from
      navigate(target ?? getDefaultRoute(result.role), { replace: true })
    } catch {
      setError('Не удалось выполнить вход')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PublicHeader />
      <div className="auth-layout min-h-screen px-4 pb-12 pt-28 md:px-8">
        {loading ? <LoadingScreen /> : null}
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="flex flex-col justify-between">
            <div>
              <Badge>{t('common.demoMode')}</Badge>
              <h1 className="mt-6 font-display text-5xl font-extrabold text-[var(--text-primary)]">
                {t('auth.login.title')}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-[var(--text-muted)]">{t('auth.login.text')}</p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {DEMO_ACCOUNTS.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => setEmail(account.email)}
                  className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4 text-left transition hover:border-[var(--border)] hover:bg-[rgba(255,255,255,0.06)]"
                >
                  <p className="font-medium text-[var(--text-primary)]">{account.email}</p>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{account.hint}</p>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="mb-8 flex items-center gap-4">
              <BrandMark className="h-12 w-12" />
              <div>
                <p className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  {t('common.brand')}
                </p>
                <p className="text-sm text-[var(--text-muted)]">{t('common.tagline')}</p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <Field label={t('auth.login.email')}>
                <input
                  className="field-input"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Field>
              <Field label={t('auth.login.password')}>
                <input
                  className="field-input"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Field>

              {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}

              <div className="flex flex-wrap gap-3 pt-3">
                <Button type="submit">{t('auth.login.action')}</Button>
                <Link to="/register" className={buttonClasses('secondary')}>
                  {t('auth.login.register')}
                </Link>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </>
  )
}
