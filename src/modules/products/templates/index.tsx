import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery/index"
import ProductActions from "@modules/products/components/product-actions/index_ORIG"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper/index"
import { HttpTypes } from "@medusajs/types"
import ProductDescription from "../components/product-description"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {

  if (!product || !product.id) {
    return notFound()
  } else {
    console.log("ProductTemplate product", product)
  }

  const sku = product.variants?.[0]?.sku || "No SKU available";

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        <div className="flex w-full">
          <div className="flex-1 p-2 max-w-[50%]">
            <div>
              <h1 className="text-2xl font-semibold text-primary">{product.title}</h1>
              <div className="flex flex-row justify-start gap-2 text-sm">
                <span>Artikelnummer: <strong>{sku}</strong></span> | 
                <span className="text-green-600">Op voorraad</span>
              </div>
            </div>
            <div className="p-2">
              <ImageGallery images={product?.images || []} />

            </div>
          </div>
          <div className="flex-1 p-2">
            <div>
              <ProductActionsWrapper id={product.id} region={region} />
              <hr className="my-4" />
              <p className="text-primary font-semibold">
                {product.subtitle}
              </p>
              <div className="space-y-2 mt-4">
                {product.options?.map((option) => (
                  <div key={option.id} className="text-sm text-gray-800 flex items-center gap-2">
                    <span className="text-gray-500">{option.title}:</span>
                    {option.values?.map((value) => (
                      <span
                        key={value.id}
                        className="bg-gray-100 font-medium text-gray-800 text-xs px-2 py-0.5 rounded-full"
                      >
                        {value.value}
                      </span>
                    ))}
                  </div>
                ))}
                {Array.isArray(product.metadata?.barcodes) &&
                  product.metadata.barcodes.some((b) => b.length === 13) && (
                    <div className="text-sm text-gray-800 flex items-center gap-2 mt-3">
                      <span className="text-gray-500">Barcodes:</span>
                      <div className="flex flex-wrap gap-2">
                        {product.metadata.barcodes
                          .filter((b) => b.length === 13)
                          .map((b, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full font-medium"
                            >
                              {b}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
              </div>

              <hr className="my-4" />

              <p className="font-semibold text-primary">Omschrijving</p>

              <ProductDescription product={product} />
            </div>
          </div>
        </div>

      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
