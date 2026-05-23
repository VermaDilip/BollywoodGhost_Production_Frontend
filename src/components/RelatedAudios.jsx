// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import slugify from "slugify";
// import { getTracksByType } from "../services/servicesApi";
// import RelatedAudiosShimmer from "../components/shimmer/RelatedAudiosShimmer";

// export default function RelatedAudios() {
//   const { videoId } = useParams(); // Current playing trackId
//   const navigate = useNavigate();

//   const [relatedTracks, setRelatedTracks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const types = [1, 2, 3, 4];
//     const firstType = types[Math.floor(Math.random() * types.length)];
//     let secondType;
//     do {
//       secondType = types[Math.floor(Math.random() * types.length)];
//     } while (secondType === firstType);

//     setLoading(true);

//     Promise.all([getTracksByType(firstType), getTracksByType(secondType)])
//       .then(([res1, res2]) => {
//         const combined = [...res1, ...res2];

//         // Remove duplicates
//         const uniqueTracks = Array.from(
//           new Map(combined.map((t) => [t.trackId, t])).values()
//         );

//         // Optionally exclude the current videoId on first load
//         const filtered = uniqueTracks.filter(
//           (track) => track.trackId !== parseInt(videoId)
//         );

//         setRelatedTracks(filtered.slice(0, 14));
//       })
//       .catch((err) => console.error("Error loading related audios:", err))
//       .finally(() => setLoading(false));
//   }, []); // Only run once on mount

//   if (loading) return <RelatedAudiosShimmer count={14} />;

//   return (
//     <div className="text-white">
//       <div className="grid grid-cols-2 gap-4">
//         {relatedTracks.map((track) => (
//           <div
//             key={track.trackId}
//             onClick={() => {
//               // Remove clicked track
//               setRelatedTracks((prev) =>
//                 prev.filter((t) => t.trackId !== track.trackId)
//               );

//               // Navigate to new video
//               navigate(
//                 `/watch/${slugify(track.trackName, { lower: true })}/${track.trackId}`
//               );
//             }}
//             className="cursor-pointer hover:bg-white/10 p-2 rounded-lg transition duration-150"
//           >
//             <div className="aspect-square overflow-hidden rounded-md shadow">
//               <img
//                 src={track.trackPhoto}
//                 alt={track.trackName}
//                 className="w-full h-full object-cover"
//                 loading="lazy"
//               />
//             </div>
//             <p className="text-sm font-medium mt-1 truncate">
//               {track.trackName}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import slugify from "slugify";
import { getTracksByType } from "../services/servicesApi";
import RelatedAudiosShimmer from "../components/shimmer/RelatedAudiosShimmer";
import { format, formatDistanceToNow } from "date-fns";
import { FiLoader } from "react-icons/fi"; // Spinner icon

export default function RelatedAudios() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [relatedTracks, setRelatedTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTrackId, setLoadingTrackId] = useState(null); // Track being clicked

  useEffect(() => {
    const types = [1, 2, 3, 4];
    const firstType = types[Math.floor(Math.random() * types.length)];
    let secondType;
    do {
      secondType = types[Math.floor(Math.random() * types.length)];
    } while (secondType === firstType);

    setLoading(true);

    Promise.all([getTracksByType(firstType), getTracksByType(secondType)])
      .then(([res1, res2]) => {
        const combined = [...res1, ...res2];
        const uniqueTracks = Array.from(
          new Map(combined.map((t) => [t.trackId, t])).values()
        );

        const filtered = uniqueTracks.filter(
          (track) => track.trackId !== parseInt(videoId)
        );

        setRelatedTracks(filtered.slice(0, 50));
      })
      .catch((err) => console.error("Error loading related audios:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (track) => {
    setLoadingTrackId(track.trackId);

    setTimeout(() => {
      setRelatedTracks((prev) =>
        prev.filter((t) => t.trackId !== track.trackId)
      );
      navigate(
        `/watch/${slugify(track.trackName, { lower: true })}/${track.trackId}`
      );
    }, 1000);
  };

  if (loading) return <RelatedAudiosShimmer count={14} />;

  return (
    <div className="text-white">
      <div className="grid grid-cols-2 gap-4">
        {relatedTracks.map((track) => (
          <div
            key={track.trackId}
            onClick={() => handleClick(track)}
            className="relative cursor-pointer hover:bg-white/10 p-2 rounded-lg transition duration-150"
          >
            <div className="aspect-square overflow-hidden rounded-md shadow relative">
              <img
                src={track.trackPhoto}
                alt={track.trackName}
                className={`w-full h-full object-cover ${loadingTrackId === track.trackId ? "opacity-40" : ""
                  }`}
                loading="lazy"
              />
              {loadingTrackId === track.trackId && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiLoader className="animate-spin text-white text-3xl" />
                </div>
              )}
            </div>
            <p className="text-sm font-medium mt-1 truncate">
              {track.trackName}
            </p>
            <div className="text-sm text-gray-400 font-medium mb-2 flex flex-wrap items-center gap-2">
              <span>
                {track.releaseDate
                  ? formatDistanceToNow(new Date(track.releaseDate), { addSuffix: true })
                  : "Unknown"}
              </span>
              <span>•</span>
              <span>{track?.playsCount || "0"} plays</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



//youtube style feed

// import { useEffect, useState } from "react";
// import { getTracksByType } from "../services/servicesApi";
// import slugify from "slugify";
// import { useNavigate } from "react-router-dom";

// export default function RelatedAudios({ videoId }) {
//   const [related, setRelated] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const randomType = [1, 2, 3, 4][Math.floor(Math.random() * 4)];

//     getTracksByType(randomType)
//       .then((data) => {
//         const filtered = data.filter((track) => track.trackId !== videoId);
//         setRelated(filtered.slice(0, 10));
//       })
//       .catch((err) => {
//         console.error("Error fetching related audios:", err.message);
//       });
//   }, [videoId]);

//   return (
//     <div className="text-white">
//       {/* <h3 className="text-xl font-semibold mb-4">Related Audios</h3> */}
//       <div className="grid grid-cols-1 gap-4">
//        {related.map((track) => (
//   <div
//     key={track.trackId}
//     className="cursor-pointer flex flex-col sm:flex-row sm:w-[400px] w-full sm:h-[100px] h-auto bg-white/5 p-2 rounded-md hover:scale-[1.03] transition-transform duration-200"
//     onClick={() =>
//       navigate(
//         `/watch/${slugify(track.trackName, { lower: true })}/${track.trackId}`
//       )
//     }
//   >
//     <img
//       src={track.trackCover}
//       alt={track.trackName}
//       className="w-full sm:w-[168px] h-[180px] sm:h-[95px] object-cover rounded-md flex-shrink-0"
//       loading="lazy"
//     />
//     <div className="sm:ml-3 mt-2 sm:mt-0 sm:w-[180px] w-full overflow-hidden">
//       <h4 className="text-white text-sm font-semibold truncate">
//         {track.trackName}
//       </h4>
//       <p className="text-gray-400 text-xs line-clamp-2">
//         {track.description || "Enjoy this amazing audio track."}
//       </p>
//     </div>
//   </div>
// ))}

//       </div>
//     </div>
//   );
// }