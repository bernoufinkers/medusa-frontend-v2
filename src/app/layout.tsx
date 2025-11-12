import { getBaseURL } from "@lib/util/env"
import { generateThemeColorCSS } from "@lib/util/theme-colors"
import { getCompleteThemeSettings } from "@lib/data/settings"
import { Metadata } from "next"
import { SearchProvider } from "@modules/search/context/search"
import DynamicFavicon from "../components/dynamic-favicon"
import ColorDebug from "../components/color-debug"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

function joinWithBackend(base: string | undefined, path: string) {
  if (!base) return path
  const trimmedBase = base.replace(/\/+$/, "")
  // If path already absolute (http/https) return as-is
  if (/^https?:\/\//i.test(path)) return path
  // If path starts with // (protocol relative), prefix with https:
  if (/^\/\//.test(path)) return `https:${path}`
  // Ensure single slash between base and path
  if (path.startsWith('/')) return `${trimmedBase}${path}`
  return `${trimmedBase}/${path}`
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  console.log("🚀 RootLayout: Starting theme color generation...")
  
  const themeCSS = await generateThemeColorCSS()
  const themeSettings = await getCompleteThemeSettings()
  
  console.log("🎨 RootLayout: Theme CSS generated successfully")

  // Process favicon URL
  let faviconUrl = ''
  if (themeSettings.favicon_url && themeSettings.favicon_url.trim() !== '') {
    const backend = process.env.MEDUSA_BACKEND_URL
    faviconUrl = themeSettings.favicon_url
    
    // If favicon URL is relative, prefix with backend URL
    if (!/^https?:\/\//i.test(faviconUrl) && backend) {
      faviconUrl = joinWithBackend(backend, faviconUrl)
    }
    
    console.log("🎯 RootLayout: Using custom favicon:", faviconUrl)
  } else {
    console.log("🎯 RootLayout: No custom favicon, will use /favicon.ico")
  }

  return (
    <html lang="en" data-mode="light">
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
      </head>
      <body>
        <DynamicFavicon faviconUrl={faviconUrl} />
        <SearchProvider>
          <main className="relative">{props.children}</main>
          {/* <ColorDebug /> */}
        </SearchProvider>
      </body>
    </html>
  )
}
