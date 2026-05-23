import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductDetailShimmer() {
  const baseColor = "#2c2c2e";
  const highlightColor = "#3a3a3c";

  return (
    <div className="min-h-screen bg-hero-gradient text-white px-4 py-10 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto bg-hero-gradient backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* LEFT - IMAGE */}
        <div className="flex justify-center items-center">
          <Skeleton
            height={320}
            width={280}
            className="rounded-xl"
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div>

        {/* RIGHT - TEXT */}
        <div className="flex flex-col justify-between">
          <div>
            <Skeleton
              height={36}
              width="80%"
              className="mb-4"
              baseColor={baseColor}
              highlightColor={highlightColor}
            />

            <Skeleton
              count={3}
              height={14}
              className="mb-2"
              baseColor={baseColor}
              highlightColor={highlightColor}
            />

            <Skeleton
              count={5}
              height={12}
              className="mt-4"
              baseColor={baseColor}
              highlightColor={highlightColor}
            />

            <div className="mt-6 flex flex-wrap gap-2">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    width={60 + i * 10}
                    height={24}
                    borderRadius={999}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                  />
                ))}
            </div>
          </div>

          <div className="mt-4">
            <Skeleton
              height={42}
              width={160}
              borderRadius={8}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
