"use client";

import React, { useState } from 'react';
import { StoreProductCategory } from '@medusajs/types';

function AccordionCategory({
    category,
    countryCode,
    categoryPage,
}: {
    category: StoreProductCategory;
    countryCode: string;
    categoryPage?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <div className="mb-2">
            <div className="flex items-center justify-between">
                <a
                    href={`/${countryCode}/categories/${category.handle}`}
                    className={`text-sm ${!category.parent_category_id && 'font-semibold text-orange-400'} text-gray-500`}
                >
                    {category.name}
                </a>
                {category.category_children && category.category_children.length > 0 && (
                    <button
                        onClick={toggleAccordion}
                        className="ml-2 text-blue-500 focus:outline-none"
                        aria-label={isOpen ? 'Sluit categorie' : 'Open categorie'}
                    >
                        {isOpen ? '-' : '+'}
                    </button>
                )}
            </div>
            {isOpen && category.category_children && category.category_children.length > 0 && (
                <div className="ml-4 mt-2 border-l border-gray-200 pl-2">
                    {category.category_children.map((subCategory: StoreProductCategory) => (
                        <AccordionCategory
                            key={subCategory.id}
                            category={subCategory}
                            countryCode={countryCode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

interface AccordionMenuProps {
    categories: StoreProductCategory[];
    countryCode: string;
    categoryPage: boolean;
}

export default function AccordionMenu({ categories, countryCode, categoryPage }: AccordionMenuProps) {
    // console.log('categories', categories);
    return (
        <div className="flex flex-col gap-1 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
            {categories.map((category) => {
                if (!categoryPage && category.parent_category_id) return null;
                return (
                    <AccordionCategory
                        key={category.id}
                        category={category}
                        countryCode={countryCode}
                        categoryPage={categoryPage}
                    />
                );
            })}
        </div>
    );
}
