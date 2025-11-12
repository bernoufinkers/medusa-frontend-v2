import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ChevronRightIcon, BoltIcon, CubeIcon, WrenchScrewdriverIcon } from "@heroicons/react/20/solid"
import { QuickMenuData } from "../../../../types/homepage"
import { getGradientFromTo, getTextClass, getHoverTextClass, getHoverBgClass, getOverlayClass } from "@lib/util/color-classes"

interface QuickMenuProps {
  data: QuickMenuData
}

// Icon mapping
const iconMap = {
  BoltIcon,
  CubeIcon,
  WrenchScrewdriverIcon
}

const QuickMenu = ({ data }: QuickMenuProps) => {
  const { layout, blocks } = data

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="content-container">
        {/* Quick Menu - Dynamic blocks based on data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {blocks.map((block, index) => {
            const IconComponent = iconMap[block.content.icon as keyof typeof iconMap]
            
            return (
              <div key={block.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="grid grid-cols-2 gap-0">
                  {/* Left Column - Image */}
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={block.content.image.src} 
                      alt={block.content.image.alt} 
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${getOverlayClass(block.colors.imageOverlay)} to-transparent`}></div>
                  </div>
                  
                  {/* Right Column - Title and Links */}
                  <div className="flex flex-col">
                    {/* Colored Title Bar */}
                    <div className={`bg-gradient-to-r ${getGradientFromTo(block.colors.header.gradient.from, block.colors.header.gradient.to)} p-3`}>
                      <div className="flex items-center space-x-2">
                        {IconComponent && <IconComponent className={`h-4 w-4 ${getTextClass(block.colors.header.text)}`} />}
                        <Heading level="h3" className={`text-base font-bold ${getTextClass(block.colors.header.text)}`}>
                          {block.content.title}
                        </Heading>
                      </div>
                    </div>
                    
                    {/* Links Section */}
                    <div className="flex-1 p-2 bg-white">
                      <div className="space-y-0">
                        {block.content.links.map((link, linkIndex) => (
                          <div key={linkIndex}>
                            <LocalizedClientLink 
                              href={link.href} 
                              className={`flex items-center justify-between py-2 text-xs ${getTextClass(block.colors.links.text)} ${getHoverTextClass(block.colors.links.hover)} ${getHoverBgClass(block.colors.links.hoverBackground)} transition-all duration-200 rounded px-2 -mx-2 group`}
                            >
                              <span>{link.text}</span>
                              <ChevronRightIcon className={`h-3 w-3 ${getTextClass(block.colors.links.icon)} ${getHoverTextClass(block.colors.links.iconHover)} group-hover:translate-x-1 transition-all duration-200`} />
                            </LocalizedClientLink>
                            {linkIndex < block.content.links.length - 1 && (
                              <div className="border-t border-gray-100 mx-2"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default QuickMenu