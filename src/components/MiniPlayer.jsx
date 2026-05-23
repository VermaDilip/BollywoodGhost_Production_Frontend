// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
// import { useAudio } from "../context/AudioPlayerContext";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaMusic } from "react-icons/fa";

// export default function MiniPlayer() {
//     const { track, isPlaying, setIsPlaying } = useAudio();
//     if (!track) return null;

//     console.log("MiniPlayer Track Object:", track);


//     if (!track) return null;

//     return (
//         <AnimatePresence>
//             <motion.div
//                 key="mini-player"
//                 initial={{ y: 100, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: 100, opacity: 0 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//                 className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-50"
//             >
//                 <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl">
//                     <div className="flex items-center gap-3 px-4 py-2">
//                         {/* Track Cover */}
//                         <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/20 shadow">
//                             {track.cover ? (
//                                 <img
//                                     src={track.cover}
//                                     alt="Track"
//                                     className="w-full h-full object-cover"
//                                 />
//                             ) : (
//                                 <div className="bg-gray-800 w-full h-full flex items-center justify-center text-white text-xl">
//                                     <FaMusic />
//                                 </div>
//                             )}
//                         </div>

//                         {/* Info Section */}
//                         <div className="flex-1 overflow-hidden">
//                             {/* Mobile (Animated Name) */}
//                             <div className="block sm:hidden marquee-wrapper">
//                                 <div className="marquee-content text-white text-sm font-semibold">
//                                     <span className="px-4">
//                                         {track.title || "Untitled Track"}
//                                     </span>
//                                     <span className="px-4">
//                                         {track.title || "Untitled Track"}
//                                     </span>
//                                 </div>
//                             </div>


//                             {/* Desktop (Truncated Name) */}
//                             <p className="hidden sm:block text-white text-sm font-semibold truncate">
//                                 {track.title || "Untitled Track"}
//                             </p>

//                             {/* Artist and Type */}
//                             <p className="text-white text-xs opacity-80">
//                                 {track?.artistName || "Unknown Artist"}
//                             </p>
//                         </div>
//                     </div>

//                     {/* Audio Controls */}
//                     <AudioPlayer
//                         src={track.url}
//                         autoPlay
//                         showJumpControls={false}
//                         onPlay={() => setIsPlaying(true)}
//                         onPause={() => setIsPlaying(false)}
//                         layout="horizontal"
//                         customAdditionalControls={[]}
//                         customProgressBarSection={["PROGRESS_BAR"]}
//                         customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
//                         style={{
//                             background: "transparent",
//                             color: "white",
//                             boxShadow: "none",
//                             padding: "0 16px 8px",
//                         }}
//                         className="bg-transparent"
//                     />
//                 </div>
//             </motion.div>
//         </AnimatePresence>
//     );
// }


import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useAudio } from "../context/AudioPlayerContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaMusic } from "react-icons/fa";
import { useEffect } from "react";

export default function MiniPlayer() {
    const { track, isPlaying, setIsPlaying } = useAudio();

    useEffect(() => {
        if (track) {
            document.body.classList.add("miniplayer-visible");
        }

        return () => {
            document.body.classList.remove("miniplayer-visible");
        };
    }, [track]);

    if (!track) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="mini-player"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-50"
            >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl">
                    <div className="flex items-center gap-3 px-4 py-2">
                        {/* Track Cover */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/20 shadow">
                            {track.cover ? (
                                <img
                                    src={track.cover}
                                    alt="Track"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="bg-gray-800 w-full h-full flex items-center justify-center text-white text-xl">
                                    <FaMusic />
                                </div>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 overflow-hidden">
                            {/* Mobile (Animated Name) */}
                            <div className="block sm:hidden marquee-wrapper">
                                <div className="marquee-content text-white text-sm font-semibold">
                                    <span className="px-4">
                                        {track.title || "Untitled Track"}
                                    </span>
                                    <span className="px-4">
                                        {track.title || "Untitled Track"}
                                    </span>
                                </div>
                            </div>

                            {/* Desktop (Truncated Name) */}
                            <p className="hidden sm:block text-white text-sm font-semibold truncate">
                                {track.title || "Untitled Track"}
                            </p>

                            {/* Artist and Type */}
                            <p className="text-white text-xs opacity-80">
                                {track?.artistName || "Unknown Artist"}
                            </p>
                        </div>
                    </div>

                    {/* Audio Controls */}
                    <AudioPlayer
                        src={track.url}
                        autoPlay
                        showJumpControls={false}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        layout="horizontal"
                        customAdditionalControls={[]}
                        customProgressBarSection={["PROGRESS_BAR"]}
                        customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                        style={{
                            background: "transparent",
                            color: "white",
                            boxShadow: "none",
                            padding: "0 16px 8px",
                        }}
                        className="bg-transparent"
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
