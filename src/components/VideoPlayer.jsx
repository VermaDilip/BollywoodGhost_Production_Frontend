import React, { useRef, useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { BarLoader } from "react-spinners";
import "./VideoPlayer.css";

export default function VideoPlayer({ video }) {
  const navigate = useNavigate();
  const versionListRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [versionLoading, setVersionLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const scrollLeft = () => {
    versionListRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    versionListRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  if (video.type === "audio") {
    return (
      <div className="w-full mb-6">
        {/* Thumbnail with background blur */}
        <div className="w-full aspect-video relative rounded-xl overflow-hidden min-h-[400px] sm:min-h-[300px]">
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-20 transition-all duration-300"
            style={{
              backgroundImage: `url(${isDesktop && video.coverImage ? video.coverImage : video.thumbnail})`,
            }}
          ></div>


          {/* Center Card */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="bg-white/10 backdrop-blur-md p-3 sm:p-6 rounded-xl sm:rounded-2xl text-center border border-white/20 shadow-xl w-full max-w-[90%] sm:max-w-md mx-auto">
              <h3 className="text-white text-xs sm:text-sm font-semibold opacity-80 mb-1">
                BollywoodGhost
              </h3>
              <div className="flex justify-center mb-4">
                <img
                  src={video.thumbnail}
                  alt="Thumbnail"
                  className="w-20 h-20 sm:w-36 sm:h-36 rounded-full border-4 border-white object-cover shadow-xl rotate-cd"
                />
              </div>

              <h2 className="text-white text-sm sm:text-lg font-bold mb-1">
                {video.title.length > 60
                  ? `${video.title.slice(0, 60)}...`
                  : video.title}
              </h2>

              <p className="text-white text-xs sm:text-sm mb-4 opacity-70">
                Switch the voice to
              </p>

              {/* Version List */}
              <div className="relative mt-4">
                {/* Left scroll */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 p-1 rounded-full text-white backdrop-blur-md"
                >
                  <FiChevronLeft size={18} />
                </button>

                {versionLoading && (
                  <div className="px-4 py-2 flex justify-center items-center">
                    <BarLoader color="white" width={150} height={3} />
                  </div>
                )}


                <div
                  ref={versionListRef}
                  className={`flex gap-4 px-6 py-2 scrollbar-hide ${video.versions?.length <= 2
                      ? "justify-center"
                      : "overflow-x-auto pl-1 pr-6"
                    }`}
                >
                  {video.versions?.map((artist, index) => (
                    <div
                      key={index}
                      className="group relative flex-shrink-0 w-24 text-center cursor-pointer"
                      onClick={() => {
                        if (artist.trackId && artist.trackName) {
                          setVersionLoading(true);
                          setTimeout(() => {
                            navigate(
                              `/watch/${slugify(artist.trackName, { lower: true })}/${artist.trackId}`
                            );
                          }, 2000);
                        }
                      }}
                    >
                      <div className="relative">
                        <img
                          src={artist.profile}
                          alt={artist.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-md mx-auto"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <FaPlay size={14} className="text-white" />
                        </div>
                      </div>

                      <p className="text-white text-[11px] mt-2 truncate">{artist.name}</p>
                      <p className="text-white text-[10px] truncate">
                        {artist.typeName || "Version"}
                      </p>
                    </div>
                  ))}
                </div>



                {/* Right scroll */}
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 p-1 rounded-full text-white backdrop-blur-md"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Player (OUTSIDE the thumbnail section) */}
        {/* <div className="w-full mt-3 bg-black bg-opacity-60 rounded-xl overflow-hidden">
          <AudioPlayer
            autoPlay
            src={video.track_url}
            showJumpControls={false}
            layout="horizontal"
            customAdditionalControls={[]}
            style={{
              background: "transparent",
              boxShadow: "none",
              color: "white",
              padding: "0 8px",
              maxWidth: "100%",
            }}
            className="max-w-full"
          />
        </div> */}
      </div>
    );
  }

  // If it's a video type
  return (
    <div
      className="w-full aspect-video mb-4 relative rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(${video.thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <iframe
        src={`https://go.screenpal.com/player/${video.embedId}?width=100%&height=100%&ff=1&title=0&autoplay=1`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        scrolling="no"
        allow="autoplay"
        allowFullScreen
        title={video.title}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
