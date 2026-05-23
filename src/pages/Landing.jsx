import React, { useEffect } from "react";
import SeoMeta from "../components/SeoMeta";
import VideoGrid from "../components/VideoGrid";
import ArtistGrid from "../components/ArtistGrid";
import TopVideosCarousel from "../components/TopVideosCarousel";
import AiCover from "../components/AiCover";
import Acapellas from "../components/Acapellas";
import KaraokeInstruments from "../components/KaraokeInstruments";
import AiCoverLanding from "../components/AiCoverLanding";
import RequestModal from "../components/RequestModal"; // 👈 Import the new component

export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-grow bg-hero-gradient text-white relative">
      <SeoMeta
        description="Discover trending AI-generated Bollywood songs, covers, and virtual artists on BollywoodGhost. Listen, explore, and experience music like never before!"
        image="https://bollywoodghost.com/og-image.jpg"
        keywords="AI Music, Bollywood Covers, Karaoke, AI Artists, Acapellas, AI Songs"
      />

      <AiCoverLanding />
      <ArtistGrid />
      <VideoGrid />
      <AiCover />
      <Acapellas />
      <KaraokeInstruments />

      {/* 💬 Floating Request Button + Modal */}
      <RequestModal />
    </div>
  );
}
