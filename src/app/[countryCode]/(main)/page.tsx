import { Metadata } from "next"

import { Button, Heading, Text } from "@medusajs/ui"
import {
  ChevronRightIcon,
  BoltIcon,
  CubeIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid"
import {
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline"
import { HttpTypes } from "@medusajs/types"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import QuickMenu from "@modules/home/components/quick-menu"
import CategoryCards from "@modules/home/components/category-cards"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getHomepageContent } from "@lib/data/settings"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import type { HomepageContent } from "types/homepage"
import homepageContentFallback from "../../../../homepage-content.json"
import {
  getBgClass,
  getHoverBgClass,
  getTextClass,
} from "@lib/util/color-classes"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
  searchParams?: Promise<{ debug_homepage?: string }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const debugCollections =
    searchParams?.debug_homepage === "1" ||
    process.env["DEBUG_HOMEPAGE_COLLECTIONS"] === "1"

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (debugCollections) {
    const publishableKey = process.env["NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY"]
    const publishableKeyMasked = publishableKey
      ? `${publishableKey.slice(0, 8)}…${publishableKey.slice(-4)}`
      : null

    console.log("[homepage] listCollections result", {
      countryCode,
      regionId: region?.id,
      backendUrl: process.env["MEDUSA_BACKEND_URL"],
      publishableKey: publishableKeyMasked,
      count: collections?.length ?? 0,
      collections: (collections ?? []).map((c) => ({
        id: c.id,
        handle: c.handle,
        title: c.title,
      })),
    })
  }

  if (!collections || !region) {
    return null
  }

  // Fetch homepage content from API with fallback to local JSON
  const apiContent = await getHomepageContent()
  const homepageContent: HomepageContent = apiContent || (homepageContentFallback as HomepageContent)

  const homepageTemplate = process.env.NEXT_HOMEPAGE_TEMPLATE || "1"

  // Temporary switch to allow building a new homepage without losing the current one
  if (homepageTemplate === "2") {
    return (
      <AlternativeHomepage
        content={homepageContent}
        collections={collections}
        region={region}
        debug={debugCollections}
      />
    )
  }

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

const iconMap = {
  BoltIcon,
  CubeIcon,
  WrenchScrewdriverIcon,
}

const heroBackgrounds = [
  "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1526401281623-359dbb5023b7?auto=format&fit=crop&w=1600&q=80",
]

function looksLikePhotoUrl(url?: string) {
  if (!url) return false
  return /\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(url)
}

async function AlternativeHomepage({
  content,
  collections,
  region,
  debug,
}: {
  content: HomepageContent
  collections: Awaited<ReturnType<typeof listCollections>>["collections"]
  region: HttpTypes.StoreRegion
  debug?: boolean
}) {
  const heroBlocks = content.hero?.blocks || []
  const tiles = heroBlocks.slice(0, 3)

  const topDealsCollection = collections?.[0]
  const topDeals = topDealsCollection
    ? await listProducts({
        regionId: region.id,
        queryParams: ({
          limit: 12,
          // Medusa store API supports `collection_id`, but it's not typed in StoreProductParams
          collection_id: topDealsCollection.id,
        } as any),
      }).then(({ response }) => response.products)
    : []

  if (debug) {
    console.log("[homepage] Top Deals", {
      regionId: region.id,
      topDealsCollection: topDealsCollection
        ? {
            id: topDealsCollection.id,
            handle: topDealsCollection.handle,
            title: topDealsCollection.title,
          }
        : null,
      topDealsCount: topDeals.length,
    })
  }

  return (
    <>
      {/* HERO: 3 tiles like the inspiration screenshot */}
      <section className="w-full bg-white">
        <div className="content-container py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {tiles.map((block, index) => {
              const backgroundUrl = looksLikePhotoUrl(block.image?.src)
                ? block.image.src
                : heroBackgrounds[index % heroBackgrounds.length]

              return (
                <LocalizedClientLink
                  key={block.id}
                  href={block.content.button.href}
                  className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[16/9]">
                    <img
                      src={backgroundUrl}
                      alt={block.image?.alt || block.content.title}
                      className="absolute inset-0 h-full w-full object-cover scale-[1.02] group-hover:scale-[1.05] transition-transform duration-500"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                    <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                      {block.content.badge?.text ? (
                        <div className="mb-3">
                          <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] font-semibold text-white ring-1 ring-white/20">
                            {block.content.badge.text}
                          </span>
                        </div>
                      ) : null}

                      <div className="space-y-2">
                        <h3 className="text-white text-xl md:text-2xl font-bold leading-tight drop-shadow-sm">
                          {block.content.title}
                        </h3>
                        <p className="text-white/85 text-sm leading-relaxed line-clamp-2">
                          {block.content.description}
                        </p>
                      </div>

                      <div className="mt-4 inline-flex items-center gap-2">
                        <span className="inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-4 py-2 text-sm font-semibold shadow-sm group-hover:shadow transition-shadow">
                          {block.content.button.text}
                        </span>
                      </div>
                    </div>
                  </div>
                </LocalizedClientLink>
              )
            })}
          </div>
        </div>
      </section>

      {/* TOP DEALS */}
      <section className="w-full bg-white">
        <div className="content-container py-8 md:py-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Heading level="h2" className="text-2xl md:text-3xl font-bold">
                Een greep uit onze laatste aanbiedingen
              </Heading>
              <Text className="text-sm text-gray-600 mt-1">
                Populair uit {topDealsCollection?.title || "onze collectie"}
              </Text>
            </div>
            {topDealsCollection?.handle ? (
              <LocalizedClientLink
                href={`/collections/${topDealsCollection.handle}`}
                className="text-sm font-semibold text-gray-800 hover:text-gray-900"
              >
                Bekijk alles
              </LocalizedClientLink>
            ) : null}
          </div>

          <div className="mt-5 overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-2 snap-x snap-mandatory">
              {topDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="w-full bg-sky-600">
        <div className="content-container py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-white/95">
            <TrustItem icon={TruckIcon} text="Snelle levering" />
            <TrustItem icon={ArrowPathIcon} text="30 dagen retourneren" />
            <TrustItem icon={ShieldCheckIcon} text="Veilig betalen" />
            <TrustItem icon={ChatBubbleLeftRightIcon} text="Klantenservice" />
          </div>
        </div>
      </section>

      {/* POPULAIRE CATEGORIEËN (based on categoryCards) */}
      <section className="w-full bg-white">
        <div className="content-container py-10">
          <div className="text-center mb-6">
            <Heading level="h2" className="text-2xl md:text-3xl font-bold">
              Populaire categorieën
            </Heading>
            <Text className="text-sm text-gray-600 mt-1">
              Snel shoppen per categorie
            </Text>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {content.categoryCards.categories.map((category) => (
              <LocalizedClientLink
                key={category.id}
                href={category.content.button.href}
                className="group rounded-2xl bg-gray-50 ring-1 ring-black/5 hover:bg-white hover:shadow-md transition-all duration-300 p-4"
              >
                <div className="aspect-square rounded-xl bg-white overflow-hidden ring-1 ring-black/5">
                  <img
                    src={category.image.src}
                    alt={category.image.alt}
                    className="w-full h-full object-contain p-3 group-hover:scale-[1.03] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {category.content.title}
                  </span>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINKS (uses quickMenu blocks; modernized) */}
      <section className="w-full bg-gray-50">
        <div className="content-container py-10">
          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <Heading level="h2" className="text-2xl font-bold">
                Snel naar
              </Heading>
              <Text className="text-sm text-gray-600">
                Directe ingangen uit je homepage-config
              </Text>
            </div>
            <LocalizedClientLink
              href="/store"
              className="text-sm font-semibold text-gray-800 hover:text-gray-900"
            >
              Naar de shop
            </LocalizedClientLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.quickMenu.blocks.map((block) => {
              const IconComponent =
                iconMap[block.content.icon as keyof typeof iconMap]

              return (
                <div
                  key={block.id}
                  className="rounded-2xl bg-white ring-1 ring-black/5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                        {IconComponent ? (
                          <IconComponent className="h-5 w-5 text-gray-700" />
                        ) : null}
                      </div>
                      <div>
                        <Heading level="h3" className="text-base font-bold">
                          {block.content.title}
                        </Heading>
                        <Text className="text-xs text-gray-600">
                          Populaire links
                        </Text>
                      </div>
                    </div>

                    <div className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center">
                      <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>

                  <div className="px-5 pb-5">
                    <div className="grid grid-cols-5 gap-4">
                      <div className="col-span-2">
                        <div className="aspect-square rounded-xl bg-gray-50 ring-1 ring-black/5 overflow-hidden">
                          <img
                            src={block.content.image.src}
                            alt={block.content.image.alt}
                            className="w-full h-full object-contain p-3"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="col-span-3">
                        <ul className="space-y-1">
                          {block.content.links.slice(0, 5).map((link, idx) => (
                            <li key={`${block.id}-${idx}`}>
                              <LocalizedClientLink
                                href={link.href}
                                className="group flex items-center justify-between rounded-lg px-2 py-2 text-xs text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
                              >
                                <span className="line-clamp-1">{link.text}</span>
                                <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-700" />
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Keep the existing featured-products rails lower on the page (optional) */}
      <div className="bg-white">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}

function TrustItem({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>
  text: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5" />
      <span className="text-sm font-semibold">{text}</span>
    </div>
  )
}

function ProductCard({ product }: { product: HttpTypes.StoreProduct }) {
  const { cheapestPrice } = getProductPrice({ product })
  const priceText = cheapestPrice?.calculated_price

  return (
    <div className="snap-start w-[220px] sm:w-[240px] rounded-2xl bg-white ring-1 ring-black/5 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <div className="aspect-square rounded-xl bg-gray-50 ring-1 ring-black/5 overflow-hidden">
            <img
              src={product.thumbnail || "/thumbnail-placeholder.png"}
              alt={product.title}
              className="w-full h-full object-contain p-3"
              loading="lazy"
            />
          </div>
        </LocalizedClientLink>

        <div className="mt-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                {product.title}
              </p>
              {priceText ? (
                <p className="text-sm text-gray-700 mt-1">{priceText}</p>
              ) : (
                <p className="text-sm text-gray-500 mt-1">Prijs op aanvraag</p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <LocalizedClientLink href={`/products/${product.handle}`}>
              <Button
                size="small"
                className="w-full rounded-xl bg-gray-900 text-white hover:bg-gray-800"
              >
                Bekijk artikel
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}
