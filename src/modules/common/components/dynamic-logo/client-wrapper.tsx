"use client"

import { useEffect } from "react"

interface ClientLogoWrapperProps {
  children: React.ReactNode
}

export default function ClientLogoWrapper({ children }: ClientLogoWrapperProps) {
  useEffect(() => {
    // Add error handling to all logo images
    const handleImageError = (e: Event) => {
      const target = e.target as HTMLImageElement
      const fallbackSrc = target.dataset.fallbackSrc
      
      if (fallbackSrc && target.src !== fallbackSrc) {
        console.warn("🖼️ Logo failed to load, using fallback:", target.src)
        target.src = fallbackSrc
      }
    }

    // Find all logo images and add error handlers
    const logoImages = document.querySelectorAll('img[data-testid="dynamic-logo"]')
    logoImages.forEach(img => {
      img.addEventListener('error', handleImageError)
    })

    // Cleanup
    return () => {
      logoImages.forEach(img => {
        img.removeEventListener('error', handleImageError)
      })
    }
  }, [])

  return <>{children}</>
}