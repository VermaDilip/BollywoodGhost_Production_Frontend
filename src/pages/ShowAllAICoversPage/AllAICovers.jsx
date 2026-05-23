import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { getTracksByType } from "../../services/servicesApi";
import AiCoverShimmer from "../../components/shimmer/AiCoverShimmer";

export default function AllAICovers() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    setLoading(true);
    getTracksByType(2)
      .then((data) => setTracks(data))
      .catch((err) => console.error("Error loading AI Covers:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 text-white bg-hero-gradient min-h-screen">
      <div className="flex justify-between items-center">
        {/* <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">All AI Cover Songs</h2> */}
        <h2 className="text-white text-2xl font-bold inline-flex items-center gap-3 mb-6">
          All AI Cover Songs
          <span className="w-1 h-6 bg-red-500 rounded-sm"></span>
        </h2>
        {/* <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 hover:text-white hover:underline"
        >
          ← Back
        </button> */}
      </div>

      {loading ? (
        <AiCoverShimmer count={12} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {tracks.map((track) => (
            <div
              key={track.trackId}
              onClick={() =>
                navigate(
                  `/watch/${slugify(track.trackName, { lower: true })}/${track.trackId}`
                )
              }
              className="cursor-pointer hover:bg-white/10 p-2 rounded-lg transition duration-200"
            >
              <div className="aspect-square overflow-hidden rounded-lg shadow-md">
                <img
                  src={track.trackPhoto}
                  alt={track.trackName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-white font-semibold text-sm mt-2 truncate">
                {track.trackName}
              </h3>
              <p className="text-gray-400 text-xs line-clamp-2">
                {track.trackDetails?.split("\r\n\r\n")[1] || ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
