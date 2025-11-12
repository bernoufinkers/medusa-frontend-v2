"use client"

import { useEffect, useState, useRef } from "react"
import { HttpTypes } from "@medusajs/types"
import Link from "next/link"
import { ChevronDownIcon, ChevronRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

type Props = {
    categories: HttpTypes.StoreProductCategory[]
}

export const MegaMenu = ({ categories }: Props) => {
    // Desktop state
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false)
    const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null)
    const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({})
    
    // Mobile state
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [expandedMobileCategories, setExpandedMobileCategories] = useState<Record<string, boolean>>({})
    const [expandedMobileSubcategories, setExpandedMobileSubcategories] = useState<Record<string, boolean>>({})
    
    const menuRef = useRef<HTMLDivElement>(null)

    // Helper functions
    const isVisible = (cat: HttpTypes.StoreProductCategory): boolean =>
        cat.metadata?.show !== false

    const getDisplayName = (cat: HttpTypes.StoreProductCategory): string =>
        typeof cat.metadata?.webshop_name === "string"
            ? cat.metadata.webshop_name
            : cat.description !== "" ? cat.description : cat.name

    const getSortName = (cat: HttpTypes.StoreProductCategory): string =>
        typeof cat.metadata?.webshop_name === "string"
            ? cat.metadata.webshop_name
            : cat.name

    // Get top level categories
    const topLevel = categories
        .filter(
            (cat) =>
                !cat.parent_category_id &&
                isVisible(cat) &&
                categories.some((c) => c.parent_category_id === cat.id && isVisible(c))
        )
        .sort((a, b) => getSortName(a).localeCompare(getSortName(b)))

    // Get level 2 categories for desktop
    const level2Blocks = categories.filter(
        (c) =>
            c.parent_category_id === hoveredCategoryId &&
            isVisible(c) &&
            (c.category_children?.some(isVisible) ?? false)
    )

    // Distribute into columns for desktop
    const columns: typeof level2Blocks[] = [[], [], [], []]
    level2Blocks.forEach((block, i) => {
        columns[i % 4].push(block)
    })

    const toggleShowAll = (id: string) => {
        setExpandedBlocks((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const toggleMobileCategory = (id: string) => {
        setExpandedMobileCategories((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const toggleMobileSubcategory = (id: string) => {
        setExpandedMobileSubcategories((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
        setExpandedMobileCategories({})
        setExpandedMobileSubcategories({})
    }

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && mobileMenuOpen) {
                closeMobileMenu()
            }
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [mobileMenuOpen])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [mobileMenuOpen])

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
            >
                <Bars3Icon className="h-6 w-6 text-ui-fg-base" />
            </button>

            {/* Mobile Slide-in Drawer */}
            {mobileMenuOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300"
                        onClick={closeMobileMenu}
                        aria-hidden="true"
                    />
                    
                    {/* Drawer */}
                    <div
                        className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 md:hidden shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto"
                        role="dialog"
                        aria-label="Mobile menu"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10">
                            <h2 className="text-lg font-semibold text-ui-fg-base">Assortiment</h2>
                            <button
                                onClick={closeMobileMenu}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Sluit menu"
                            >
                                <XMarkIcon className="h-6 w-6 text-ui-fg-base" />
                            </button>
                        </div>

                        {/* Mobile Categories */}
                        <div className="px-2 py-4">
                            {topLevel.map((level1Cat) => {
                                const isExpanded = expandedMobileCategories[level1Cat.id]
                                const level2Categories = categories.filter(
                                    (c) => c.parent_category_id === level1Cat.id && isVisible(c)
                                )

                                return (
                                    <div key={level1Cat.id} className="border-b border-gray-100 last:border-0">
                                        {/* Level 1 - Main Category */}
                                        <button
                                            onClick={() => toggleMobileCategory(level1Cat.id)}
                                            className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 transition-colors rounded-lg"
                                            aria-expanded={isExpanded}
                                        >
                                            <span className="font-medium text-base text-ui-fg-base">
                                                {getDisplayName(level1Cat)}
                                            </span>
                                            <ChevronDownIcon
                                                className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                                                    isExpanded ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>

                                        {/* Level 2 - Subcategories */}
                                        {isExpanded && (
                                            <div className="pl-4 pb-2">
                                                {level2Categories.map((level2Cat) => {
                                                    const isSubExpanded = expandedMobileSubcategories[level2Cat.id]
                                                    const level3Categories = (level2Cat.category_children || []).filter(isVisible)

                                                    return (
                                                        <div key={level2Cat.id} className="mb-1">
                                                            {/* Level 2 - Subcategory Header */}
                                                            <button
                                                                onClick={() => toggleMobileSubcategory(level2Cat.id)}
                                                                className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors rounded-lg"
                                                                aria-expanded={isSubExpanded}
                                                            >
                                                                <span className="font-medium text-sm text-gray-700">
                                                                    {getDisplayName(level2Cat)}
                                                                </span>
                                                                <ChevronRightIcon
                                                                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                                                                        isSubExpanded ? "rotate-90" : ""
                                                                    }`}
                                                                />
                                                            </button>

                                                            {/* Level 3 - Sub-subcategories */}
                                                            {isSubExpanded && level3Categories.length > 0 && (
                                                                <div className="pl-4 py-1">
                                                                    {level3Categories.map((level3Cat) => (
                                                                        <Link
                                                                            key={level3Cat.id}
                                                                            href={`/categories/${level3Cat.handle}`}
                                                                            onClick={closeMobileMenu}
                                                                            className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                                        >
                                                                            {getDisplayName(level3Cat)}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            )}

            {/* Desktop Mega Menu */}
            <div
                className="hidden md:block h-full"
                onMouseEnter={() => setDesktopMenuOpen(true)}
                onMouseLeave={() => {
                    setDesktopMenuOpen(false)
                    setHoveredCategoryId(null)
                }}
                ref={menuRef}
            >
                <div className="relative flex items-center h-full">
                    <button
                        className="text-base font-medium hover:text-orange-600 cursor-pointer transition-colors duration-200 flex items-center gap-1"
                        aria-expanded={desktopMenuOpen}
                        aria-haspopup="true"
                    >
                        Assortiment
                        <ChevronDownIcon
                            className={`h-4 w-4 transition-transform duration-200 ${
                                desktopMenuOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                </div>

                {desktopMenuOpen && (
                    <div
                        className="absolute left-0 top-full -mt-1 w-full bg-white shadow-2xl border-b border-gray-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                        style={{ maxHeight: "80vh", overflowY: "auto" }}
                        role="menu"
                    >
                        <div className="content-container flex border-t border-gray-100">
                            {/* Left Column - Top Level Categories */}
                            <div className="w-[280px] py-8 pr-6 border-r border-gray-200">
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                                    Categorieën
                                </h3>
                                {topLevel.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className={`text-sm py-2.5 px-3 rounded-lg cursor-pointer transition-all duration-150 ${
                                            hoveredCategoryId === cat.id
                                                ? "bg-orange-50 text-orange-600 font-medium"
                                                : "hover:bg-gray-50 text-gray-700"
                                        }`}
                                        onMouseEnter={() => setHoveredCategoryId(cat.id)}
                                        role="menuitem"
                                        tabIndex={0}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{getDisplayName(cat)}</span>
                                            {hoveredCategoryId === cat.id && (
                                                <ChevronRightIcon className="h-4 w-4" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Section - Subcategories */}
                            <div className="flex-1 py-8 pl-6">
                                {hoveredCategoryId ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                        {columns.map((col, idx) => (
                                            <div key={idx} className="flex flex-col gap-6">
                                                {col.map((level2) => {
                                                    const showAll = expandedBlocks[level2.id] || false
                                                    const level3 = level2.category_children || []
                                                    const visibleItems = showAll ? level3 : level3.slice(0, 5)
                                                    const hasMore = level3.length > 6

                                                    return (
                                                        <div key={level2.id} className="break-inside-avoid">
                                                            <h4 className="font-semibold text-sm text-gray-900 mb-3 pb-2 border-b border-gray-100">
                                                                {getDisplayName(level2)}
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {visibleItems
                                                                    .filter(isVisible)
                                                                    .map((level3cat) => (
                                                                        <li key={level3cat.id}>
                                                                            <Link
                                                                                href={`/categories/${level3cat.handle}`}
                                                                                onClick={() => setDesktopMenuOpen(false)}
                                                                                className="block text-sm text-gray-600 hover:text-orange-600 hover:translate-x-1 transition-all duration-150"
                                                                                role="menuitem"
                                                                            >
                                                                                {getDisplayName(level3cat)}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                {hasMore && !showAll && (
                                                                    <li>
                                                                        <button
                                                                            onClick={() => toggleShowAll(level2.id)}
                                                                            className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                                                                        >
                                                                            + Toon alle ({level3.length})
                                                                        </button>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-48 text-gray-400">
                                        <p className="text-sm">Selecteer een categorie om subcategorieën te zien</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
