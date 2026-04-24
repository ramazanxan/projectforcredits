import type { PropsWithChildren } from 'react'

interface FieldProps extends PropsWithChildren {
  label: string
  hint?: string
  error?: string
}

export function Field({ label, hint, error, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
        {hint ? <span className="text-xs text-[var(--text-muted)]">{hint}</span> : null}
      </div>
      {children}
      {error ? <span className="text-xs text-[var(--danger)]">{error}</span> : null}
    </label>
  )
}
