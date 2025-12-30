"use client"

export default function ColorShowcase() {
  const colors = {
    primary: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#34495E",
    secondary: process.env.NEXT_PUBLIC_SECONDARY_COLOR || "#f39c12"
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Theme Colors Showcase</h2>
      
      {/* Environment Variables Display */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Environment Variables:</h3>
        <p>Primary: {colors.primary}</p>
        <p>Secondary: {colors.secondary}</p>
      </div>

      {/* CSS Classes Demo */}
      <div className="space-y-2">
        <h3 className="font-semibold">CSS Classes:</h3>
        <div className="bg-primary text-white p-4 rounded">bg-primary class</div>
        <div className="bg-secondary text-white p-4 rounded">bg-secondary class</div>
        <div className="text-primary p-2 border border-primary rounded">text-primary & border-primary</div>
        <div className="text-secondary p-2 border border-secondary rounded">text-secondary & border-secondary</div>
      </div>

      {/* Tailwind Classes Demo */}
      <div className="space-y-2">
        <h3 className="font-semibold">Tailwind Classes:</h3>
        <div className="bg-primary text-white p-4 rounded">bg-primary (Tailwind)</div>
        <div className="bg-secondary text-white p-4 rounded">bg-secondary (Tailwind)</div>
        <div className="text-primary p-2 border border-primary rounded">text-primary & border-primary (Tailwind)</div>
        <div className="text-secondary p-2 border border-secondary rounded">text-secondary & border-secondary (Tailwind)</div>
      </div>
    </div>
  )
}