// components/shimmer/VersionListShimmer.jsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function VersionListShimmer({ count = 5 }) {
  const base = "#2c2c2e";
  const highlight = "#3a3a3c";

  return (
    <div className="flex overflow-x-auto gap-4 scrollbar-hide px-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex-shrink-0 text-center w-20">
          <Skeleton
            circle
            height={56}
            width={56}
            baseColor={base}
            highlightColor={highlight}
            className="mx-auto"
          />
          <Skeleton
            height={12}
            width="80%"
            baseColor={base}
            highlightColor={highlight}
            className="mx-auto mt-2"
          />
          <Skeleton
            height={10}
            width="60%"
            baseColor={base}
            highlightColor={highlight}
            className="mx-auto mt-1"
          />
        </div>
      ))}
    </div>
  );
}
