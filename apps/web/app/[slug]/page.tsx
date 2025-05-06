import { notFound } from "next/navigation";
import { getPayload } from "payload";
import React, { Fragment } from "react";
import config from "@workspace/payload/payload/payload.config";
import { RefreshRouteOnSave } from "./RefreshRouterOnSave";

interface PageParams {
  params: Promise<{
    slug?: string;
  }>;
}

// eslint-disable-next-line no-restricted-exports
export default async function Page({ params: paramsPromise }: PageParams) {
  const { slug = "home" } = await paramsPromise;
  const payload = await getPayload({ config });

  const pageRes = await payload.find({
    collection: "pages",
    draft: true,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const data = pageRes?.docs?.[0] as null | any;

  if (data === null) {
    return notFound();
  }

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <main>
        <h1>{data?.title}</h1>
      </main>
    </Fragment>
  );
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });

  const pagesRes = await payload.find({
    collection: "pages",
    depth: 0,
    draft: true,
    limit: 100,
  });

  const pages = pagesRes?.docs;

  return pages.map(({ slug }) =>
    slug !== "home"
      ? {
          slug,
        }
      : {}
  );
}
