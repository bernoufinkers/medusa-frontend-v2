import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

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

  return (
    <div key={product.id} className="max-w-xs rounded overflow-hidden shadow-lg">
                            <LocalizedClientLink href={`/products/${product.handle}`}>
                                <img className="w-full h-64 object-contain"
                                    src={product.thumbnail ? product.thumbnail : 'thumbnail-placeholder.png'}
                                />
                            </LocalizedClientLink>
                            <div style={{ height: '270px' }} className="px-1 py-4 flex flex-col justify-between">
                                <div className="px-3 py-4">
                                    {/* <h5 className="w-full text-end">{cheapestPrice && <PreviewPrice price={cheapestPrice} />}</h5> */}
                                    <h5 className="font-bold text-xl mb-2">{product.title}</h5>
                                    <p className="text-gray-700 text-sm">
                                        {product.description && product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
                                    </p>
                                </div>
                                <div className="px-3 py-4">
                                    <LocalizedClientLink href={`/products/${product.handle}`} className="group bg-secondary hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                                        Bekijk artikel
                                    </LocalizedClientLink>
                                </div>
                            </div>
                        </div>
  )

  // return (
  //   <LocalizedClientLink href={`/products/${product.handle}`} className="group">
  //     <div data-testid="product-wrapper">
  //       <Thumbnail
  //         thumbnail={product.thumbnail}
  //         images={product.images}
  //         size="full"
  //         isFeatured={isFeatured}
  //       />
  //       <div className="flex txt-compact-medium mt-4 justify-between">
  //         <Text className="text-ui-fg-subtle" data-testid="product-title">
  //           {product.title}
  //         </Text>
  //         <div className="flex items-center gap-x-2">
  //           {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
  //         </div>
  //       </div>
  //     </div>
  //   </LocalizedClientLink>
  // )
}
