// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MiniPlayer from "./components/MiniPlayer";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import { Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Artist from "./pages/Artist";
import ShowAllArtists from "./pages/ShowAllArtistsPage/ShowAllArtists";
import ShowAllAICovers from "./pages/ShowAllAICoversPage/AllAICovers";
import ShowAllAcapella from "./pages/ShowALLAcapellaPage/AllAcapella";
import ShowAllKaraoke from "./pages/ShowAllKaraokePage/AllKaraoke";
import ShowAllLatestSongs from "./pages/ShowAllLatestSongPage/AllLatestSongs";
import AllProducts from "./pages/ShowALLProductsPage/AllProducts";
import ProductDetail from "./pages/ProductDetail";
import usePageTracking from "./hooks/usePageTracking";

import "react-h5-audio-player/lib/styles.css";

import Landing from "./pages/Landing";
import Watch from "./pages/Watch";

// ✅ App component
function App() {
  return (
    <AudioPlayerProvider>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />
        <main className="flex-grow topdown">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/watch/:slug/:id" element={<Watch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/artist/:slug" element={<Artist />} />
            <Route path="/artists/all" element={<ShowAllArtists />} />
            <Route path="/ai-cover/all" element={<ShowAllAICovers />} />
            <Route path="/acapella/all" element={<ShowAllAcapella />} />
            <Route path="/karaoke/all" element={<ShowAllKaraoke />} />
            <Route path="/latest-songs/all" element={<ShowAllLatestSongs />} />
            <Route path="/products/all" element={<AllProducts />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
             {/* 🚨 Catch-all 404 redirect to Landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <MiniPlayer />
        <Footer />
      </div>
    </AudioPlayerProvider>
  );
}

// ✅ usePageTracking uses useLocation internally (must be inside <Router>)
function AppWrapper() {
  usePageTracking(); // ⬅️ Google Analytics tracking hook
  return <App />;
}

// ✅ Export the full app with Router context
export default function RootApp() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
