"use client";

import { createContext, useContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";
import {searchProducts} from "@lib/data/search"

const SearchContext = createContext();

export function SearchProvider({ children }) {
  
  const [foundProducts, setFoundProducts] = useState([]);
  const [lang, setLang] = useState("nl");
  // const [searchQuery, setSearchQuery] = useState("");

  const search = (countryCode, regionId, searchQuery) => {
    if (!searchQuery || searchQuery.length < 3) {
      setFoundProducts([]);
      return;
    }
    searchProducts({
        countryCode,
        regionId,
        queryParams: {
          limit: 50
        },
        searchString: searchQuery
      }).then((result) => {
      setFoundProducts(result.response.products);
    });
  };

  return (
    <SearchContext.Provider value={{ foundProducts, search, lang }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
