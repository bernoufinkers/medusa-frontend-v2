"use client";

import { HttpTypes } from '@medusajs/types';
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useSearch } from '@modules/search/context/search';

import React from "react";

export default function SearchResults() {
    const { foundProducts, setFoundProducts } = useSearch();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToTop();
    }, [foundProducts]);

    if (!foundProducts || foundProducts.length === 0) {
        return <></>;
    }

    return (
        <div className='content-container py-6 small:py-12'>
            <h1>Zoekresultaten:</h1>
            <hr />
            {foundProducts && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
                    {foundProducts.map((product: HttpTypes.StoreProduct) => (

                        <div key={product.id} className="max-w-xs rounded overflow-hidden shadow-lg">
                            <LocalizedClientLink href={`/products/${product.handle}`}>
                                <img className="w-full h-64 object-contain"
                                    src={product.thumbnail ? product.thumbnail : 'thumbnail-placeholder.png'}
                                />
                            </LocalizedClientLink>
                            <div style={{ height: '270px' }} className="px-1 py-4 flex flex-col justify-between">
                                <div className="px-3 py-4">
                                    {/* <h5 className="w-full text-end">{cheapestPrice && <PreviewPrice price={cheapestPrice} />}</h5> */}
                                    <h5 className="font-bold text-xl mb-2">{product.title}</h5>
                                    <p className="text-gray-700 text-sm">
                                        {product.description && product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
                                    </p>
                                </div>
                                <div className="px-3 py-4">
                                    <LocalizedClientLink href={`/products/${product.handle}`} className="group bg-orange-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                                        Bekijk artikel
                                    </LocalizedClientLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
