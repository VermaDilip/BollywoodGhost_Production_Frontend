// shimmer/ArtistPageShimmer.js
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ArtistPageShimmer() {
  const shimmerBaseColor = "#2c2c2e";
  const shimmerHighlightColor = "#3a3a3c";

  return (
    <div className="text-white bg-hero-gradient min-h-screen">
      {/* Header shimmer */}
      <div
        className="p-6 bg-hero-gradient"
      >
        <div className="flex items-center gap-6">
          <Skeleton
            circle
            height={160}
            width={160}
            baseColor={shimmerBaseColor}
            highlightColor={shimmerHighlightColor}
          />
          <div className="flex-1">
            <Skeleton
              height={32}
              width={200}
              baseColor={shimmerBaseColor}
              highlightColor={shimmerHighlightColor}
            />
            <Skeleton
              height={16}
              width={100}
              style={{ marginTop: 8 }}
              baseColor={shimmerBaseColor}
              highlightColor={shimmerHighlightColor}
            />
          </div>
        </div>
      </div>

      {/* Grid shimmer */}
      <div className="px-6 pt-8">
        <Skeleton
          height={24}
          width={150}
          baseColor={shimmerBaseColor}
          highlightColor={shimmerHighlightColor}
          style={{ marginBottom: 20 }}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array(12)
            .fill()
            .map((_, idx) => (
              <div key={idx}>
                <Skeleton
                  height={140}
                  baseColor={shimmerBaseColor}
                  highlightColor={shimmerHighlightColor}
                  className="rounded-lg"
                />
                <Skeleton
                  height={16}
                  width="80%"
                  style={{ marginTop: 8 }}
                  baseColor={shimmerBaseColor}
                  highlightColor={shimmerHighlightColor}
                />
                <Skeleton
                  height={12}
                  width="60%"
                  style={{ marginTop: 4 }}
                  baseColor={shimmerBaseColor}
                  highlightColor={shimmerHighlightColor}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
