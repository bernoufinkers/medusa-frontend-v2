"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    original_total?: number | null
    tax_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
    currency_code: string
    shipping_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  console.log("Cart totals:", totals)
  const {
    currency_code,
    total,
    subtotal,
    original_total,
    tax_total,
    shipping_total,
    discount_total,
    gift_card_total,
    shipping_subtotal,
  } = totals

  return (
    <div>
      <div className="flex flex-col gap-y-2 txt-medium text-ui-fg-subtle ">
        <div className="flex items-center justify-between">
          <span className="flex gap-x-1 items-center">
            Subtotaal
          </span>
          <span data-testid="cart-subtotal" data-value={original_total || 0}>
            {convertToLocale({ amount: original_total ?? 0, currency_code, locale: 'nl-NL' })}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>Korting</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Verzendkosten*</span>
          <span data-testid="cart-shipping" data-value={shipping_total || 0}>
            {convertToLocale({ amount: shipping_total ?? 0, currency_code })}
          </span>
        </div>
        
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Kortingscode</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>
      <div className="h-px w-full border-b border-gray-200 my-4" />
      <div className="flex justify-between">
          <span className="flex gap-x-1 items-center text-primary text-xs mb-1">Subtotaal excl. BTW</span>
          <span data-testid="cart-taxes" className="text-xs text-gray-400" data-value={tax_total || 0}>
            {convertToLocale({ amount: (total ?? 0) - (tax_total ?? 0), currency_code })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center text-primary text-xs mb-2">BTW</span>
          <span data-testid="cart-taxes" className="text-xs text-gray-400" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
        <span>Totaal</span>
        <span
          className="txt-xlarge-plus"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
      <div className="h-px w-full border-b border-gray-200 mt-4" />
      <p className="text-sm mt-2 text-primary">*Wordt berekend bij het afrekenen.</p>
    </div>
  )
}

export default CartTotals
