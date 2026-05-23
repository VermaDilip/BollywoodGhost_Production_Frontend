import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { fetchTop50ProductSummaries } from "../../services/servicesApi";
import AllProductsShimmer from "../../components/shimmer/AllProductsShimmer";


export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const LIMIT = 10;

    const observer = useRef();
    const lastProductRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMoreProducts();
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const loadMoreProducts = async () => {
        setLoading(true);
        try {
            const newProducts = await fetchTop50ProductSummaries(offset, LIMIT);
            setProducts((prev) => [...prev, ...newProducts]);
            setOffset((prev) => prev + LIMIT);
            if (newProducts.length < LIMIT) setHasMore(false);
        } catch (error) {
            console.error("Failed to load more products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMoreProducts();
    }, []);

    const bgColors = [
        "bg-pink-600",
        "bg-purple-600",
        "bg-green-700",
        "bg-blue-700",
        "bg-red-600",
        "bg-yellow-500",
        "bg-indigo-600",
        "bg-emerald-600",
        "bg-orange-500",
        "bg-teal-600",
        "bg-rose-600",
        "bg-cyan-600",
        "bg-lime-600",
        "bg-fuchsia-600",
        "bg-violet-600",
        "bg-amber-600",
        "bg-sky-600",
        "bg-blue-900",
        "bg-green-800",
        "bg-red-700"
    ];


    return (
        <div className="min-h-screen bg-hero-gradient text-white px-4 py-6 sm:px-6 md:px-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 inline-flex items-center gap-3">
                All Products
                <span className="w-1 h-6 bg-red-500 rounded-sm"></span>
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {products.map((product, index) => {
                    const bgColor = bgColors[index % bgColors.length];
                    const isLast = index === products.length - 1;

                    return (
                        <div
                            ref={isLast ? lastProductRef : null}
                            key={product.id}
                            onClick={() =>
                                navigate(`/product/${slugify(product.slug, { lower: true })}`)
                            }
                            className={`relative group ${bgColor} rounded-xl p-5 h-48 sm:h-56 md:h-60 overflow-hidden cursor-pointer transition-transform hover:scale-105`}
                        >
                            <h2 className="text-white text-base sm:text-lg font-bold z-10 relative">
                                {product.name}
                            </h2>
                            <img
                                src={product.images[0]?.src}
                                alt={product.images[0]?.alt || product.name}
                                className="absolute bottom-[-16px] right-[-16px] w-24 sm:w-28 md:w-32 lg:w-36 transform rotate-[20deg] shadow-lg z-0"
                                loading="lazy"
                            />
                        </div>
                    );
                })}
            </div>


            {loading && (
                <div className="mt-6">
                    <AllProductsShimmer count={8} />
                </div>
            )}

        </div>
    );
}
