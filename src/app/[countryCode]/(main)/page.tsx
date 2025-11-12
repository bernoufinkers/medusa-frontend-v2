import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import QuickMenu from "@modules/home/components/quick-menu"
import CategoryCards from "@modules/home/components/category-cards"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getHomepageContent } from "@lib/data/settings"
import type { HomepageContent } from "types/homepage"
import homepageContentFallback from "../../../../homepage-content.json"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  // Fetch homepage content from API with fallback to local JSON
  const apiContent = await getHomepageContent()
  const homepageContent: HomepageContent = apiContent || (homepageContentFallback as HomepageContent)

  // Safety check - ensure we have valid content
  if (!homepageContent || !homepageContent.hero) {
    console.error("❌ Invalid homepage content structure!")
    console.log("Content received:", homepageContent)
    return <div className="content-container py-12">
      <p className="text-red-600">Error loading homepage content. Please check the API response structure.</p>
    </div>
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
