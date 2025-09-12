import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          Heb je al een account?
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          Log in om je winkelwagen op te slaan en af te rekenen.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="primary" className="h-10 bg-primary" data-testid="sign-in-button">
            Inloggen
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
