// Homepage content type definitions

export interface HeroBlockColors {
  gradient: {
    from: string
    via: string
    to: string
  }
  border: string
  textPrimary: string
  textSecondary: string
  badge: {
    background: string
    text: string
    accent: string
  }
  button: {
    background: string
    text: string
    hover: string
  }
}

export interface HeroBlockContent {
  badge?: {
    text: string
    hasAccent?: boolean
    animate?: boolean
  }
  title: string
  description: string
  button: {
    text: string
    href: string
  }
}

export interface HeroBlockImage {
  src: string
  alt: string
  position: string
  size: string
}

export interface HeroBlock {
  id: string
  position: string
  size: string
  colors: HeroBlockColors
  content: HeroBlockContent
  image: HeroBlockImage
}

export interface HeroData {
  layout: {
    type: string
    leftColumnSpan: number
    rightColumnSpan: number
  }
  blocks: HeroBlock[]
}

export interface QuickMenuColors {
  header: {
    gradient: {
      from: string
      to: string
    }
    text: string
  }
  links: {
    text: string
    hover: string
    hoverBackground: string
    icon: string
    iconHover: string
  }
  imageOverlay: string
}

export interface QuickMenuLink {
  text: string
  href: string
}

export interface QuickMenuContent {
  icon: string
  title: string
  image: {
    src: string
    alt: string
  }
  links: QuickMenuLink[]
}

export interface QuickMenuBlock {
  id: string
  colors: QuickMenuColors
  content: QuickMenuContent
}

export interface QuickMenuData {
  layout: {
    columns: number
    blockLayout: string
  }
  blocks: QuickMenuBlock[]
}

export interface CategoryCardColors {
  gradient: {
    from: string
    via: string
    to: string
  }
  border: string
  button: {
    background: string
    text: string
    hover: string
  }
}

export interface CategoryCard {
  id: string
  content: {
    title: string
    description: string
    button: {
      text: string
      href: string
    }
  }
  image: {
    src: string
    alt: string
  }
  colors: CategoryCardColors
}

export interface CategoryCardsData {
  header: {
    title: string
    description: string
  }
  layout: {
    grid: {
      mobile: number
      tablet: number
      desktop: number
    }
  }
  categories: CategoryCard[]
}

export interface HomepageContent {
  hero: HeroData
  quickMenu: QuickMenuData
  categoryCards: CategoryCardsData
}