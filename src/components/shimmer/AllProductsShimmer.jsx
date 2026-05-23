import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AllProductsShimmer({ count = 12 }) {
  const shimmerBase = "#2c2c2e";
  const shimmerHighlight = "#3a3a3c";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
      {Array(count)
        .fill()
        .map((_, i) => (
          <div
            key={i}
            className={`rounded-xl p-5 h-48 sm:h-56 md:h-60 overflow-hidden bg-gradient-to-br from-[#3a3a3c] to-[#2c2c2e]`}
          >
            <Skeleton
              width="80%"
              height={20}
              baseColor={shimmerBase}
              highlightColor={shimmerHighlight}
            />
            <div className="absolute bottom-4 right-4">
              <Skeleton
                circle
                width={64}
                height={64}
                baseColor={shimmerBase}
                highlightColor={shimmerHighlight}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
