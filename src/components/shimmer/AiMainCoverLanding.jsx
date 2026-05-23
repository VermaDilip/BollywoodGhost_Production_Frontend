import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AiMainCoverLanding() {
  return (
    <div className="relative w-full sm:h-[92vh] overflow-hidden bg-black text-white mb-6">
      {/* 🖥 Desktop View */}
      <div className="hidden sm:block w-full h-full relative">
        <div className="absolute inset-0">
          <Skeleton
            height="100%"
            width="100%"
            baseColor="#1f1f1f"
            highlightColor="#2c2c2e"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute bottom-10 left-6 z-20 w-[40%]">
            <Skeleton
              height={36}
              width="80%"
              baseColor="#2c2c2e"
              highlightColor="#3a3a3c"
              className="mb-4"
            />
            <Skeleton
              height={40}
              width={120}
              baseColor="#3a3a3c"
              highlightColor="#4b4b4f"
              borderRadius="999px"
            />
          </div>
        </div>
      </div>

      {/* 📱 Mobile View */}
      <div className="block sm:hidden w-full h-[220px] relative">
        <Skeleton
          height="100%"
          width="100%"
          baseColor="#1f1f1f"
          highlightColor="#2c2c2e"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <Skeleton
            height={16}
            width="70%"
            baseColor="#3a3a3c"
            highlightColor="#4b4b4f"
            className="mb-2"
          />
          <Skeleton
            height={32}
            width={100}
            baseColor="#3a3a3c"
            highlightColor="#4b4b4f"
            borderRadius="999px"
          />
        </div>
      </div>
    </div>
  );
}
