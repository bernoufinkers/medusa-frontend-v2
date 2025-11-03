"use client"

import { useEffect, useState } from "react"

export default function ColorDebug() {
  const [computedData, setComputedData] = useState<{
    primaryFromCSS: string
    secondaryFromCSS: string
    logoUrl: string
    source: string
  } | null>(null)

  useEffect(() => {
    // Get computed CSS values
    const rootStyles = getComputedStyle(document.documentElement)
    const primaryFromCSS = rootStyles.getPropertyValue('--color-primary').trim()
    const secondaryFromCSS = rootStyles.getPropertyValue('--color-secondary').trim()
    const logoUrl = rootStyles.getPropertyValue('--logo-url').trim()

    setComputedData({
      primaryFromCSS,
      secondaryFromCSS,
      logoUrl: logoUrl || 'Not set in CSS',
      source: "API + CSS Custom Properties"
    })
  }, [])

  if (!computedData) {
    return <div>Loading debug info...</div>
  }

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 p-4 rounded-lg shadow-lg z-50 text-xs max-w-xs">
      <h3 className="font-bold mb-2">🎨 Theme Debug</h3>
      <div className="space-y-1">
        <div><strong>Source:</strong> {computedData.source}</div>
        <div><strong>Primary:</strong> {computedData.primaryFromCSS}</div>
        <div><strong>Secondary:</strong> {computedData.secondaryFromCSS}</div>
        <div><strong>Logo URL:</strong> 
          <div className="text-xs break-all mt-1 bg-gray-100 p-1 rounded">
            {computedData.logoUrl || 'Not available'}
          </div>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <div className="w-full h-4 bg-primary border rounded" title="bg-primary"></div>
        <div className="w-full h-4 bg-secondary border rounded" title="bg-secondary"></div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Check console for API logs
      </div>
    </div>
  )
}