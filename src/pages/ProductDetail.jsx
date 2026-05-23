import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductBySlug } from "../services/servicesApi";
import { SiGoogleplay } from "react-icons/si";
import Logo from "../assets/BollywoodghostLogo2.png";
import App_ss from "../assets/App.png";
import { FiDownload } from "react-icons/fi";
import ProductDetailShimmer from "../components/shimmer/ProductDetailShimmer";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const PLAYSTORE_URL = process.env.REACT_APP_PLAYSTORE_URL;

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  const closeModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setShowDownloadModal(false);
      setIsClosingModal(false);
    }, 300);
  };

if (loading) return <ProductDetailShimmer />;
  if (!product) return <div className="text-center text-red-400 mt-10">Product not found.</div>;

  return (
    <div className="min-h-screen bg-hero-gradient text-white px-4 py-10 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto bg-hero-gradient backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* LEFT - IMAGE */}
        <div className="flex justify-center items-center">
          <img
            src={product.images?.[0]?.src}
            alt={product.images?.[0]?.alt || product.name}
            className="w-full max-w-md rounded-xl border border-white/10 shadow-xl"
          />
        </div>

        {/* RIGHT - DETAILS */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold mb-4">{product.name}</h1>

            {product.short_description && (
              <div
                className="text-sm text-gray-200 mb-6 space-y-3"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {product.description && (
              <div
                className="text-base text-gray-300 mb-6"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            {product.tags?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-2 uppercase text-gray-400">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-white/10 px-3 py-1 rounded-full text-xs text-white hover:bg-white/20 transition"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Download Button */}
          <div className="mt-4">
            <button
              onClick={() => setShowDownloadModal(true)}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-lg transition shadow-md"
            >
              <FiDownload className="text-base animate-bounce" /> Download
            </button>
          </div>
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2"
          onClick={closeModal}
        >
          <div
            className={`bg-[#363434] text-white p-6 rounded-xl w-full max-w-2xl relative shadow-xl transition-all duration-300 overflow-hidden ${
              isClosingModal ? "animate-fade-out-down" : "animate-fade-in-up"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>

            <div className="text-left flex flex-col md:flex-row items-center gap-6">
              <div className="order-1 md:order-2 flex-1 flex justify-center">
                <img
                  src={App_ss}
                  alt="App Screenshot"
                  className="w-1/2 max-w-xs rounded-lg shadow-lg"
                />
              </div>

              <div className="order-2 md:order-1 flex-1 w-full">
                <div className="flex justify-center mb-4">
                  <div className="bg-[#363434] bg-opacity-80 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <img
                      src={Logo}
                      alt="BollywoodGhost Logo"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                  Install App to Unlock Free Downloads
                </h2>

                {product.downloads?.[0]?.file && (
                  <a
                    href={PLAYSTORE_URL}
                     target="_blank"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 shadow-md mt-4 md:mt-0"
                  >
                    <SiGoogleplay size={22} />
                    Go to Play Store
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
