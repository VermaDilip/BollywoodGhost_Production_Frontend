import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { getTracksByType } from "../../services/servicesApi";
import VideoGridShimmer from "../../components/shimmer/VideoGridShimmer";

export default function AllLatestSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    getTracksByType(1)
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error loading songs:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 text-white bg-hero-gradient">
      {/* <h2 className="text-2xl font-bold mb-6">All Popular Songs</h2> */}
      <h2 className="text-white text-2xl font-bold inline-flex items-center gap-3  mb-6">
        All Popular Songs
        <span className="w-1 h-6 bg-red-500 rounded-sm"></span>
      </h2>

      {loading ? (
        // <p className="text-gray-400">Loading...</p>
        <VideoGridShimmer />
      ) : songs.length === 0 ? (
        <p className="text-gray-400">No songs found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {songs.map((song) => (
            <div
              key={song.trackId}
              onClick={() =>
                navigate(
                  `/watch/${slugify(song.trackName, { lower: true })}/${song.trackId}`
                )
              }
              className="cursor-pointer hover:bg-white/10 p-2 rounded-lg transition duration-150"
            >
              <div className="aspect-square overflow-hidden rounded-md shadow">
                <img
                  src={song.trackPhoto}
                  alt={song.trackName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-sm font-medium truncate">{song.trackName}</p>
              <p className="text-gray-400 text-xs line-clamp-2">
                {song.trackDetails?.split("\r\n\r\n")[1] || ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
