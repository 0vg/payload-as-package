import type { CollectionConfig } from "payload";
import { formatSlug } from "./hooks/formatSlug";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: () => true,
    delete: () => true,
    read: () => true,
    update: () => true,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data }) => {
        const isHomePage = data.slug === "home";
        return `${process.env.NEXT_PUBLIC_WEB_URL}${!isHomePage ? `/${data.slug}` : ""}`;
      },
    },
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [formatSlug("title")],
      },
      index: true,
      label: "Slug",
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
};
