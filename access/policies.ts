import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'
import { ROLES } from './roles'
import { isAdmin, isLoggedIn, hasRole } from './predicates'

type Args = AccessArgs<User>

export const authenticated = ({ req }: Args) => isLoggedIn(req.user)

export const adminOnly = ({ req }: Args) => isAdmin(req.user as any)

export const studentOnly = ({ req }: Args) => hasRole(req.user as any, [ROLES.STUDENT])

export const selfOnly = ({ req }: Args) => {
  if (!req.user) return false
  return { id: { equals: req.user.id } }
}

export const selfOrAdmin = ({ req }: Args) => {
  if (!req.user) return false
  if ((req.user as any).role === ROLES.ADMIN) return true
  return { id: { equals: req.user.id } }
}
