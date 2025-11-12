"use client"

import { useEffect } from "react"

interface DynamicFaviconProps {
  faviconUrl: string
}

export default function DynamicFavicon({ faviconUrl }: DynamicFaviconProps) {
  useEffect(() => {
    // Only update favicon if a custom URL is provided
    if (faviconUrl && faviconUrl.trim() !== "") {
      console.log("🎯 Setting custom favicon:", faviconUrl)
      
      // Remove existing favicon links
      const existingFavicons = document.querySelectorAll("link[rel*='icon']")
      existingFavicons.forEach((link) => link.remove())

      // Add new favicon link
      const link = document.createElement("link")
      link.rel = "icon"
      link.href = faviconUrl
      link.type = "image/x-icon"
      
      // Add error handling
      link.onerror = () => {
        console.warn("⚠️ Custom favicon failed to load, using default")
        link.href = "/favicon.ico"
      }
      
      document.head.appendChild(link)
    } else {
      console.log("🎯 Using default favicon from /public/favicon.ico")
    }
  }, [faviconUrl])

  return null // This component doesn't render anything
}
