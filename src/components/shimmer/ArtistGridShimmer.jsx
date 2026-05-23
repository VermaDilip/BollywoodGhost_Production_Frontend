import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ArtistGridShimmer() {
  const shimmerBaseColor = "#2c2c2e";     // Dark gray (base)
  const shimmerHighlightColor = "#3a3a3c"; // Lighter gray (shine)

  return (
    <div className="artist-scroll-container scrollbar-hide">
      {Array(12).fill().map((_, index) => (
        <div key={index} className="artist-card">
          <Skeleton
            circle
            height={170}
            width={170}
            baseColor={shimmerBaseColor}
            highlightColor={shimmerHighlightColor}
            containerClassName="artist-img"
          />
          <div className="mt-2">
            <Skeleton
              width={100}
              height={16}
              baseColor={shimmerBaseColor}
              highlightColor={shimmerHighlightColor}
              style={{ margin: "0.6rem auto 0" }}
            />
            <Skeleton
              width={60}
              height={12}
              baseColor={shimmerBaseColor}
              highlightColor={shimmerHighlightColor}
              style={{ margin: "0.2rem auto 0" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
