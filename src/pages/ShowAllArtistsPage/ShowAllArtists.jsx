import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { getAllArtists } from "../../services/servicesApi";
import ShowAllArtistShimmer from "../../components/shimmer/ShowAllArtistShimmer";
import artisticon from "../../assets/icon.png";

export default function ShowAllArtists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getAllArtists();
        setArtists(data);
      } catch (err) {
        console.error("Error fetching artists:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  if (loading) return <ShowAllArtistShimmer />;

  return (
    <div className="text-white bg-hero-gradient min-h-screen px-4 py-6 sm:px-6 md:px-10">
      {/* <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">All Artists</h2> */}
      <h2 className="text-white text-2xl font-bold inline-flex items-center gap-3  mb-6">
        All Artists
        <span className="w-1 h-6 bg-red-500 rounded-sm"></span>
      </h2>

      {artists.length === 0 ? (
        <p className="text-gray-400 text-center">No artists found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
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
                  src={`${process.env.REACT_APP_BASE_API_ARTIST_PHOTO_URL}/${artist.artistPhoto}`}
                  alt={artist.artistName}
                  className="artist-img" // This should keep circular styling
                />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <img src={artisticon} alt="Play" className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
              </div>
              <h3 className="artist-name mt-2 truncate">{artist.artistName}</h3>
              <p className="text-gray-400 text-xs truncate">{artist.artistDetails}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
