import { useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/common/Badge'
import { BrandMark } from '@/components/common/BrandMark'
import { LocaleSwitch } from '@/components/common/LocaleSwitch'
import { buttonClasses } from '@/components/common/buttonStyles'
import { GlassCard } from '@/components/common/GlassCard'
import { useAppStore } from '@/store/appStore'
import { cx } from '@/utils/format'
import type { Role } from '@/types/domain'

interface SidebarProps {
  role: Role
  onNavigate?: () => void
}

interface NavItem {
  label: string
  href: string
  icon: string
}

const APPLY_SUBMENU = [
  { label: 'Автокредит', href: '/client/apply?type=auto' },
  { label: 'Ипотека', href: '/client/apply?type=mortgage' },
  { label: 'Потребительский', href: '/client/apply?type=consumer' },
  { label: 'Бизнес-кредит', href: '/client/apply?type=business' },
]

export function Sidebar({ role, onNavigate }: SidebarProps) {
  const { t } = useTranslation()
  const auth = useAppStore((state) => state.auth)
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  const logout = useAppStore((state) => state.logout)
  const location = useLocation()
  const [applyOpen, setApplyOpen] = useState(location.pathname.startsWith('/client/apply'))
  const displayName = auth?.user.name?.split(/\s+/)[0] ?? 'Пользователь'

  const items = useMemo(
    () => t(`nav.${role}`, { returnObjects: true }) as NavItem[],
    [role, t],
  )

  return (
    <aside className="flex min-h-full flex-col gap-5">
      <GlassCard className="overflow-hidden p-0">
        <div className="border-b border-[rgba(255,255,255,0.06)] px-5 py-5">
          <Link to="/" className="flex items-center gap-3" onClick={onNavigate}>
            <BrandMark />
            <div>
              <p className="font-display text-xl font-bold text-[var(--text-primary)]">
                {t('common.brand')}
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                {t('common.tagline')}
              </p>
            </div>
          </Link>
        </div>

        <div className="px-5 py-5">
          <div className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[rgba(0,229,195,0.12)] font-semibold text-[var(--accent-cyan)]">
                {auth?.user.avatar ?? 'NB'}
              </div>
              <div>
                <p className="text-lg font-semibold text-[var(--text-primary)]">{displayName}</p>
                <p className="text-sm text-[var(--text-muted)]">{auth?.user.title ?? t(`roles.${role}`)}</p>
              </div>
            </div>
            <Badge className="mt-4">{t(`roles.${role}`)}</Badge>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2 px-3 pb-4">
          {items.map((item) => (
            <div key={item.href}>
              {role === 'client' && item.href === '/client/apply' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setApplyOpen((value) => !value)}
                    className={cx(
                      'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition',
                      location.pathname.startsWith('/client/apply')
                        ? 'bg-[rgba(0,229,195,0.12)] text-[var(--text-primary)]'
                        : 'text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text-primary)]',
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      {item.label}
                    </span>
                    <span className={cx('transition', applyOpen && 'rotate-45')}>+</span>
                  </button>
                  <div
                    className={cx(
                      'grid overflow-hidden transition-all duration-300',
                      applyOpen ? 'grid-rows-[1fr] py-1' : 'grid-rows-[0fr]',
                    )}
                  >
                    <div className="overflow-hidden pl-7">
                      <div className="space-y-1 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] p-2">
                        {APPLY_SUBMENU.map((subItem) => (
                          <NavLink
                            key={subItem.href}
                            to={subItem.href}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                              cx(
                                'block rounded-xl px-3 py-2 text-sm transition',
                                isActive
                                  ? 'bg-[rgba(0,229,195,0.12)] text-[var(--accent-cyan)]'
                                  : 'text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--text-primary)]',
                              )
                            }
                          >
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.href}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cx(
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                      isActive
                        ? 'bg-[rgba(0,229,195,0.12)] text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                        : 'text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text-primary)]',
                    )
                  }
                >
                  <span>{item.icon}</span>
                  {item.label}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </GlassCard>

      <GlassCard className="flex-shrink-0 space-y-4">
        <div className="space-y-3">
          <label className="flex items-center justify-between gap-3 text-sm text-[var(--text-primary)]">
            <span>{t('common.theme')}</span>
            <button type="button" onClick={toggleTheme} className="theme-switch">
              <span />
            </button>
          </label>
          <div className="space-y-2">
            <span className="text-sm text-[var(--text-primary)]">{t('common.language')}</span>
            <LocaleSwitch compact />
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/support" className={buttonClasses('secondary', true)} onClick={onNavigate}>
            {t('common.support')}
          </Link>
          <button type="button" className={buttonClasses('ghost')} onClick={logout}>
            {t('common.logout')}
          </button>
        </div>
      </GlassCard>
    </aside>
  )
}
