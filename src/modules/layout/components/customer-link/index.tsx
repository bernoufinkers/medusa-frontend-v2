import { retrieveCustomer } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { UserCircleIcon } from "@heroicons/react/20/solid"

export default async function CustomerLink() {
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <LocalizedClientLink
      className="hover:text-ui-fg-base flex items-center gap-2"
      href="/account"
      data-testid="nav-account-link"
    >
      <UserCircleIcon className="h-6 w-6 text-white" />
      <span className="text-xs text-white">
        {customer ? "Mijn gegevens" : "Login of word klant"}
      </span>
    </LocalizedClientLink>
  )
}