"use client";

import React, { useState, useEffect } from "react";
import { CheckCircleIcon, StarIcon } from "@heroicons/react/20/solid"

const USPsHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const usps = [
    {
      id: 1,
      text: <>Binnen 24 uur geleverd</>,
      icon: <CheckCircleIcon className="h-5 w-5 me-3 text-secondary" />,
    },
    {
      id: 2,
      text: <>Scherpe prijzen, beste service</>,
      icon: <CheckCircleIcon className="h-5 w-5 me-3 text-secondary" />,
    },
    {
      id: 3,
      text: <>Slimme keuzes met onze huismerk artikelen</>,
      icon: <CheckCircleIcon className="h-5 w-5 me-3 text-secondary" />,
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
      icon: <CheckCircleIcon className="h-5 w-5 me-3 text-secondary" />,
    },
  ];

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % usps.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [usps.length]);

  // Get visible USPs based on current index
  const getVisibleUSPs = (startIndex: number, count: number) => {
    const visible = [];
    for (let i = 0; i < count; i++) {
      visible.push(usps[(startIndex + i) % usps.length]);
    }
    return visible;
  };

  // Mobile: 1 USP at a time
  const mobileUSP = getVisibleUSPs(currentIndex, 1);
  
  // Tablet: 2 USPs at a time
  const tabletUSPs = getVisibleUSPs(currentIndex, 2);

  return (
    <header className="relative h-8 mx-auto border-b duration-200 bg-white border-ui-border-base overflow-hidden">
      <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-center w-full h-full text-small-regular">
        
        {/* Mobile: 1 USP carousel */}
        <div className="flex md:hidden items-center justify-center w-full h-full">
          <div 
            key={`mobile-${mobileUSP[0].id}-${currentIndex}`}
            className="flex items-center whitespace-nowrap px-4 animate-in fade-in slide-in-from-right-4 duration-500"
          >
            {mobileUSP[0].icon}
            {mobileUSP[0].text}
          </div>
        </div>

        {/* Tablet: 2 USPs carousel */}
        <div className="hidden md:flex lg:hidden items-center justify-center w-full h-full gap-8">
          {tabletUSPs.map((usp, idx) => (
            <div 
              key={`tablet-${usp.id}-${currentIndex}-${idx}`}
              className="flex items-center whitespace-nowrap px-4 animate-in fade-in slide-in-from-right-4 duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {usp.icon}
              {usp.text}
            </div>
          ))}
        </div>

        {/* Desktop: All 4 USPs static */}
        <div className="hidden lg:flex items-center justify-between w-full h-full">
          {usps.map((usp) => (
            <div key={`desktop-${usp.id}`} className="flex items-center h-full">
              <div className="flex items-center whitespace-nowrap px-4">
                {usp.icon}
                {usp.text}
              </div>
            </div>
          ))}
        </div>

        {/* <LanguageSelector /> */}
      </nav>
    </header>
  );
};

export default USPsHeader;
