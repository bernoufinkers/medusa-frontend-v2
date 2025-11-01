import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import ProductActions from "@modules/categories/components/product-actions"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  const sku = product.variants?.[0]?.sku || "No SKU available";

  return (
    <>
      <div className="max-w-xs rounded overflow-hidden hover:shadow-lg">
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <img className="w-full h-[200px] object-contain p-4"
            src={product.thumbnail ? product.thumbnail : '/placeholder.png'}
          />
        </LocalizedClientLink>
        <div className="w-full text-end px-2">
          <span className="inline-block px-2 py-0.5 text-xs font-medium text-white bg-green-600 rounded-full">
            Op voorraad
          </span>
        </div>
        <div className="px-1 pb-2 flex flex-col justify-between h-[235px]">
          <div className="px-3 py-4">
            <h5 className="font-bold text-sm mb-2 h-10 line-clamp-2">{product.title}</h5>
            <p className="text-xs text-gray-300">{sku}</p>
            <p className="text-gray-500 text-xs">
              {product.subtitle && product.subtitle.length > 100 ? `${product.subtitle.substring(0, 100)}...` : product.subtitle}
            </p>
          </div>
          <div className="px-3 py-2">
            <hr className="border-gray-200 py-2" />
            {/* <h5 className="w-full text-end">{cheapestPrice && <PreviewPrice price={cheapestPrice} />}</h5> */}
            <ProductActions product={product} region={region} disabled={isFeatured} />
          </div>
        </div>
      </div>
    </>
  )
}
