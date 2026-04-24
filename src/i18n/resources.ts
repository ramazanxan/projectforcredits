const ru = {
  common: {
    brand: 'NeuroBank',
    tagline: 'Сервис кредитного скоринга на базе ИИ',
    loading: 'Загружаем интерфейс',
    calculate: 'Рассчитать',
    retry: 'Попробовать снова',
    continue: 'Далее',
    submit: 'Отправить',
    cancel: 'Отмена',
    save: 'Сохранить',
    open: 'Открыть',
    close: 'Закрыть',
    all: 'Все',
    comingSoon: 'Раздел готов к подключению API',
    updateOnRefresh: 'Обновится после перезагрузки',
    demoMode: 'Рабочий доступ',
    language: 'Язык',
    theme: 'Тема',
    support: 'Поддержка',
    logout: 'Выйти',
    dashboard: 'Личный кабинет',
    status: 'Статус',
    probability: 'P(default)',
    risk: 'Риск',
    actual: 'Факт',
    prediction: 'Прогноз',
  },
  roles: {
    client: 'Клиент',
    moderator: 'Модератор',
    admin_it: 'ИТ-администратор',
    admin_bank: 'Администратор банка',
  },
  nav: {
    public: [
      { label: 'Как это работает', href: '#how' },
      { label: 'Кредиты', href: '#products' },
      { label: 'Форум', href: '#community' },
      { label: 'Поддержка', href: '/support' },
    ],
    client: [
      { label: 'Главная', href: '/client', icon: '🏠' },
      { label: 'Рассчитать скор', href: '/client/score', icon: '📊' },
      { label: 'Подать заявку', href: '/client/apply', icon: '📝' },
      { label: 'Мои кредиты', href: '/client/loans', icon: '💳' },
      { label: 'Форум и чат', href: '/client/forum', icon: '💬' },
      { label: 'Настройки', href: '/client/settings', icon: '⚙️' },
    ],
    moderator: [
      { label: 'Обзор', href: '/moderator', icon: '🧭' },
      { label: 'Заявки', href: '/moderator/applications', icon: '🗂️' },
      { label: 'Клиенты', href: '/moderator/clients', icon: '👥' },
    ],
    admin_it: [
      { label: 'ИТ-панель', href: '/admin/it', icon: '🧠' },
      { label: 'Учетные записи', href: '/admin/it/users', icon: '🧾' },
      { label: 'Модели и правила', href: '/admin/it/formulas', icon: '🧮' },
      { label: 'Пакетный тест', href: '/admin/it/batch-test', icon: '🧪' },
      { label: 'Логи', href: '/admin/it/logs', icon: '📡' },
    ],
    admin_bank: [
      { label: 'Панель банка', href: '/admin/bank', icon: '🏦' },
      { label: 'Правила банка', href: '/admin/bank/formulas', icon: '📈' },
      { label: 'Аналитика', href: '/admin/bank/analytics', icon: '📉' },
    ],
  },
  landing: {
    hero: {
      eyebrow: 'Онлайн-скоринг и заявки',
      lines: ['КРЕДИТ.', 'БЫСТРО.', 'ПОНЯТНО.'],
      subtitle:
        'Рассчитайте кредитный риск, подайте заявку и отслеживайте результат в одном интерфейсе.',
      primary: 'Рассчитать скор',
      secondary: 'Войти',
      cardTitle: 'Карта клиента',
      cardChip: 'Кредитный лимит',
    },
    how: {
      eyebrow: 'Как это работает',
      title: 'От заявки до решения за несколько шагов',
      description: 'Заполнение формы, расчет риска и получение результата без лишних экранов.',
      steps: [
        {
          title: 'Заполните форму',
          text: 'Укажите данные по доходу, сумме кредита, ставке и кредитной нагрузке.',
        },
        {
          title: 'Получите расчет',
          text: 'Система оценит риск, рассчитает платеж и покажет вероятность дефолта.',
        },
        {
          title: 'Выберите следующий шаг',
          text: 'После расчета можно сразу перейти к подаче заявки или скорректировать параметры.',
        },
      ],
    },
    products: {
      eyebrow: 'Кредитные продукты',
      title: 'Выберите подходящий формат финансирования',
    },
    trust: {
      eyebrow: 'Нам доверяют',
      title: 'Ключевые показатели сервиса',
      stats: [
        { label: 'клиентов', value: '50 000+' },
        { label: 'точность модели', value: '98%' },
        { label: 'среднее время', value: '2 мин' },
      ],
    },
    forum: {
      eyebrow: 'Сообщество',
      title: 'Вопросы, отзывы и быстрые ответы',
      cta: 'Открыть форум',
    },
    finalCta: {
      title: 'Готовы проверить заявку?',
      text: 'Рассчитайте скор или сразу перейдите к заполнению кредитной заявки.',
      action: 'Перейти к расчету',
    },
    footer: 'Frontend для интеграции с Django REST API',
  },
  auth: {
    login: {
      title: 'Вход в NeuroBank',
      text: 'Введите рабочую почту и пароль. После входа система откроет ваш кабинет и актуальные задачи.',
      email: 'Почта или номер',
      password: 'Пароль',
      action: 'Войти',
      register: 'Создать аккаунт',
    },
    register: {
      title: 'Регистрация',
      subtitle: 'Заполните данные, чтобы создать кабинет и продолжить работу с заявками.',
      steps: ['Профиль', 'Контакты', 'Безопасность'],
      fullName: 'Имя и фамилия',
      phone: 'Телефон',
      incomeBand: 'Доход',
      action: 'Создать аккаунт',
    },
  },
  client: {
    dashboard: {
      title: 'Главная',
      text: 'Ваш скор, активные кредиты и доступные предложения собраны в одном разделе.',
      quickActions: ['Рассчитать скор', 'Подать заявку', 'Открыть форум'],
    },
    score: {
      title: 'Расчет кредитного скора',
      text: 'Заполните все 8 полей, чтобы получить предварительную оценку риска.',
      monthlyIncome: 'Ежемесячный доход',
      employmentYears: 'Стаж работы',
      loanAmount: 'Сумма кредита',
      loanTerm: 'Срок кредита',
      interestRate: 'Процентная ставка',
      pastDue: 'Просрочки 30+ дней',
      inquiries: 'Запросы за 6 месяцев',
      age: 'Возраст',
      previewPayment: 'Ежемесячный платеж',
      previewOverpayment: 'Переплата',
      previewRisk: 'Индикатор риска',
      youngDeclineTitle: 'Пока не одобрено',
      youngDeclineSubtitle: 'Показатели пока недостаточны для положительного решения.',
      youngDeclineBody: 'Что можно улучшить перед повторной подачей:',
      adultDeclineTitle: 'Заявка не одобрена',
      adultDeclineSubtitle: 'Текущий профиль риска выше допустимого порога.',
      approvedTitle: 'ОДОБРЕНО',
      approvedAction: 'Перейти к оформлению',
      managerAction: 'Связаться с менеджером',
    },
    apply: {
      title: 'Подача заявки',
      text: 'Выберите продукт и заполните основные параметры заявки.',
      selectProduct: 'Выберите продукт',
      purpose: 'Цель кредита',
      notes: 'Комментарий',
      submit: 'Отправить заявку',
    },
    loans: {
      title: 'Мои кредиты',
      text: 'Остаток, платежи и даты по действующим кредитам.',
    },
    forum: {
      title: 'Форум и чат',
      text: 'Здесь можно задать вопрос по заявке, кредиту или работе сервиса.',
    },
    settings: {
      title: 'Настройки',
      text: 'Управление оформлением, языком и звуковыми уведомлениями.',
    },
  },
  moderator: {
    dashboard: {
      title: 'Панель модератора',
      text: 'Очередь заявок и приоритетные кейсы для ручной проверки.',
    },
    applications: {
      title: 'Заявки на рассмотрении',
      text: 'Список заявок с суммой, риском и текущим статусом.',
    },
    clients: {
      title: 'Клиенты',
      text: 'Сегменты клиентов, их скор и назначенные менеджеры.',
    },
  },
  adminIt: {
    dashboard: {
      title: 'ИТ-панель',
      text: 'Состояние моделей, версий и инфраструктуры скоринга.',
    },
    users: {
      title: 'Учетные записи',
      text: 'Список пользователей для интеграции с авторизацией и ролями.',
    },
    formulas: {
      title: 'Модели и правила',
      text: 'Версии модели и расчетная логика, используемая в скоринге.',
    },
    batch: {
      title: 'Пакетное тестирование',
      text: 'Загрузка файла, запуск теста и анализ результатов по модели.',
      uploadTitle: 'Загрузка файла',
      runTitle: 'Параметры запуска',
      progressTitle: 'Прогресс',
      resultTitle: 'Результаты',
      uploadAction: 'Загрузить файл',
      downloadTemplate: 'Скачать шаблон CSV',
      runAction: 'Запустить тест',
      cancelAction: 'Отменить',
      threshold: 'Порог классификации',
      limit: 'Количество строк',
      model: 'Модель',
      terminal: 'Журнал обработки',
      export: 'Экспорт CSV',
      onlyDefault: 'Только default',
      onlyNonDefault: 'Только non-default',
      allRows: 'Все строки',
      preview: 'Первые 5 строк',
      processed: 'Обработано',
    },
    logs: {
      title: 'Системные логи',
      text: 'События по моделям, очередям и интеграциям.',
    },
  },
  adminBank: {
    dashboard: {
      title: 'Панель банка',
      text: 'Показатели портфеля, воронка одобрений и бизнес-метрики.',
    },
    formulas: {
      title: 'Правила банка',
      text: 'Бизнес-правила, лимиты и условия маршрутизации заявок.',
    },
    analytics: {
      title: 'Аналитика',
      text: 'Графики по портфелю, риску и распределению заявок.',
    },
  },
  support: {
    title: 'Поддержка и FAQ',
    text: 'Ответы на частые вопросы и контакты для связи.',
  },
  factors: {
    age: 'Возраст',
    income: 'Доход',
    employment: 'Стабильность занятости',
    amount: 'Сумма кредита',
    term: 'Срок кредита',
    rate: 'Процентная ставка',
    delinquencies: 'История просрочек',
    inquiries: 'Количество недавних запросов',
  },
  recommendations: {
    reduce_delinquency: 'Сначала закройте текущие просрочки и стабилизируйте платежную дисциплину.',
    pause_inquiries: 'Сделайте паузу в новых заявках, чтобы снизить нагрузку по недавним запросам.',
    reduce_amount: 'Попробуйте уменьшить сумму кредита или увеличить первоначальный взнос.',
    increase_stability: 'Добавьте подтвержденный стаж работы или официальный источник дохода.',
    keep_profile: 'Профиль выглядит устойчиво. Можно переходить к следующему этапу.',
  },
}

const en = structuredClone(ru)
en.common.tagline = 'AI-powered credit scoring service'
en.auth.login.title = 'Sign in to NeuroBank'
en.support.title = 'Support and FAQ'

const kz = structuredClone(ru)
kz.common.tagline = 'AI негiзiндегi кредит скоринг сервисi'
kz.auth.login.title = 'NeuroBank-ке кiру'
kz.support.title = 'Колдау жане FAQ'

export const resources = {
  ru: { translation: ru },
  en: { translation: en },
  kz: { translation: kz },
}
