import { getThemeColorsFromAPI, getCompleteThemeSettings } from "@lib/data/settings"

/**
 * Get theme colors from API with fallbacks
 */
export async function getThemeColors() {
  return await getThemeColorsFromAPI()
}

/**
 * Get complete theme settings including logo
 */
export async function getCompleteTheme() {
  return await getCompleteThemeSettings()
}

/**
 * Generate CSS custom properties for theme colors and logo with high specificity
 */
export async function generateThemeColorCSS() {
  const theme = await getCompleteTheme()
  
  console.log("🎨 Generating CSS with theme:", theme)
  
  return `
    :root {
      --color-primary: ${theme.primary} !important;
      --color-secondary: ${theme.secondary} !important;
      --logo-url: "${theme.logo_url}" !important;
    }
    
    /* Ensure CSS custom properties are applied with high specificity */
    html:root {
      --color-primary: ${theme.primary};
      --color-secondary: ${theme.secondary};
      --logo-url: "${theme.logo_url}";
    }
  `
}