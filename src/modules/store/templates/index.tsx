import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list/index"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products/index"
import AccordionMenu from "../components/categories"

import { listCategories } from "@lib/data/categories"
import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const categories = await listCategories()

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <details className="border rounded p-2 md:hidden">
        <summary className="cursor-pointer text-lg font-semibold text-gray-500">
          Filteren en sorteren
        </summary>
        <div className="mt-2">
          <RefinementList sortBy={sort}/>
          <AccordionMenu categories={categories} countryCode={countryCode} categoryPage={false} />
        </div>
      </details>
      <div className="flex-col pr-4 hidden md:flex">
        <RefinementList sortBy={sort} />
        <AccordionMenu categories={categories} countryCode={countryCode} categoryPage={false} />
      </div>
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title" className="text-blue-400">Alle producten</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
