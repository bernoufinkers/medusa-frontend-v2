"use client";

import React from "react";
import { CheckCircleIcon, StarIcon } from "@heroicons/react/20/solid"

import { useTranslation } from "../../../../translations/provider"
import LanguageSelector from "../language-selector"

const USPsHeader = () => {
  // const { translations, changeLanguage } = useTranslation();
  const usps = [
    {
      id: 1,
      text: <>Binnen 24 uur geleverd</>,
      icon: <CheckCircleIcon className="h-5 w-5 me-3 text-orange-500" />,
    },
    {
      id: 2,
      text: <>Scherpe prijzen, beste service</>,
      icon: <CheckCircleIcon className="h-5 w-5 me-3 text-orange-500" />,
    },
    {
      id: 3,
      text: <>Slimme keuzes met onze huismerk artikelen</>,
      icon: <CheckCircleIcon className="h-5 w-5 me-3 text-orange-500" />,
    },
    {
      id: 4,
      text: (
        <>
          Klanten beoordelingen ons met een
          <strong className="ms-1 text-green-600 me-2"> 9,8</strong>
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} className="h-4 w-4 text-yellow-500" />
          ))}
        </>
      ),
      icon: <CheckCircleIcon className="h-5 w-5 me-3 text-orange-500" />,
    },
  ];

  return (
    <header className="relative h-8 mx-auto border-b duration-200 bg-white border-ui-border-base">
      <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
        {usps.map((usp, index) => {
          let visibilityClass = "";
          if (index === 0) {
            // Eerste USP: altijd zichtbaar
            visibilityClass = "flex items-center h-full w-full";
          } else if (index === 1) {
            // Tweede USP: zichtbaar vanaf md (tablet)
            visibilityClass = "hidden md:flex items-center h-full w-full";
          } else {
            // Derde en vierde USP: zichtbaar vanaf lg (desktop)
            visibilityClass = "hidden lg:flex items-center h-full w-full";
          }
          return (
            <div key={usp.id} className={visibilityClass}>
              <div className="flex items-center whitespace-nowrap px-4">
                {usp.icon}
                {usp.text}
              </div>
            </div>
          );
        })}
      {/* <LanguageSelector /> */}
      </nav>
    </header>
  );
};

export default USPsHeader;
