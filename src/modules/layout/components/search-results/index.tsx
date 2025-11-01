"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useSearch } from "@modules/search/context/search"
import ProductActions from "@modules/categories/components/product-actions"

import React, { useEffect } from "react"
import { getRegion } from "@lib/data/regions"
import { usePathname } from "next/navigation"

export default function SearchResults() {
  const { foundProducts, setFoundProducts } = useSearch()
  const [region, setRegion] = React.useState<HttpTypes.StoreRegion | null>(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const pathname = usePathname()
  console.log("Current pathname:", pathname)

  React.useEffect(() => {
    scrollToTop()
  }, [])

  React.useEffect(() => {
    scrollToTop()
  }, [foundProducts])

  useEffect(() => {
    const fetchRegion = async () => {
        console.log("Fetching region data for NL")
      const regionData = await getRegion("nl")
      console.log("Fetched region data:", regionData)
      if (regionData) {
        setRegion(regionData)
      }
    }
    fetchRegion()
  }, [])

  if (!foundProducts || foundProducts.length === 0) {
    return <></>
  }

  return (
    <div className="content-container py-6 small:py-12">
      <h1>Zoekresultaten:</h1>
      <hr />
      {foundProducts && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {foundProducts.map((product: HttpTypes.StoreProduct) => (
            <div key={product.id} className="max-w-xs rounded overflow-hidden hover:shadow-lg">
              <LocalizedClientLink href={`/products/${product.handle}`}>
                <img
                  className="w-full h-[200px] object-contain p-4"
                  src={
                    product.thumbnail ? product.thumbnail : "/placeholder.png"
                  }
                />
              </LocalizedClientLink>
              <div className="w-full text-end px-2">
                <span className="inline-block px-2 py-0.5 text-xs font-medium text-white bg-green-600 rounded-full">
                  Op voorraad
                </span>
              </div>
              <div className="px-1 pb-2 flex flex-col justify-between h-[235px]">
                <div className="px-3 py-4">
                  <h5 className="font-bold text-sm mb-2 h-10 line-clamp-2">
                    {product.title}
                  </h5>
                  <p className="text-xs text-gray-300">
                    {product.variants?.[0]?.sku || "No SKU available"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {product.subtitle && product.subtitle.length > 100
                      ? `${product.subtitle.substring(0, 100)}...`
                      : product.subtitle}
                  </p>
                </div>
                <div className="px-3 py-2">
                  <hr className="border-gray-200 py-2" />
                  {/* <h5 className="w-full text-end">{cheapestPrice && <PreviewPrice price={cheapestPrice} />}</h5> */}
                  {region && (
                      <ProductActions product={product} region={region} disabled={false} />
                  )}
                </div>
              </div>
            </div>

            // <div key={product.id} className="max-w-xs rounded overflow-hidden shadow-lg">
            //     <LocalizedClientLink href={`/products/${product.handle}`}>
            //         <img className="w-full h-64 object-contain"
            //             src={product.thumbnail ? product.thumbnail : 'thumbnail-placeholder.png'}
            //         />
            //     </LocalizedClientLink>
            //     <div style={{ height: '270px' }} className="px-1 py-4 flex flex-col justify-between">
            //         <div className="px-3 py-4">
            //             {/* <h5 className="w-full text-end">{cheapestPrice && <PreviewPrice price={cheapestPrice} />}</h5> */}
            //             <h5 className="font-bold text-xl mb-2">{product.title}</h5>
            //             <p className="text-gray-700 text-sm">
            //                 {product.description &&
            //                     (product.description.replace(/<[^>]+>/g, '').length > 100
            //                         ? `${product.description.replace(/<[^>]+>/g, '').substring(0, 100)}...`
            //                         : product.description.replace(/<[^>]+>/g, ''))}
            //             </p>
            //         </div>
            //         <div className="px-3 py-4">
            //             <LocalizedClientLink href={`/products/${product.handle}`} className="group bg-orange-500 hover:bg-blue-500 text-white text-sm py-1 px-4 rounded">
            //                 Bekijk artikel
            //             </LocalizedClientLink>
            //         </div>
            //     </div>
            // </div>
          ))}
        </div>
      )}
    </div>
  )
}
