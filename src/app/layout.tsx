import { getBaseURL } from "@lib/util/env"
import { generateThemeColorCSS } from "@lib/util/theme-colors"
import { Metadata } from "next"
import { SearchProvider } from "@modules/search/context/search"
import ColorDebug from "../components/color-debug"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  console.log("🚀 RootLayout: Starting theme color generation...")
  
  const themeCSS = await generateThemeColorCSS()
  
  console.log("🎨 RootLayout: Theme CSS generated successfully")

  return (
    <html lang="en" data-mode="light">
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
      </head>
      <body>
        <SearchProvider>
          <main className="relative">{props.children}</main>
          {/* <ColorDebug /> */}
        </SearchProvider>
      </body>
    </html>
  )
}
