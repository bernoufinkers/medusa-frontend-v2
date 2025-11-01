import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import MegaMenuWrapper from "@modules/layout/components/mega-menu/wrapper"
import SearchInput from "@modules/common/components/search-input"
import USPsHeader from "@modules/layout/components/usp-header"
import LinksHeader from "@modules/layout/components/links-header"
import { CheckCircleIcon, UserCircleIcon, StarIcon } from "@heroicons/react/20/solid"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (

    <div className="sticky top-0 inset-x-0 z-50 group">
      <USPsHeader />
      <header className="relative h-16 mx-auto border-b duration-200 text-white border-ui-border-base bg-primary">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          

          <div className="flex me-6 items-center h-full">
            <a
              href="/"
              className="txt-compact-xlarge-plus hover:text-orange-300 uppercase text-white"
              data-testid="nav-store-link"
            >
              <img src="https://almec.com/media/85/01/d0/1745396137/Almec-logo-wit-transparant.png" alt="Almec Logo" className="h-6 w-auto" />
            </a>
          </div>

          <div className="flex flex-1 items-center h-full hidden md:flex">
            <SearchInput />
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                <UserCircleIcon className="h-6 w-6 text-white" />
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Winkelwagen (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
      <header className="w-100 relative h-15 mx-auto border-b duration-200 bg-white border-ui-border-base md:hidden py-2 px-4">
        <SearchInput />
      </header>
      <LinksHeader />
    </div>
  )
}
