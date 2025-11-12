import React from "react";
import { HomeIcon, TruckIcon } from "@heroicons/react/20/solid"
import MegaMenuWrapper from "@modules/layout/components/mega-menu/wrapper"

import LocalizedClientLink from "@modules/common/components/localized-client-link";

const LinksHeader = () => {
  // const { translations, changeLanguage } = useTranslation();
  

  return (
    <header className="relative h-8 mx-auto duration-200 bg-[#ebf1f9]">
      <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between gap-2 w-full h-full text-small-regular">
        
        {/* Left side - All navigation items */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Show Home Icon with link to homepage */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-orange-300 uppercase text-ui-fg-base"
              data-testid="nav-store-link"
            >
              <HomeIcon className="h-4 w-4 text-ui-fg-base me-2" />
            </LocalizedClientLink>
          </div>

          {/* Show Mega menu */}
          <MegaMenuWrapper />

          {/* Outlet Link */}
          <LocalizedClientLink
            href="/"
            className="txt-compact-small hover:text-orange-300 text-ui-fg-base transition-colors duration-200"
          >
            Outlet
          </LocalizedClientLink>

          {/* Klantenservice Link */}
          <LocalizedClientLink
            href="/"
            className="txt-compact-small hover:text-orange-300 text-ui-fg-base transition-colors duration-200"
          >
            Klantenservice
          </LocalizedClientLink>
        </div>

        {/* Right side - Shipping info (desktop only) */}
        <div className="hidden md:flex items-center gap-1 bg-white/50 px-2 py-1 rounded text-xs font-medium text-ui-fg-base">
          <TruckIcon className="h-3 w-3 text-green-600" />
          <span className="whitespace-nowrap">Voor 16:00 uur besteld, zelfde dag verzonden</span>
        </div>

        {/* <LanguageSelector /> */}
      </nav>
    </header>
  );
};

export default LinksHeader;
