import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrackById, getSignedEmbedUrl, updatePlayCount, updateLikeCount } from "../services/servicesApi";
import VideoPlayer from "../components/VideoPlayer";
import RelatedAudios from "../components/RelatedAudios";
import { FiThumbsUp } from "react-icons/fi";
import { FaThumbsUp } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa"; // Optional spinner icon
import VideoPlayerShimmer from "../components/shimmer/VideoPlayerShimmer";
import RelatedAudiosShimmer from "../components/shimmer/RelatedAudiosShimmer";
import { format, formatDistanceToNow } from "date-fns";
import Logo from "../assets/BollywoodghostLogo2.png";
import App_ss from "../assets/App.png";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { FaPlay } from "react-icons/fa";
import SeoMeta from "../components/SeoMeta";
import { useAudio } from "../context/AudioPlayerContext";

import { SiGoogleplay } from "react-icons/si";



export default function Watch() {
  const { slug, id } = useParams();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [animateLike, setAnimateLike] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likesLoading, setLikesLoading] = useState(true); // new state
  const PLAYSTORE_URL = process.env.REACT_APP_PLAYSTORE_URL;

  const navigate = useNavigate();

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadType, setDownloadType] = useState(null);
  const [isClosingModal, setIsClosingModal] = useState(false);

  const { setTrack: setGlobalAudioTrack } = useAudio(); // ✅ Rename to avoid conflict



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setLikesLoading(true); // start loader

    const likedTracks = JSON.parse(localStorage.getItem("likedTracks")) || [];
    setHasLiked(likedTracks.includes(id));

    const loadTrack = async () => {
      try {
        const found = await getTrackById(id);

        if (found?.trackId) {
          await updatePlayCount(found.trackId);
        }

        if (found?.embedKey) {
          const signedUrl = await getSignedEmbedUrl(found.embedKey);
          found.signedTrackUrl = signedUrl;
        }

        setTrack(found || null);
        setLikes(found?.likesCount || 0);

        // ✅ Set global player
        if (found?.signedTrackUrl) {
          setGlobalAudioTrack({
            title: found.trackName,
            url: found.signedTrackUrl,
            cover: found.trackPhoto,
            artistName: found.artist?.artistName,
            artistPhoto: found.artist?.artistPhoto?.startsWith("http")
              ? found.artist.artistPhoto
              : `${process.env.REACT_APP_BASE_API_ARTIST_PHOTO_URL}/${found.artist.artistPhoto}`,
          });
        }
      } catch (error) {
        console.error("Error loading track:", error.message);
        setTrack(null);
      } finally {
        setLoading(false);
        setLikesLoading(false);
      }
    };

    window.scrollTo(0, 0);
    loadTrack();
  }, [id, setGlobalAudioTrack]);


  // Close modal with animation
  const closeModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setShowDownloadModal(false);
      setIsClosingModal(false);
    }, 300); // duration must match the animation
  };


  const handleLike = () => {
    if (hasLiked) return;

    // Instantly update UI
    setLikes((prev) => prev + 1);
    setHasLiked(true);
    setAnimateLike(true);
    setTimeout(() => setAnimateLike(false), 300);

    // Store in localStorage
    const likedTracks = JSON.parse(localStorage.getItem("likedTracks")) || [];
    likedTracks.push(id);
    localStorage.setItem("likedTracks", JSON.stringify(likedTracks));

    // Fire-and-forget API call (no await)
    updateLikeCount(id).catch((err) => {
      console.error("Like API failed silently:", err.message);
    });
  };


  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row gap-6 p-4 bg-hero-gradient text-white">
        <div className="lg:w-2/3">
          <VideoPlayerShimmer />
        </div>
        <div className="lg:w-1/3">
          <RelatedAudiosShimmer count={6} />
        </div>
      </div>
    );
  }

  if (!track) {
    return <div className="text-white p-4">Track not found.</div>;
  }

  return (
    <><>
      <SeoMeta
        title={`Listen to ${track.trackName} | BollywoodGhost`}
        description={track.trackDetails?.substring(0, 160) || "Discover amazing AI-generated tracks."}
        image={
          track.trackPhoto?.startsWith("http")
            ? track.trackPhoto
            : `https://bollywoodghost.com/media/${track.trackPhoto}`
        }
        keywords={`AI Music, Bollywood, ${track.trackName}, ${track.artist?.artistName}`}
      />

    </><div className="flex flex-col lg:flex-row gap-6 p-4 bg-hero-gradient text-white">
        <div className="lg:w-2/3">
          {loading || likesLoading ? (
            <VideoPlayerShimmer />
          ) : (
            <>
              <VideoPlayer
                key={track.trackId}
                video={{
                  type: "audio",
                  title: track.trackName,
                  thumbnail: track.trackPhoto,
                  coverImage: track.trackCover,
                  track_url: track.signedTrackUrl ||
                    `https://bollywoodghost.com/media/${track.embedKey}`,
                  embedId: track.embedKey,
                  versions: (track.relatedTracks || []).map((related) => ({
                    name: related.artist?.artistName || "Unknown Artist",
                    profile: related.artist?.artistPhoto?.startsWith("http")
                      ? related.artist.artistPhoto
                      : `${process.env.REACT_APP_BASE_API_ARTIST_PHOTO_URL}/${related.artist.artistPhoto}`,
                    typeName: related.typeName || "",
                    trackId: related.trackId,
                    trackName: related.trackName,
                  })),
                }} />

              <div>
                <h2 className="text-xl font-semibold mb-2">{track.trackName}</h2>
              </div>

              <div className="flex justify-between items-center mt-2 mb-4">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    if (track.artist?.artistName) {
                      navigate(`/artist/${slugify(track.artist.artistName, { lower: true })}`);
                    }
                  }}
                >
                  <img
                    src={track.artist?.artistPhoto?.startsWith("http")
                      ? track.artist.artistPhoto
                      : `${process.env.REACT_APP_BASE_API_ARTIST_PHOTO_URL}/${track.artist.artistPhoto}`}
                    alt={track.artist?.artistName}
                    className="w-10 h-10 rounded-full object-cover" />
                  <span className="text-sm font-medium text-white opacity-90 flex items-center gap-1">
                    {track.artist?.artistName || "Unknown Artist"}
                    <MdVerified className="text-blue-500 text-base" title="Verified" />
                  </span>
                </div>


                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm transition bg-white/10 hover:bg-white/20 ${animateLike ? "animate-bounce" : ""}`}
                  >
                    {/* Only the icon changes visually */}
                    {hasLiked ? (
                      <FaThumbsUp size={16} className="text-white" />
                    ) : (
                      <FiThumbsUp size={16} className="text-white" />
                    )}

                    {likesLoading ? (
                      <FaSpinner className="animate-spin ml-2 text-white" size={14} />
                    ) : (
                      <span>{likes}</span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setDownloadType(Number(track.trackType));
                      setShowDownloadModal(true);
                    }}
                    className="flex items-center gap-1 text-white font-medium bg-red-600 px-3 py-1 rounded-full text-sm hover:bg-red-700 transition duration-200"
                  >
                    <FiDownload className="text-base animate-bounce" />
                    <span className="">
                      Download
                    </span>
                  </button>


                </div>
              </div>

              <div className="mt-4 bg-title_description p-4 rounded-lg">
                <div className="text-sm text-gray-400 font-medium mb-2 flex flex-wrap items-center gap-2">
                  <span>
                    Released{" "}
                    {showFullDesc
                      ? format(new Date(track.releaseDate), "MMM d, yyyy")
                      : formatDistanceToNow(new Date(track.releaseDate), { addSuffix: true })}
                  </span>
                  <span>•</span>
                  <span>{track?.playsCount || "0"} plays</span>
                </div>


                <div
                  className={`text-gray-300 text-sm transition-all duration-300 whitespace-pre-wrap ${showFullDesc ? "" : "line-clamp-3"}`}
                  dangerouslySetInnerHTML={{
                    __html: track.trackDetails
                      .replace(/\n/g, "<br/>")
                      .replace(/#(\w+)/g, '<span class="text-blue-400">#$1</span>'),
                  }}
                ></div>

                {track.trackDetails?.length > 150 && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="mt-2 text-blue-400 text-sm hover:underline"
                  >
                    {showFullDesc ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        {showDownloadModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2"
            onClick={closeModal}
          >
            <div
              className={`bg-[#363434] text-white p-6 rounded-xl w-full max-w-2xl relative shadow-xl transition-all duration-300 overflow-hidden relative  shine-effect ${isClosingModal ? "animate-fade-out-down" : "animate-fade-in-up"}`}
              onClick={(e) => e.stopPropagation()}
            >

              <button
                onClick={closeModal}
                className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>

             
                <div className="text-left flex flex-col md:flex-row items-center gap-6">
                  {/* App Screenshot (mobile first) */}
                  <div className="order-1 md:order-2 flex-1 flex justify-center">
                    <img
                      src={App_ss}
                      alt="App Screenshot"
                      className="w-1/2 max-w-xs rounded-lg shadow-lg" />
                  </div>

                  {/* Text + Button */}
                  <div className="order-2 md:order-1 flex-1 w-full">
                    <div className="flex justify-center mb-4">
                      <div className="bg-[#363434] bg-opacity-80 backdrop-blur-sm px-4 py-2 rounded-xl">
                        <img
                          src={Logo}
                          alt="BollywoodGhost Logo"
                          className="h-12 w-auto object-contain" />
                      </div>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
                      Install App to Unlock Free Downloads
                    </h2>

                    <a
                      href={PLAYSTORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 shadow-md mt-4 md:mt-0"
                    >
                      <SiGoogleplay size={22} />
                      Go to Play Store
                    </a>
                  </div>
                </div>
              
            </div>
          </div>
        )}
        <div className="lg:w-1/3">
          <RelatedAudios />
        </div>
      </div></>
  );
}
