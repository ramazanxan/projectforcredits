import { buildBatchRun } from '@/utils/batch'
import { calculateScore } from '@/utils/scoring'
import { batchTemplateRows, createDemoUser, products } from '@/data/mockDb'
import type {
  BatchInputRow,
  BatchRunResult,
  LoginPayload,
  RegisterPayload,
  Role,
  ScoreResult,
  ScoreFormData,
  AuthUser,
} from '@/types/domain'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'

interface AuthResponse {
  token: string
  role: Role
  user: AuthUser
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return (await response.json()) as T
}

function simulateDelay<T>(data: T, duration = 900) {
  return new Promise<T>((resolve) => {
    window.setTimeout(() => resolve(data), duration)
  })
}

function inferRole(email: string): Role {
  const normalized = email.toLowerCase()

  if (normalized.includes('moderator')) {
    return 'moderator'
  }
  if (normalized.includes('it') || normalized.includes('mlops')) {
    return 'admin_it'
  }
  if (normalized.includes('bank') || normalized.includes('finance')) {
    return 'admin_bank'
  }
  return 'client'
}

export const api = {
  auth: {
    async login(payload: LoginPayload): Promise<AuthResponse> {
      if (!USE_MOCK_API) {
        return request<AuthResponse>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      }

      const role = inferRole(payload.email)

      return simulateDelay({
        token: `demo-token-${role}`,
        role,
        user: createDemoUser(role, payload.email),
      })
    },
    async register(payload: RegisterPayload): Promise<AuthResponse> {
      if (!USE_MOCK_API) {
        return request<AuthResponse>('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      }

      return simulateDelay({
        token: 'demo-token-client',
        role: 'client' as const,
        user: createDemoUser('client', payload.email),
      })
    },
  },
  score: {
    async predict(payload: ScoreFormData): Promise<ScoreResult> {
      if (!USE_MOCK_API) {
        return request<ScoreResult>('/api/scoring/predict', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      }

      return simulateDelay(calculateScore(payload), 1200)
    },
  },
  batch: {
    async run(rows: BatchInputRow[], threshold: number, model: string): Promise<BatchRunResult> {
      if (!USE_MOCK_API) {
        return request<BatchRunResult>('/api/batch/run', {
          method: 'POST',
          body: JSON.stringify({ rows, threshold, model }),
        })
      }

      return simulateDelay(buildBatchRun(rows, threshold, model), 1600)
    },
    async getTemplate(): Promise<BatchInputRow[]> {
      return simulateDelay(batchTemplateRows, 200)
    },
  },
  reference: {
    async getProducts(): Promise<typeof products> {
      return simulateDelay(products, 300)
    },
  },
}
