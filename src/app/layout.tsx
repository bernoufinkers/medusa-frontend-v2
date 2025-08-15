import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { SearchProvider } from "@modules/search/context/search"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <SearchProvider>
          <main className="relative">{props.children}</main>
        </SearchProvider>
      </body>
    </html>
  )
}
