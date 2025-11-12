import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HeroData } from "../../../../types/homepage"
import { getGradientClasses, getBorderClass, getTextClass, getBgClass, getHoverBgClass } from "@lib/util/color-classes"

interface HeroProps {
  data: HeroData
}

const Hero = ({ data }: HeroProps) => {
  const { layout, blocks } = data
  
  // Find blocks by position
  const mainBlock = blocks.find(block => block.position === "left")
  const spotlightBlock = blocks.find(block => block.position === "right_top") 
  const configuratorBlock = blocks.find(block => block.position === "right_bottom")

  if (!mainBlock || !spotlightBlock || !configuratorBlock) {
    return <div>Invalid hero configuration</div>
  }

  // Get color classes
  const mainGradient = getGradientClasses(mainBlock.colors.gradient)
  const mainBorder = getBorderClass(mainBlock.colors.border)
  const spotlightGradient = getGradientClasses(spotlightBlock.colors.gradient)
  const spotlightBorder = getBorderClass(spotlightBlock.colors.border)
  const configuratorGradient = getGradientClasses(configuratorBlock.colors.gradient)
  const configuratorBorder = getBorderClass(configuratorBlock.colors.border)

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="content-container">
        {/* Hero Banners Container - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column - 2/3 width on desktop */}
          <div className="md:col-span-2">
            {/* Main Block - Dynamic from data */}
            <div className={`relative bg-gradient-to-br ${mainGradient} rounded-2xl overflow-hidden h-full min-h-[300px] md:min-h-[420px] flex flex-col justify-between p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border ${mainBorder}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/20"></div>
              
              {/* Decorative geometric shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              
              {/* Image on the right side, full height */}
              <div className="absolute right-6 top-6 bottom-6 w-2/5 max-w-[350px]">
                <img 
                  src={mainBlock.image.src} 
                  alt={mainBlock.image.alt} 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
              
              <div className="relative z-10 max-w-[55%]">
                {mainBlock.content.badge && (
                  <div className={`inline-flex items-center ${getBgClass(mainBlock.colors.badge.background)} backdrop-blur-sm ${getTextClass(mainBlock.colors.badge.text)} text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-lg`}>
                    {mainBlock.content.badge.hasAccent && (
                      <span className={`w-2 h-2 ${getBgClass(mainBlock.colors.badge.accent)} rounded-full mr-2 ${mainBlock.content.badge.animate ? 'animate-pulse' : ''}`}></span>
                    )}
                    {mainBlock.content.badge.text}
                  </div>
                )}
                <Heading level="h1" className={`${getTextClass(mainBlock.colors.textPrimary)} text-3xl md:text-4xl font-bold mb-4 leading-tight drop-shadow-lg`}>
                  {mainBlock.content.title}
                </Heading>
                <p className={`${getTextClass(mainBlock.colors.textSecondary)} text-base md:text-lg mb-8 leading-relaxed drop-shadow-sm`}>
                  {mainBlock.content.description}
                </p>
              </div>
              <div className="relative z-10 max-w-[60%]">
                <LocalizedClientLink href={mainBlock.content.button.href}>
                  <Button className={`${getBgClass(mainBlock.colors.button.background)} ${getTextClass(mainBlock.colors.button.text)} ${getHoverBgClass(mainBlock.colors.button.hover)} font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20`}>
                    {mainBlock.content.button.text}
                  </Button>
                </LocalizedClientLink>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width on desktop, stacked blocks */}
          <div className="md:col-span-1 flex flex-col gap-8">
            
            {/* Block 2 - Product Spotlight */}
            <div className={`relative bg-gradient-to-br ${spotlightGradient} rounded-2xl overflow-hidden min-h-[180px] md:min-h-[200px] flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-all duration-300 border ${spotlightBorder}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              
              {/* Image on the left side, full height */}
              <div className="absolute left-4 top-4 bottom-4 w-2/5 max-w-[160px]">
                <img 
                  src={spotlightBlock.image.src} 
                  alt={spotlightBlock.image.alt} 
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              
              <div className="relative z-10 ml-[calc(40%+1rem)] md:ml-[calc(40%+1.5rem)]">
                {spotlightBlock.content.badge && (
                  <div className={`inline-flex items-center ${getBgClass(spotlightBlock.colors.badge.background)} backdrop-blur-sm ${getTextClass(spotlightBlock.colors.badge.text)} text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
                    {spotlightBlock.content.badge.hasAccent && (
                      <span className={`w-1.5 h-1.5 ${getBgClass(spotlightBlock.colors.badge.accent)} rounded-full mr-2`}></span>
                    )}
                    {spotlightBlock.content.badge.text}
                  </div>
                )}
                <Heading level="h3" className={`${getTextClass(spotlightBlock.colors.textPrimary)} text-lg md:text-xl font-bold mb-2 leading-tight drop-shadow-md`}>
                  {spotlightBlock.content.title}
                </Heading>
                <p className={`${getTextClass(spotlightBlock.colors.textSecondary)} text-xs md:text-sm mb-4 leading-relaxed`}>
                  {spotlightBlock.content.description}
                </p>
              </div>
              <div className="relative z-10 ml-[calc(33%+1rem)] md:ml-[calc(33%+1.5rem)]">
                <LocalizedClientLink href={spotlightBlock.content.button.href}>
                  <Button size="small" className={`${getBgClass(spotlightBlock.colors.button.background)} ${getTextClass(spotlightBlock.colors.button.text)} ${getHoverBgClass(spotlightBlock.colors.button.hover)} font-semibold text-xs px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}>
                    {spotlightBlock.content.button.text}
                  </Button>
                </LocalizedClientLink>
              </div>
            </div>

            {/* Block 3 - Configurator */}
            <div className={`relative bg-gradient-to-br ${configuratorGradient} rounded-2xl overflow-hidden min-h-[180px] md:min-h-[200px] flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-all duration-300 border ${configuratorBorder}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10"></div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
              
              {/* Image on the left side, full height */}
              <div className="absolute left-4 top-4 bottom-4 w-2/5 max-w-[160px]">
                <img 
                  src={configuratorBlock.image.src} 
                  alt={configuratorBlock.image.alt} 
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              
              <div className="relative z-10 ml-[calc(40%+1rem)] md:ml-[calc(40%+1.5rem)]">
                {configuratorBlock.content.badge && (
                  <div className={`inline-flex items-center ${getBgClass(configuratorBlock.colors.badge.background)} backdrop-blur-sm ${getTextClass(configuratorBlock.colors.badge.text)} text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
                    {configuratorBlock.content.badge.hasAccent && (
                      <span className={`w-1.5 h-1.5 ${getBgClass(configuratorBlock.colors.badge.accent)} rounded-full mr-2`}></span>
                    )}
                    {configuratorBlock.content.badge.text}
                  </div>
                )}
                <Heading level="h3" className={`${getTextClass(configuratorBlock.colors.textPrimary)} text-lg md:text-xl font-bold mb-2 leading-tight drop-shadow-md`}>
                  {configuratorBlock.content.title}
                </Heading>
                <p className={`${getTextClass(configuratorBlock.colors.textSecondary)} text-xs md:text-sm mb-4 leading-relaxed`}>
                  {configuratorBlock.content.description}
                </p>
              </div>
              <div className="relative z-10 ml-[calc(33%+1rem)] md:ml-[calc(33%+1.5rem)]">
                <LocalizedClientLink href={configuratorBlock.content.button.href}>
                  <Button size="small" className={`${getBgClass(configuratorBlock.colors.button.background)} ${getTextClass(configuratorBlock.colors.button.text)} ${getHoverBgClass(configuratorBlock.colors.button.hover)} font-semibold text-xs px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}>
                    {configuratorBlock.content.button.text}
                  </Button>
                </LocalizedClientLink>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
