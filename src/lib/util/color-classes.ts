// Color mapping utility for Tailwind CSS
// Tailwind requires class names to be present in the source code at build time
// Dynamic class names like `bg-${color}` won't work

interface GradientColors {
  from: string
  via: string
  to: string
}

export const getGradientClasses = (gradient: GradientColors): string => {
  const key = `${gradient.from}-${gradient.via}-${gradient.to}`
  
  const gradients: Record<string, string> = {
    'orange-500-orange-600-orange-700': 'from-orange-500 via-orange-600 to-orange-700',
    'blue-500-blue-600-blue-700': 'from-blue-500 via-blue-600 to-blue-700',
    'green-500-green-600-green-700': 'from-green-500 via-green-600 to-green-700',
    'purple-500-purple-600-purple-700': 'from-purple-500 via-purple-600 to-purple-700',
    'teal-500-teal-600-teal-700': 'from-teal-500 via-teal-600 to-teal-700',
    'indigo-500-indigo-600-indigo-700': 'from-indigo-500 via-indigo-600 to-indigo-700',
  }
  
  return gradients[key] || 'from-gray-500 via-gray-600 to-gray-700'
}

export const getBorderClass = (color: string): string => {
  const borders: Record<string, string> = {
    'orange-200': 'border-orange-200',
    'blue-200': 'border-blue-200',
    'green-200': 'border-green-200',
    'purple-200': 'border-purple-200',
    'teal-200': 'border-teal-200',
    'indigo-200': 'border-indigo-200',
  }
  
  return borders[color] || 'border-gray-200'
}

export const getTextClass = (color: string): string => {
  const textColors: Record<string, string> = {
    'white': 'text-white',
    'white/95': 'text-white/95',
    'white/90': 'text-white/90',
    'orange-700': 'text-orange-700',
    'blue-700': 'text-blue-700',
    'green-700': 'text-green-700',
    'purple-700': 'text-purple-700',
    'teal-700': 'text-teal-700',
    'indigo-700': 'text-indigo-700',
    'gray-700': 'text-gray-700',
    'gray-400': 'text-gray-400',
  }
  
  return textColors[color] || 'text-gray-900'
}

export const getBgClass = (color: string): string => {
  const bgColors: Record<string, string> = {
    'white': 'bg-white',
    'white/90': 'bg-white/90',
    'white/10': 'bg-white/10',
    'orange-50': 'bg-orange-50',
    'blue-50': 'bg-blue-50',
    'green-50': 'bg-green-50',
    'purple-50': 'bg-purple-50',
    'teal-50': 'bg-teal-50',
    'indigo-50': 'bg-indigo-50',
    'orange-500': 'bg-orange-500',
    'blue-500': 'bg-blue-500',
    'green-500': 'bg-green-500',
    'purple-500': 'bg-purple-500',
    'teal-500': 'bg-teal-500',
    'indigo-500': 'bg-indigo-500',
  }
  
  return bgColors[color] || 'bg-gray-100'
}

export const getHoverBgClass = (color: string): string => {
  const hoverColors: Record<string, string> = {
    'orange-50': 'hover:bg-orange-50',
    'blue-50': 'hover:bg-blue-50',
    'green-50': 'hover:bg-green-50',
    'purple-50': 'hover:bg-purple-50',
    'teal-50': 'hover:bg-teal-50',
    'indigo-50': 'hover:bg-indigo-50',
  }
  
  return hoverColors[color] || 'hover:bg-gray-50'
}

export const getHoverTextClass = (color: string): string => {
  const hoverTextColors: Record<string, string> = {
    'orange-600': 'hover:text-orange-600',
    'blue-600': 'hover:text-blue-600',
    'green-600': 'hover:text-green-600',
    'purple-600': 'hover:text-purple-600',
    'teal-600': 'hover:text-teal-600',
    'indigo-600': 'hover:text-indigo-600',
  }
  
  return hoverTextColors[color] || 'hover:text-gray-600'
}

export const getGradientFromTo = (from: string, to: string): string => {
  const key = `${from}-${to}`
  
  const gradients: Record<string, string> = {
    'orange-600-orange-700': 'from-orange-600 to-orange-700',
    'blue-600-blue-700': 'from-blue-600 to-blue-700',
    'green-600-green-700': 'from-green-600 to-green-700',
    'purple-600-purple-700': 'from-purple-600 to-purple-700',
    'teal-600-teal-700': 'from-teal-600 to-teal-700',
    'indigo-600-indigo-700': 'from-indigo-600 to-indigo-700',
  }
  
  return gradients[key] || 'from-gray-600 to-gray-700'
}

export const getOverlayClass = (overlay: string): string => {
  const overlays: Record<string, string> = {
    'orange-600/10': 'from-orange-600/10',
    'blue-600/10': 'from-blue-600/10',
    'green-600/10': 'from-green-600/10',
    'purple-600/10': 'from-purple-600/10',
    'teal-600/10': 'from-teal-600/10',
    'indigo-600/10': 'from-indigo-600/10',
  }
  
  return overlays[overlay] || 'from-gray-600/10'
}