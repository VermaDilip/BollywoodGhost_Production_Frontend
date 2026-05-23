import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import artisticon from "../assets/icon.png";

import ArtistGridShimmer from "./shimmer/ArtistGridShimmer";
import { getAllArtists } from "../services/servicesApi";
import "./ArtistGrid.css";

export default function ArtistGrid() {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    getAllArtists()
      .then((data) => {
        setArtists(data);
        setError(false);
      })
      .catch((err) => {
        console.error("Failed to fetch artists:", err);
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

  return (
    <div className="relative mb-10">
      <div className="flex justify-between items-center mb-4 px-4">
        {/* <h2 className="text-white text-2xl font-bold">Popular artists</h2> */}
        <h2 className="text-white text-2xl font-bold inline-flex items-center gap-3">
          Popular artists
          <span className="w-1 h-6 bg-red-500 rounded-sm"></span>
        </h2>
        <button
          onClick={() => navigate("/artists/all")}
          className="text-sm text-red-500  hover:text-red-600 hover:underline focus:outline-none"
        >
          Show All
        </button>
      </div>

      {/* Scroll Left Button */}
      {!loading && !error && artists.length > 0 && (
        <button onClick={scrollLeft} className="scroll-btn left-0" aria-label="Scroll Left">
          <FiChevronLeft size={24} />
        </button>
      )}

      {/* Artist Cards */}
      {loading ? (
        <ArtistGridShimmer />
      ) : error ? (
        <div className="text-center text-gray-400 py-10 px-4">
          Oops! Failed to load artists. Please try again later.
        </div>
      ) : artists.length === 0 ? (
        <div className="text-center text-gray-400 py-10 px-4">
          No popular artists found.
        </div>
      ) : (
        <div ref={containerRef} className="artist-scroll-container scrollbar-hide">
          {artists.map((artist) => (
            <div
              key={artist.artistId}
              className="artist-card cursor-pointer"
              onClick={() =>
                navigate(`/artist/${slugify(artist.artistName, { lower: true })}`)
              }
            >
              <div className="relative group">
                <img
                  // src={artist.artistPhoto}
                  src={`${process.env.REACT_APP_BASE_API_ARTIST_PHOTO_URL}/${artist.artistPhoto}`}
                  alt={artist.artistName}
                  className="artist-img rounded-xl"
                />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <img src={artisticon} alt="Play" className="w-10 h-10" />
                </div>
              </div>
              <h3 className="artist-name">{artist.artistName}</h3>
              <p className="text-gray-400 text-xs truncate">{artist.artistDetails}</p>
            </div>
          ))}
        </div>
      )}

      {/* Scroll Right Button */}
      {!loading && !error && artists.length > 0 && (
        <button onClick={scrollRight} className="scroll-btn right-0" aria-label="Scroll Right">
          <FiChevronRight size={24} />
        </button>
      )}
    </div>
  );
}
