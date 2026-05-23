/* global APP */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTracksByType } from "../services/servicesApi";
import { motion, AnimatePresence } from "framer-motion";
import slugify from "slugify";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function AiCoverLanding() {
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Original fetch without sorting: type 2 = ai cover

  // useEffect(() => {
  //   getTracksByType(2)
  //     .then((data) => setTracks(data))
  //     .catch((err) => console.error("Error:", err))
  //     .finally(() => setLoading(false));
  // }, []);

  // Updated fetch with sorting by created_at in descending order: type 1 = orignal cover
  useEffect(() => {
    getTracksByType(1)
      .then((data) => {
        const sortedTracks = [...data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setTracks(sortedTracks);
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (tracks.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tracks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tracks]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const currentTrack = tracks[currentIndex];

  return (
    <div className="relative w-full sm:h-[92vh] overflow-hidden bg-black text-white mb-6">
      {loading ? (
        <div className="h-full flex items-center justify-center">Loading...</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack.trackId}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* 🖥 Desktop View */}
            <div className="hidden sm:block absolute inset-0 bg-cover" style={{ backgroundImage: `url(${currentTrack.trackCover})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              <div className="absolute bottom-10 left-6 z-20">
                <h1 className="text-2xl sm:text-4xl font-bold drop-shadow-md mb-2">
                  {currentTrack.trackName}
                </h1>
                <button
                  onClick={() => {
                    const url = `/watch/${slugify(currentTrack.trackName, {
                      lower: true,
                    })}/${currentTrack.trackId}`;
                    if (typeof APP !== "undefined" && typeof APP.CallSub === "function") {
                      APP.CallSub("Js_handleLink", true, url);
                    } else {
                      navigate(url);
                    }
                  }}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-lg transition"
                >
                  Play Now
                </button>
              </div>
            </div>
            {/* 📱 Mobile View - Overlay Style Like Screenshot */}
            <div
              className="block sm:hidden w-[100%] mx-auto overflow-hidden shadow-xl relative z-20"
              style={{
                backgroundImage: `url(${currentTrack.trackCover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "220px", // Adjust as needed
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              {/* Content Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                <h2 className="text-base font-bold leading-snug mb-2 drop-shadow">
                  {currentTrack.trackName}
                </h2>
                <button
                  onClick={() => {
                    const url = `/watch/${slugify(currentTrack.trackName, {
                      lower: true,
                    })}/${currentTrack.trackId}`;
                    if (typeof APP !== "undefined" && typeof APP.CallSub === "function") {
                      APP.CallSub("Js_handleLink", true, url);
                    } else {
                      navigate(url);
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full shadow-lg transition text-sm"
                >
                  Play Now
                </button>
              </div>
            </div>


          </motion.div>
        </AnimatePresence>
      )}

      {/* Navigation Arrows - only for Desktop */}
      {!loading && (
        <>
          <button
            onClick={prevSlide}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 p-2 rounded-full"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 p-2 rounded-full"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}
