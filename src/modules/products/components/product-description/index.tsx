"use client"

import { HttpTypes } from "@medusajs/types"
import { useEffect, useRef, useState } from "react"

type ProductInfoProps = {
    product: HttpTypes.StoreProduct
}

const COLLAPSED_MAX = 250; // px

const ProductDescription = ({ product }: ProductInfoProps) => {
    const [showFull, setShowFull] = useState(false);
    const [needsTruncation, setNeedsTruncation] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        const check = () => {
            // scrollHeight = volledige contenthoogte; vergelijk met onze limiet
            const exceeds = el.scrollHeight > COLLAPSED_MAX + 1; // +1 speling
            setNeedsTruncation(exceeds);
            // Als er niet meer getrunceerd hoeft te worden, zorg dat we niet "vast" open blijven
            if (!exceeds && showFull) setShowFull(false);
        };

        // Eerst na mount en bij content-wijziging checken
        // Klein raf om fonts/layout te laten stabiliseren
        const id = requestAnimationFrame(check);

        // Reageer op latere layout-wijzigingen
        let ro: ResizeObserver | null = null;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(check);
            ro.observe(el);
        }

        // Fallback bij viewport resize
        const onResize = () => check();
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(id);
            window.removeEventListener("resize", onResize);
            ro?.disconnect();
        };
        // Re-run wanneer de beschrijving verandert
    }, [product?.description, showFull]);

    return (
        <div>
            <div
                ref={contentRef}
                className={`prose prose-sm text-sm text-gray-500 transition-[max-height] duration-500 ease-in-out mt-2 overflow-hidden relative`}
                style={{
                    maxHeight: showFull ? "2000px" : `${COLLAPSED_MAX}px`,
                    // Optionele fade alleen tonen als ingeklapt én er meer tekst is
                    WebkitMaskImage:
                        !showFull && needsTruncation
                            ? "linear-gradient(180deg, black 75%, transparent 100%)"
                            : "none",
                    maskImage:
                        !showFull && needsTruncation
                            ? "linear-gradient(180deg, black 75%, transparent 100%)"
                            : "none",
                }}
                // Let op: je beheert zelf de HTML; sanitizen indien nodig
                dangerouslySetInnerHTML={{ __html: product.description || "" }}
            />

            {needsTruncation && (
                <button
                    onClick={() => setShowFull((v) => !v)}
                    className="mt-2 text-sm text-secondary hover:underline"
                    aria-expanded={showFull}
                    aria-controls="product-description"
                >
                    {showFull ? "Lees minder" : "Lees meer"}
                </button>
            )}
        </div>
    );
};

export default ProductDescription