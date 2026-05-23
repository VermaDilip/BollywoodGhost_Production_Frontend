import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTopVideos } from "../services/servicesApi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import slugify from "slugify";
import TopVideosShimmer from "./shimmer/TopVideosShimmer";

export default function TopVideosCarousel() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTopVideos()
      .then((allVideos) => {
        setVideos(allVideos.slice(0, 10));
        setError(false);
      })
      .catch((err) => {
        console.error("Error loading videos:", err.message);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      const container = containerRef.current;
      if (container) {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (Math.ceil(container.scrollLeft) >= maxScrollLeft) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 250, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="mb-6">
      {/* <h2 className="text-white text-2xl font-bold mb-4 ml-4">Trending Videos</h2> */}
      <h2 className="text-white text-2xl font-bold  mb-4 ml-4 inline-flex items-center gap-3">
  Trending Videos
  <span className="w-1 h-6 bg-red-500 rounded-sm"></span>
</h2>


      <div className="relative flex items-center">
        {/* Left Button: hidden on mobile */}
        <button
          onClick={scrollLeft}
          className="hidden sm:flex absolute left-0 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 m-1 shadow"
          aria-label="Scroll Left"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Content */}
        {loading ? (
          <TopVideosShimmer />
        ) : error ? (
          <div className="text-center w-full text-gray-400 px-4 py-8">
            Oops! Unable to load videos. Please try again later.
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center w-full text-gray-400 px-4 py-8">
            No trending videos found.
          </div>
        ) : (
          <div
            ref={containerRef}
            className="flex overflow-x-auto space-x-4 sm:space-x-6 scrollbar-hide px-4 sm:px-12"
            style={{ scrollBehavior: "smooth" }}
          >
            {videos.map((video) => (
              <div
                key={video.id}
                onClick={() =>
                  navigate(`/watch/${slugify(video.title, { lower: true })}/${video.id}`)
                }
                className="w-[180px] sm:w-[250px] cursor-pointer flex-shrink-0"
              >
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-32 sm:h-36 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-2 px-1">
                  <h3 className="text-white text-sm font-semibold truncate">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Right Button: hidden on mobile */}
        {!loading && !error && videos.length > 0 && (
          <button
            onClick={scrollRight}
            className="hidden sm:flex absolute right-0 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 m-1 shadow"
            aria-label="Scroll Right"
          >
            <FiChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
