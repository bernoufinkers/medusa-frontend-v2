import React from "react";
import { HomeIcon } from "@heroicons/react/20/solid"
import MegaMenuWrapper from "@modules/layout/components/mega-menu/wrapper"

import { useTranslation } from "../../../../translations/provider"
import LanguageSelector from "../language-selector"
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const LinksHeader = () => {
  // const { translations, changeLanguage } = useTranslation();
  

  return (
    <header className="relative h-8 mx-auto duration-200 bg-[#ebf1f9]">
      <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-start gap-2 w-full h-full text-small-regular">
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
      {/* <LanguageSelector /> */}
      </nav>
    </header>
  );
};

export default LinksHeader;
