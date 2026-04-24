import { useTranslation } from 'react-i18next'
import { DataTable } from '@/components/common/DataTable'
import { PageHero } from '@/components/common/PageHero'
import { AppShell } from '@/components/layout/AppShell'

const USERS = [
  { id: 'USR-01', name: 'Алия Н.', role: 'Клиент', state: 'Активен' },
  { id: 'USR-02', name: 'Тимур А.', role: 'Модератор', state: 'Активен' },
  { id: 'USR-03', name: 'Никита С.', role: 'ИТ-администратор', state: 'Активен' },
  { id: 'USR-04', name: 'Дана Ж.', role: 'Администратор банка', state: 'Приглашен' },
]

export function AdminItUsersPage() {
  const { t } = useTranslation()

  return (
    <AppShell role="admin_it">
      <PageHero title={t('adminIt.users.title')} description={t('adminIt.users.text')} />
      <DataTable
        columns={[
          { key: 'id', header: 'ID', render: (row) => row.id },
          { key: 'name', header: 'Имя', render: (row) => row.name },
          { key: 'role', header: 'Роль', render: (row) => row.role },
          { key: 'state', header: 'Состояние', render: (row) => row.state },
        ]}
        rows={USERS}
        getRowKey={(row) => row.id}
      />
    </AppShell>
  )
}
