"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { getCacheOptions } from "./cookies"

export interface ThemeSettings {
  id: string
  primary_color: string
  secondary_color: string
  logo_url: string
  favicon_url?: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface ThemeSettingsResponse {
  color_settings: ThemeSettings
}

// Direct API response without wrapper
export interface DirectThemeResponse {
  primary_color: string
  secondary_color: string
  logo_url: string
  favicon_url?: string
}

// Union type for both possible responses
export type ApiThemeResponse = ThemeSettingsResponse | DirectThemeResponse

/**
 * Retrieves theme settings from the backend
 * @returns ThemeSettings object or null if not available
 */
export async function retrieveThemeSettings(): Promise<ThemeSettings | null> {
  try {
    const headers = {
      "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
    }

    const next = {
      ...(await getCacheOptions("theme-settings")),
      revalidate: 60, // Cache for 1 minute to allow realtime updates
    }

    console.log("🎨 Fetching theme settings from API...")

    const response = await sdk.client.fetch<ApiThemeResponse>(
      "/store/custom/settings/theme",
      {
        method: "GET",
        headers,
        next,
        cache: "force-cache",
      }
    )

    console.log("🎨 Theme settings API response:", response)

    // Check if response has color_settings wrapper
    if ('color_settings' in response && response?.color_settings) {
      console.log("✅ Theme settings loaded (wrapped):", {
        primary: response.color_settings.primary_color,
        secondary: response.color_settings.secondary_color,
        logo: response.color_settings.logo_url,
        favicon: response.color_settings.favicon_url || 'No favicon URL',
      })
      return response.color_settings
    }
    
    // Check if response has direct theme properties
    if ('primary_color' in response && response?.primary_color && response?.secondary_color) {
      console.log("✅ Theme settings loaded (direct):", {
        primary: response.primary_color,
        secondary: response.secondary_color,
        logo: response.logo_url || 'No logo URL',
        favicon: response.favicon_url || 'No favicon URL',
      })
      
      // Convert direct response to expected format
      return {
        id: "direct_api_response",
        primary_color: response.primary_color,
        secondary_color: response.secondary_color,
        logo_url: response.logo_url || '',
        favicon_url: response.favicon_url || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      }
    }

    console.log("⚠️ No theme settings found in API response")
    return null
  } catch (error) {
    console.error("❌ Error fetching color settings:", error)
    return null
  }
}

/**
 * Get theme colors with API fallback to defaults
 */
export async function getThemeColorsFromAPI() {
  const settings = await retrieveThemeSettings()
  
  const defaultColors = {
    primary: '#34495E',
    secondary: '#f39c12',
  }

  if (settings) {
    console.log("🎨 Using API colors:", {
      primary: settings.primary_color,
      secondary: settings.secondary_color,
    })
    return {
      primary: settings.primary_color,
      secondary: settings.secondary_color,
    }
  }

  console.log("🎨 Using default colors (API not available):", defaultColors)
  return defaultColors
}

/**
 * Get complete theme settings including colors, logo, and favicon
 */
export async function getCompleteThemeSettings() {
  const settings = await retrieveThemeSettings()
  
  const defaults = {
    primary: '#34495E',
    secondary: '#f39c12',
    logo_url: '',
    favicon_url: '',
  }

  if (settings) {
    console.log("🎨 Using complete theme settings:", {
      primary: settings.primary_color,
      secondary: settings.secondary_color,
      logo: settings.logo_url,
      favicon: settings.favicon_url || 'Using default favicon',
    })
    return {
      primary: settings.primary_color,
      secondary: settings.secondary_color,
      logo_url: settings.logo_url,
      favicon_url: settings.favicon_url || '',
    }
  }

  console.log("🎨 Using default theme settings (API not available):", defaults)
  return defaults
}

/**
 * Get homepage content from backend API
 * @returns Homepage content object or null if not available
 */
export async function getHomepageContent() {
  try {
    const headers = {
      "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
    }

    const next = {
      ...(await getCacheOptions("homepage")),
      revalidate: 300, // Cache for 5 minutes
    }

    console.log("🏠 Fetching homepage content from API...")

    const response = await sdk.client.fetch<any>(
      "/store/custom/settings/homepage",
      {
        method: "GET",
        headers,
        next,
        cache: "force-cache",
      }
    )

    console.log("🏠 Homepage content API response received")

    if (response && typeof response === 'object') {
      // Check if response is wrapped in 'homepage' key (most likely)
      if (response.homepage) {
        console.log("✅ Homepage content loaded from API (homepage wrapper)")
        return response.homepage
      }
      
      // Check if response has the expected structure directly
      if (response.hero && response.quickMenu && response.categoryCards) {
        console.log("✅ Homepage content loaded from API (direct format)")
        return response
      }
      
      // Check if response is wrapped in a 'homepage_content' key
      if (response.homepage_content) {
        console.log("✅ Homepage content loaded from API (homepage_content wrapper)")
        return response.homepage_content
      }
      
      // Check for 'content' wrapper key
      if (response.content) {
        console.log("✅ Homepage content loaded from API (content wrapper)")
        return response.content
      }

      console.log("⚠️ Homepage content has unexpected structure:", Object.keys(response))
      return null
    }

    console.log("⚠️ No homepage content found in API response")
    return null
  } catch (error) {
    console.error("❌ Error fetching homepage content:", error)
    return null
  }
}