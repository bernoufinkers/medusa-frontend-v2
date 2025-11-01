"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
// pas onderstaande import aan naar jouw context/store hook:
import { useSearch } from "@modules/search/context/search"

export default function RouteChangeReset() {
  const pathname = usePathname()
  const {setFoundProducts} = useSearch() // of uit context: const { reset } = useSearchContext()

  useEffect(() => {
    setFoundProducts()
  }, [pathname, setFoundProducts])

  return null
}
