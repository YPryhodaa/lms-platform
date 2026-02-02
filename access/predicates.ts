import type { User } from '@/payload-types'
import type { Role } from './roles'
import { ROLES } from './roles'

export type UserLike = User & { role?: Role }

export const isLoggedIn = (user?: UserLike | null) => Boolean(user)
export const isAdmin = (user?: UserLike | null) => user?.role === ROLES.ADMIN
export const isStudent = (user?: UserLike | null) => user?.role === ROLES.STUDENT

export const hasRole = (user: UserLike | null | undefined, roles: Role[]) => {
  if (!user) return false
  return roles.includes(user.role as Role)
}
