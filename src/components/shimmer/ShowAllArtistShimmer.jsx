import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ShowAllArtistShimmer() {
  const shimmerBaseColor = "#2c2c2e";
  const shimmerHighlightColor = "#3a3a3c";

  return (
    <div className="text-white bg-[#090909] min-h-screen px-4 py-6 sm:px-6 md:px-10">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">All Artists</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="artist-card flex flex-col items-center text-center">
            <div className="rounded-full overflow-hidden">
              <Skeleton
                circle
                height={120}
                width={120}
                baseColor={shimmerBaseColor}
                highlightColor={shimmerHighlightColor}
              />
            </div>
            <div className="mt-2 w-full px-2">
              <Skeleton
                height={14}
                width="80%"
                baseColor={shimmerBaseColor}
                highlightColor={shimmerHighlightColor}
              />
              <Skeleton
                height={12}
                width="60%"
                className="mt-1"
                baseColor={shimmerBaseColor}
                highlightColor={shimmerHighlightColor}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
