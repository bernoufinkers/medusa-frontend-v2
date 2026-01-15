import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import QuickMenu from "@modules/home/components/quick-menu"
import CategoryCards from "@modules/home/components/category-cards"

import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getHomepagePreviewContent } from "@lib/data/settings"

import type { HomepageContent } from "types/homepage"

export const metadata: Metadata = {
  title: "Homepage Preview",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function HomepagePreview(props: {
  params: Promise<{ countryCode: string; id: string }>
}) {
  const params = await props.params
  const { countryCode, id } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  const apiContent = await getHomepagePreviewContent(id)
  const homepageContent = apiContent as HomepageContent | null

  if (!homepageContent || !homepageContent.hero) {
    return (
      <div className="content-container py-12">
        <p className="text-red-600">
          Error loading homepage preview content. Please check the preview id and
          API response structure.
        </p>
      </div>
    )
  }

  return (
    <>
      <Hero data={homepageContent.hero} />
      <QuickMenu data={homepageContent.quickMenu} />
      <CategoryCards data={homepageContent.categoryCards} />

      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
