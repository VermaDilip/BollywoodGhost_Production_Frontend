// shimmer/AiCoverShimmer.js
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AcapellasShimmer({ count = 6 }) {
  const shimmerBase = "#2c2c2e";
  const shimmerHighlight = "#3a3a3c";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 px-4 sm:px-6 pb-6">
      {Array(count)
        .fill()
        .map((_, i) => (
          <div key={i} className="p-2 sm:p-3 rounded-lg">
            <Skeleton
              height={160}
              className="rounded-lg"
              baseColor={shimmerBase}
              highlightColor={shimmerHighlight}
            />
            <Skeleton
              height={16}
              width="80%"
              className="mt-2"
              baseColor={shimmerBase}
              highlightColor={shimmerHighlight}
            />
            <Skeleton
              height={12}
              width="90%"
              className="mt-1"
              baseColor={shimmerBase}
              highlightColor={shimmerHighlight}
            />
          </div>
        ))}
    </div>
  );
}
