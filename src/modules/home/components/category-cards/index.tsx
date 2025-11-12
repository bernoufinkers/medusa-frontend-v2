import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"
import { CategoryCardsData } from "../../../../types/homepage"
import { getGradientClasses, getBorderClass, getBgClass, getTextClass, getHoverBgClass } from "@lib/util/color-classes"

interface CategoryCardsProps {
  data: CategoryCardsData
}

export default function CategoryCards({ data }: CategoryCardsProps) {
  const { header, layout, categories } = data

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-sm">
          {header.title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {header.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          const gradientClasses = getGradientClasses(category.colors.gradient)
          const borderClass = getBorderClass(category.colors.border)
          
          return (
            <div 
              key={category.id}
              className={`relative bg-gradient-to-br ${gradientClasses} rounded-2xl overflow-hidden min-h-[280px] flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-all duration-300 border ${borderClass} group hover:scale-[1.02]`}
            >
              {/* Background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rounded-full blur-md"></div>
              
              {/* Image container */}
              <div className="relative z-10 mb-4">
                <div className="w-full h-32 bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-inner">
                  <img 
                    src={category.image.src}
                    alt={category.image.alt}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                    {category.content.title}
                  </h3>
                  <p className="text-white/90 text-sm mb-4 drop-shadow-sm leading-relaxed">
                    {category.content.description}
                  </p>
                </div>
                
                <div className="mt-auto">
                  <LocalizedClientLink href={category.content.button.href}>
                    <Button 
                      size="small" 
                      className={`${getBgClass(category.colors.button.background)} ${getTextClass(category.colors.button.text)} ${getHoverBgClass(category.colors.button.hover)} font-semibold text-xs px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-0`}
                    >
                      {category.content.button.text}
                    </Button>
                  </LocalizedClientLink>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}