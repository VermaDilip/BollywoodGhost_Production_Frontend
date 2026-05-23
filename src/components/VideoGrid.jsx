import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import VideoGridShimmer from "../components/shimmer/VideoGridShimmer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getTracksByType } from "../services/servicesApi";
import "./VideoGrid.css"; // Optional styles

export default function VideoGrid() {
  const [videos, setVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const loader = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getTracksByType(1) // Track type 1 for popular songs
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching tracks:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        setVisibleCount((prev) => prev + 4);
      }
    },
    [loading]
  );

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 px-4">
        {/* <h2 className="text-white text-2xl font-bold">Popular Songs</h2> */}
        <h2 className="text-white text-2xl font-bold inline-flex items-center gap-3">
          Popular Songs
          <span className="w-1 h-6 bg-red-500 rounded-sm"></span>
        </h2>
        <button
          onClick={() => navigate("/latest-songs/all")}
          className="text-sm text-red-500  hover:text-red-600 hover:underline focus:outline-none"
        >
          Show All
        </button>
      </div>

      {loading ? (
        <VideoGridShimmer count={visibleCount} />
      ) : (
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 m-1 shadow"
            aria-label="Scroll Left"
          >
            <FiChevronLeft size={24} />
          </button>

          <div
            ref={containerRef}
            className="scrollbar-hide flex overflow-x-auto gap-4 sm:gap-6 px-4 sm:px-6 pb-6 scroll-smooth"
            style={{ scrollBehavior: "smooth", flexWrap: "nowrap" }}
          >
            {videos.slice(0, visibleCount).map((video) => (
              <div
                key={video.trackId}
                onClick={() =>
                  navigate(
                    `/watch/${slugify(video.trackName, { lower: true })}/${video.trackId}`
                  )
                }
                className="w-[180px] sm:w-[250px] flex-shrink-0 cursor-pointer hover:bg-white/10 p-2 sm:p-3 rounded-lg transition duration-200"
              >
                <div className="aspect-square overflow-hidden rounded-lg shadow-md">
                  <img
                    src={video.trackPhoto}
                    alt={video.trackName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-white font-semibold text-sm mt-2 truncate">
                  {video.trackName}
                </h3>
                 <p className="text-gray-400 text-xs line-clamp-2">
                  {video.trackDetails?.split("\r\n\r\n")[1] || ""}
                </p>
              </div>
            ))}
            <div ref={loader}></div>
          </div>

          <button
            onClick={scrollRight}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 m-1 shadow"
            aria-label="Scroll Right"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
}
