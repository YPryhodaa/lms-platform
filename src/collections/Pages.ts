import type { CollectionConfig, Block } from 'payload';
import { selfOrAdmin, adminOnly } from 'access/policies';
import { revalidateTag } from 'next/cache';
import slugify from 'slugify';

const blocks: Block[] = [];

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    admin: adminOnly,
    read: selfOrAdmin,
    update: selfOrAdmin,
    delete: adminOnly,
    create: () => true,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    useAsTitle: 'title',
    // livePreview: {
    //   url: async ({ data, locale }) => {
    //     const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
    //     const secret = process.env.PREVIEW_SECRET;
    //     const isHome = (data?.slug || 'home') === 'home';
    //     const slug = data?.slug || 'home';

    //     const path = isHome ? '/' : `/${slug}`;

    //     return `${base}/api/draft?secret=${secret}&redirect=${encodeURIComponent(path)}`;
    //   },
    // },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'slug',
          type: 'text',
          unique: true,
          required: true,
          admin: {
            description: 'Auto from title if empty',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'body',
      type: 'blocks',
      localized: true,
      blocks: [...blocks],
      admin: {
        initCollapsed: false,
      },
    },
  ],
  versions: {
    drafts: {
      autosave: false,
    },
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.slug && data?.title) {
          const title = typeof data?.title === 'string' ? data?.title : data?.title?.value || '';
          data.slug = slugify(`${title}`, { lower: true, strict: true });
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create' || operation === 'update') {
          revalidateTag(`page-${doc.slug}`);
          revalidateTag('pages-sitemap');
        }
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        revalidateTag(`page-${doc.slug}`);
        revalidateTag('pages-sitemap');
      },
    ],
  },
};
