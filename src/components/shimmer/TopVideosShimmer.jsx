import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TopVideosShimmer() {
  const shimmerBaseColor = "#2c2c2e";
  const shimmerHighlightColor = "#3a3a3c";

  return (
    <div
      className="flex overflow-x-auto space-x-4 sm:space-x-6 scrollbar-hide px-4 sm:px-12"
      style={{ scrollBehavior: "smooth" }}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="w-[180px] sm:w-[250px] flex-shrink-0"
        >
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Skeleton
              height={144} // consistent with your actual image heights (h-32 sm:h-36)
              className="w-full"
              baseColor={shimmerBaseColor}
              highlightColor={shimmerHighlightColor}
              borderRadius="12px"
            />
          </div>
          <div className="mt-2 px-1">
            <Skeleton
              height={16}
              width="80%"
              baseColor={shimmerBaseColor}
              highlightColor={shimmerHighlightColor}
              borderRadius="8px"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
