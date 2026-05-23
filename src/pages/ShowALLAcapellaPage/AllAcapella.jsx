import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { getTracksByType } from "../../services/servicesApi";
import AcapellasShimmer from "../../components/shimmer/AcapellasShimmer";

export default function AllAcapella() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    setLoading(true);
    getTracksByType(3) // TrackType 3 for Acapella
      .then((data) => setTracks(data))
      .catch((err) => console.error("Error loading Acapellas:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 text-white bg-hero-gradient min-h-screen">
      <div className="flex justify-between items-center">
        {/* <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">All Acapella Songs</h2> */}
        <h2 className="text-white text-2xl font-bold inline-flex items-center gap-3  mb-6">
          All Acapella Songs
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
        <AcapellasShimmer count={12} />
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
