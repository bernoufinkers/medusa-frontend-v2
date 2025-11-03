import { getCompleteThemeSettings } from "@lib/data/settings"

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

export default async function ServerLogo() {
  const theme = await getCompleteThemeSettings()
  
  // Use fallback logo if API doesn't provide one
  const defaultLogo = "https://almec.com/media/85/01/d0/1745396137/Almec-logo-wit-transparant.png"

  // theme.logo_url may be relative (e.g. /uploads/logo.png) or absolute
  const rawLogo = theme.logo_url && theme.logo_url.trim() !== "" ? theme.logo_url : ''

  const backend = process.env.MEDUSA_BACKEND_URL
  let logoUrl = rawLogo || ''

  if (logoUrl) {
    // If logoUrl looks relative, prefix with backend URL
    if (!/^https?:\/\//i.test(logoUrl) && backend) {
      logoUrl = joinWithBackend(backend, logoUrl)
    }
  } else {
    logoUrl = defaultLogo
  }

  console.log("🖼️ ServerLogo: Using logo URL:", logoUrl)

  // Pure server-side render with data attributes for client-side fallback
  return (
    <img 
      src={logoUrl} 
      alt="Logo" 
      className="h-6 w-auto" 
      data-fallback-src={defaultLogo}
      data-testid="dynamic-logo"
    />
  )
}