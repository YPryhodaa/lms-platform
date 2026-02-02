import { adminOnly, selfOrAdmin } from 'access/policies'
import { ROLES } from 'access/roles'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: adminOnly,
    read: selfOrAdmin,
    update: selfOrAdmin,
    delete: adminOnly,
    create: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: ROLES.STUDENT,
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Admin', value: ROLES.ADMIN },
        { label: 'Student', value: ROLES.STUDENT },
      ],
    }
  ],
}