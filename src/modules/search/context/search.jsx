"use client"

import { createContext, useContext, useState, useEffect } from "react"
// import Cookies from "js-cookie";
import { usePathname } from "next/navigation"
import { searchProducts } from "@lib/data/search"

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [foundProducts, setFoundProducts] = useState([])
  const [lang, setLang] = useState("nl")
  // const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname()

  useEffect(() => {
    // Wis search results bij elke route change
    if (window.history.state.path && window.history.state.path.includes('query=')) {
      const queryValue = new URLSearchParams(window.history.state.path).get('query');
      if (queryValue && queryValue.length >= 3) {
        // Herstel de zoekresultaten voor de huidige zoekopdracht
        search("nl", null, queryValue);
      }
      return;
    } else {
      // Wis de zoekresultaten
      setFoundProducts([])
    }
  }, [pathname])

  const search = (countryCode, regionId, searchQuery) => {
    // Add searchQuery to url query params
    
    if (!searchQuery || searchQuery.length < 3) {
      setFoundProducts([])
      return
    }

    const newPath = `?query=${searchQuery}`;
    window.history.pushState({ path: newPath }, "", newPath);

    searchProducts({
      countryCode,
      regionId,
      queryParams: {
        limit: 50,
      },
      searchString: searchQuery,
    }).then((result) => {
      setFoundProducts(result.response.products)
    })
  }

  return (
    <SearchContext.Provider value={{ foundProducts, search, lang }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}
