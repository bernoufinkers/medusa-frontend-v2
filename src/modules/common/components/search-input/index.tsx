"use client"

import React, { useEffect } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

import { useSearch } from "@modules/search/context/search"

const SearchInput = () => {
  const { foundProducts, search } = useSearch()
  const searchInput = React.useRef<HTMLInputElement>(null)
  const countryCode = "nl"
  const regionId = "1"

  let debounceTimeout: ReturnType<typeof setTimeout>

  const handleSearch = (delay: number = 1000) => {
    // Reset de timeout als er nieuwe input is
    clearTimeout(debounceTimeout)

    debounceTimeout = setTimeout(() => {
      search(countryCode, regionId, searchInput.current?.value)
    }, delay) // 1000 ms = 1 seconde
  }

  
  React.useEffect(() => {
    console.log("Setting up event listener for search input")
    searchInput.current?.addEventListener("input", () => {handleSearch(1000)})

    return () => {
      searchInput.current?.removeEventListener("input", () => {handleSearch(1000)})
      clearTimeout(debounceTimeout)
    }

  }, [])

  React.useEffect(() => {
    handleSearch(0)

  }, [])

  return (
    <>
      <div className="relative w-full">
        <input
          ref={searchInput}
          type="text"
          placeholder="Zoeken naar producten"
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </>
  )
}

export default SearchInput
