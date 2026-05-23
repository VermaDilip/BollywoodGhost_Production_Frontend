import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function VideoPlayerShimmer() {
  const shimmerBaseColor = "#2c2c2e";
  const shimmerHighlightColor = "#3a3a3c";

  return (
    <div className="w-full mb-6">
      {/* Blurred Background with Centered Card */}
      <div className="w-full aspect-video relative rounded-xl overflow-hidden min-h-[400px] sm:min-h-[300px] bg-[#1f1f1f]">
        <div className="absolute inset-0 bg-cover bg-center filter brightness-20 bg-[#1f1f1f]" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="bg-white/10 backdrop-blur-md p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-white/20 shadow-xl w-full max-w-[90%] sm:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto text-center">

            <Skeleton
              height={12}
              width={80}
              baseColor={shimmerBaseColor}
              highlightColor={shimmerHighlightColor}
              className="mx-auto mb-3"
            />

            <div className="flex justify-center mb-4">
              <Skeleton
                circle
                height={90}
                width={90}
                baseColor={shimmerBaseColor}
                highlightColor={shimmerHighlightColor}
              />
            </div>

            <Skeleton
              height={18}
              width="90%"
              baseColor={shimmerBaseColor}
              highlightColor={shimmerHighlightColor}
              className="mx-auto mb-2"
            />

            <Skeleton
              height={14}
              width="60%"
              baseColor={shimmerBaseColor}
              highlightColor={shimmerHighlightColor}
              className="mx-auto mb-4"
            />

            {/* Version Scroller */}
            <div className="flex overflow-x-auto gap-4 scrollbar-hide px-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 text-center w-20">
                  <Skeleton
                    circle
                    height={56}
                    width={56}
                    baseColor={shimmerBaseColor}
                    highlightColor={shimmerHighlightColor}
                    className="mx-auto"
                  />
                  <Skeleton
                    height={12}
                    width="80%"
                    baseColor={shimmerBaseColor}
                    highlightColor={shimmerHighlightColor}
                    className="mx-auto mt-2"
                  />
                  <Skeleton
                    height={10}
                    width="60%"
                    baseColor={shimmerBaseColor}
                    highlightColor={shimmerHighlightColor}
                    className="mx-auto mt-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player Placeholder */}
      <div className="w-full mt-3 bg-black bg-opacity-60 rounded-xl overflow-hidden px-4 py-2">
        <Skeleton
          height={40}
          width="100%"
          baseColor={shimmerBaseColor}
          highlightColor={shimmerHighlightColor}
        />
      </div>
    </div>
  );
}
