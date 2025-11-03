# Theme Colors Configuration

Dit project ondersteunt configureerbare theme kleuren via environment variabelen.

## Setup

### 1. Environment Variabelen

Voeg de volgende variabelen toe aan je `.env.local` bestand:

```bash
# Theme colors - customize your brand colors
NEXT_PUBLIC_PRIMARY_COLOR=#34495E
NEXT_PUBLIC_SECONDARY_COLOR=#f39c12
```

### 2. Hoe het werkt

- **Environment Variabelen**: Kleuren worden geladen uit `NEXT_PUBLIC_PRIMARY_COLOR` en `NEXT_PUBLIC_SECONDARY_COLOR`
- **CSS Custom Properties**: Deze worden dynamisch gegenereerd en toegevoegd aan de HTML `<head>`
- **Fallback Waarden**: Als environment variabelen ontbreken, worden de default waarden gebruikt

## Gebruik

### CSS Classes
Je kunt de volgende CSS classes gebruiken:

```css
.bg-primary       /* Primary background color */
.bg-secondary     /* Secondary background color */
.text-primary     /* Primary text color */
.text-secondary   /* Secondary text color */
.border-primary   /* Primary border color */
.border-secondary /* Secondary border color */
```

### Tailwind Classes
De kleuren zijn ook beschikbaar als Tailwind utilities:

```html
<div class="bg-primary text-white">Primary background</div>
<div class="bg-secondary text-white">Secondary background</div>
<div class="text-primary border border-primary">Primary styled</div>
```

### JavaScript/TypeScript
Voor dynamisch gebruik in components:

```ts
import { getThemeColors } from "@lib/util/theme-colors"

const colors = getThemeColors()
console.log(colors.primary)   // #34495E
console.log(colors.secondary) // #f39c12
```

## Bestandslocaties

- **Utility functies**: `src/lib/util/theme-colors.ts`
- **CSS definities**: `src/styles/globals.css`
- **Layout integratie**: `src/app/layout.tsx`
- **Tailwind configuratie**: `tailwind.config.js`

## Voorbeeld Kleuren

Je kunt de environment variabelen aanpassen naar je huisstijl:

```bash
# Voorbeeld: Blauwe huisstijl
NEXT_PUBLIC_PRIMARY_COLOR=#2563eb
NEXT_PUBLIC_SECONDARY_COLOR=#dc2626

# Voorbeeld: Groene huisstijl  
NEXT_PUBLIC_PRIMARY_COLOR=#059669
NEXT_PUBLIC_SECONDARY_COLOR=#ea580c
```

De wijzigingen worden automatisch toegepast na het herstarten van de development server.