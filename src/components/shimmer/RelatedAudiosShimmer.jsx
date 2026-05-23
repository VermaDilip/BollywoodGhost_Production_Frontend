import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RelatedAudiosShimmer({ count = 10 }) {
  const baseColor = "#2c2c2e";
  const highlightColor = "#3a3a3c";

  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-2 rounded-lg bg-[#1a1a1a]"
        >
          <Skeleton
            height={0}
            style={{ paddingTop: "100%" }}
            baseColor={baseColor}
            highlightColor={highlightColor}
            className="rounded-md w-full"
          />
          <div className="mt-2">
            <Skeleton
              height={14}
              width="80%"
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
