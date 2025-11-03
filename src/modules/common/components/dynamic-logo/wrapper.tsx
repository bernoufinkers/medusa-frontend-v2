import ServerLogo from "./server-logo"
import ClientLogoWrapper from "./client-wrapper"

export default async function DynamicLogoWrapper() {
  return (
    <ClientLogoWrapper>
      <ServerLogo />
    </ClientLogoWrapper>
  )
}