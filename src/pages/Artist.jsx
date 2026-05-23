import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import slugify from "slugify";
import { MdLibraryMusic } from "react-icons/md";
import { format, formatDistanceToNow } from "date-fns";
import ArtistPageShimmer from "../components/shimmer/ArtistPageShimmer";
import { getAllArtists, getArtistById, getTracksByArtistId } from "../services/servicesApi";

export default function Artist() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const allArtists = await getAllArtists();

        const foundArtist = allArtists.find(
          (a) => slugify(a.artistName, { lower: true }) === slug
        );

        if (!foundArtist) {
          setLoading(false);
          return;
        }

        setArtist(foundArtist);

        const fetchedTracks = await getTracksByArtistId(foundArtist.artistId);
        setTracks(fetchedTracks || []);
      } catch (error) {
        console.error("Error loading artist data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [slug]);

  if (loading) return <ArtistPageShimmer />;
  if (!artist) return <div className="text-white p-4">Artist not found</div>;

  return (
    <div className="bg-hero-gradient text-white min-h-screen">
      {/* Artist Header */}
      <div className="p-4 sm:p-6 bg-fade-wrapper">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
          <img
            src={`${process.env.REACT_APP_BASE_API_ARTIST_PHOTO_URL}/${artist.artistPhoto}`}
            alt={artist.artistName}
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full shadow-md border-[2px] border-white/10"
          />
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white gradient-text drop-shadow-lg tracking-tight flex items-center gap-2">
              {artist.artistName}
              <MdVerified className="text-blue-500 text-xl sm:text-2xl" title="Verified" />
            </h1>

            <p className="mt-3 text-sm text-gray-300 bg-white/10 backdrop-blur-md p-3 sm:p-6 rounded-xl sm:rounded-2xl text-left border border-white/20 shadow-xl w-full">
              {artist.artistDetails || artist.genre}
            </p>
          </div>
        </div>
      </div>

      {/* Track Grid */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">All Tracks</h2>

        {tracks.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <MdLibraryMusic className="text-4xl text-white/30 mx-auto mb-2" />
            <p className="text-base sm:text-lg font-medium">
              No tracks found for this artist.
            </p>
            <p className="text-sm mt-2">
              Stay tuned — exciting content might be coming soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {tracks.map((track) => (
              <div
                key={track.trackId}
                onClick={() =>
                  navigate(`/watch/${slugify(track.trackName, { lower: true })}/${track.trackId}`)
                }
                className="cursor-pointer hover:bg-white/10 p-2 sm:p-3 rounded-lg transition duration-200"
              >
                <div className="aspect-square overflow-hidden rounded-lg shadow-md">
                  <img
                    src={track.trackPhoto}
                    alt={track.trackName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white font-semibold text-sm mt-2 sm:mt-3 truncate">
                  {track.trackName}
                </h3>
                {/* <p className="text-gray-400 text-xs">{track.releaseDate || "Track"}</p> */}
                 <div className="text-sm text-gray-400 font-medium mb-2 flex flex-wrap items-center gap-2">
                  <span>
                    {track.releaseDate
                      ? format(new Date(track.releaseDate), "MMM dd, yyyy")
                      : "Unknown"}
                  </span>
                  <span>•</span>
                  <span>{track?.playsCount || "0"} plays</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
