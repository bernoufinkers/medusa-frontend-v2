"use client"

import { useEffect, useState } from "react"
import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"
import Link from "next/link"

type Props = {
    categories: HttpTypes.StoreProductCategory[]
}

export const MegaMenu = ({ categories }: Props) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null)
    const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({})

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

    
    const topLevel = categories
        .filter(
            (cat) =>
                !cat.parent_category_id &&
                isVisible(cat) &&
                categories.some((c) => c.parent_category_id === cat.id && isVisible(c))
        )
        .sort((a, b) => getSortName(a).localeCompare(getSortName(b)))

    const level2Blocks = categories.filter(
        (c) =>
            c.parent_category_id === hoveredCategoryId &&
            isVisible(c) &&
            (c.category_children?.some(isVisible) ?? false)
    )

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

    return (
        <div
            className="h-full"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => {
                setMenuOpen(false)
                setHoveredCategoryId(null)
            }}
        >
            <div className="relative flex items-center h-full">
                <span className="text-base font-medium hover:underline cursor-pointer">
                    Assortiment
                </span>
            </div>

            {menuOpen && (
                <div
                    className="absolute left-0 top-full mt-0 w-full bg-white shadow-lg border-b border-gray-200 z-50"
                    style={{ maxHeight: "500px", overflowY: "auto" }}
                >
                    <div className="content-container flex border-t border-gray-100">
                        {/* Toplevel */}
                        <div className="w-[250px] py-6 pr-4 border-r border-gray-200">
                            {topLevel.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="text-sm py-1 px-2 hover:underline cursor-pointer"
                                    onMouseEnter={() => setHoveredCategoryId(cat.id)}
                                >
                                    {getDisplayName(cat)}
                                </div>
                            ))}
                        </div>

                        {/* Submenu */}
                        <div className="flex-1 py-6 pl-4">
                            {hoveredCategoryId && (
                                <div className="flex w-full h-full gap-6">
                                    {columns.map((col, idx) => (
                                        <div key={idx} className="flex-1 flex flex-col gap-4 overflow-hidden">
                                            {col.map((level2) => {
                                                const showAll = expandedBlocks[level2.id] || false
                                                const level3 = level2.category_children || []
                                                const visibleItems = showAll ? level3 : level3.slice(0, 5)
                                                const hasMore = level3.length > 6

                                                return (
                                                    <div key={level2.id} className="break-inside-avoid min-h-[170px]">
                                                        <h4 className="font-medium text-sm text-secondary mb-2">{getDisplayName(level2)}</h4>
                                                        <ul className="space-y-1">
                                                            {visibleItems
                                                                .filter(isVisible)
                                                                .map((level3cat) => (
                                                                    <li key={level3cat.id}>
                                                                        <Link
                                                                            href={`/categories/${level3cat.handle}`}
                                                                            onClick={() => setMenuOpen(false)}
                                                                            className="block text-sm text-gray-600 hover:underline cursor-pointer"
                                                                        >
                                                                            {getDisplayName(level3cat)}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            {hasMore && !showAll && (
                                                                <li>
                                                                    <button
                                                                        onClick={() => toggleShowAll(level2.id)}
                                                                        className="text-sm text-link hover:underline"
                                                                    >
                                                                        Toon alle
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
                            )}
                        </div>



                    </div>
                </div>
            )}
        </div>
    )
}
