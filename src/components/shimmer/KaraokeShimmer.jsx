// components/shimmer/KaraokeShimmer.js
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function KaraokeShimmer({ count = 6 }) {
  const baseColor = "#2c2c2e";
  const highlightColor = "#3a3a3c";

  return (
    <div className="flex overflow-x-auto gap-4 sm:gap-6 px-4 sm:px-6 pb-6">
      {Array(count)
        .fill()
        .map((_, i) => (
          <div key={i} className="w-[180px] sm:w-[250px] flex-shrink-0 p-2 sm:p-3 rounded-lg">
            <Skeleton
              height={180}
              className="rounded-lg"
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <Skeleton
              height={16}
              width="80%"
              className="mt-2"
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <Skeleton
              height={12}
              width="90%"
              className="mt-1"
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>
        ))}
    </div>
  );
}
