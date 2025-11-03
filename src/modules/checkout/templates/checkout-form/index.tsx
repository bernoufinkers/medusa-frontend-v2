import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return (
      <div className="w-full p-6 bg-gray-50 rounded-lg">
        <p className="text-red-600">Cart not found. Please go back to your cart and try again.</p>
      </div>
    )
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return (
      <div className="w-full p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Checkout not available</h3>
        <p className="text-gray-600 mb-4">
          {!shippingMethods && "Shipping methods could not be loaded. "}
          {!paymentMethods && "Payment methods could not be loaded. "}
          Please try again or contact support.
        </p>
        <details className="text-sm text-gray-500">
          <summary className="cursor-pointer">Debug info</summary>
          <p className="mt-2">
            Cart ID: {cart.id}<br/>
            Region ID: {cart.region?.id || 'Not set'}<br/>
            Shipping methods loaded: {shippingMethods ? 'Yes' : 'No'}<br/>
            Payment methods loaded: {paymentMethods ? 'Yes' : 'No'}
          </p>
        </details>
      </div>
    )
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />

      <Shipping cart={cart} availableShippingMethods={shippingMethods} />

      <Payment cart={cart} availablePaymentMethods={paymentMethods} />

      <Review cart={cart} />
    </div>
  )
}
