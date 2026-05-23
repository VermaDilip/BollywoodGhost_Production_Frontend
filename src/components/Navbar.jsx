import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import slugify from "slugify";
import {
  FiSearch,
  FiChevronLeft,
  FiMenu,
  FiX,
  FiHome,
  FiArchive,
} from "react-icons/fi";
import { MdGraphicEq } from "react-icons/md";
import { BiSolidMusic } from "react-icons/bi";
import { GiMicrophone, GiMusicalNotes } from "react-icons/gi";
import Logo from "../assets/Bgicon.png";
import { searchTracks } from "../services/servicesApi";
import PromoAppCard from "../components/PromoAppCard";
import PromoAppCard_8D from "../components/PromoAppCard_8D";
import BrowseAll from "./BrowseAll"; // Assuming you have a BrowseAll component
import "./Navbar.css"; // Assuming you have a CSS file for styles

export default function Navbar() {
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDrawerOpen]);

  const closeDrawer = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const goToTrack = (track) => {
    navigate(`/watch/${slugify(track.trackName, { lower: true })}/${track.trackId}`);
    setSearchMode(false);
    setShowSuggestions(false);
    setSearchTerm("");
  };


  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.length >= 5) {
        setSearchLoading(true);
        searchTracks(searchTerm)
          .then((res) => {
            setSearchResults(res || []);
            setShowSuggestions(true);
          })
          .catch((err) => {
            console.error("Search failed:", err.message);
            setSearchResults([]);
          })
          .finally(() => {
            setSearchLoading(false);
          });
      } else {
        setShowSuggestions(false);
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-hero-gradient text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          {!searchMode && (
            <button onClick={() => setIsDrawerOpen(true)} className="mr-2">
              <FiMenu size={24} />
            </button>
          )}
          {isMobile && searchMode ? (
            <button
              onClick={() => {
                setSearchMode(false);
                navigate("/");
              }}
            >
              <FiChevronLeft size={22} />
            </button>
          ) : (
            <Link to="/" className="h-10 block">
              <img src={Logo} alt="Logo" className="h-10 w-auto object-contain" />
            </Link>
          )}
        </div>

        {/* Desktop Search */}
        <div className={`flex items-center ${isMobile ? "" : "absolute left-1/2 -translate-x-1/2"}`}>
          {isMobile ? (
            !searchMode && (
              <button onClick={() => setSearchMode(true)} className="ml-auto">
                <FiSearch size={22} />
              </button>
            )
          ) : (
            <div ref={searchRef} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                placeholder="Search by title, artist, or movie name"
                className="bg-transparent border border-gray-500 text-white placeholder-gray-400 px-4 py-2 rounded-full w-[38rem] focus:outline-none focus:border-white transition pr-8"
              />
              <FiSearch
                size={18}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />

              {/* Cross Icon */}
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FiX size={18} />
                </button>
              )}

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[42rem] bg-[#363434] text-white rounded shadow-lg z-50 max-h-[32rem] overflow-y-auto scrollbar-hide">
                  {searchLoading ? (
                    <div className="p-3 text-sm text-gray-300">Searching...</div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-3 text-sm text-gray-400">No results</div>
                  ) : (
                    <ul>
                      {searchResults.map((track) => (
                        <li
                          key={track.trackId}
                          onClick={() => goToTrack(track)}
                          className="flex items-center gap-3 p-3 hover:bg-[#2a2a2a] cursor-pointer transition"
                        >
                          <img
                            src={
                              track?.trackPhoto?.startsWith("http")
                                ? track.trackPhoto
                                : `${process.env.REACT_APP_BASE_API_ARTIST_PHOTO_URL}/${track.trackPhoto}`
                            }
                            alt={track.artist?.artistName}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="text-sm">
                            <div className="font-medium">
                              {track.trackName}
                            </div>
                            <div className="text-gray-400 text-xs">{track.artist?.artistName}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

          )}
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {isMobile && searchMode && (
        <div className="fixed inset-0 bg-[#0f0f0f] z-50 flex flex-col px-4 pt-6">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center w-full gap-3">
              <button onClick={() => setSearchMode(false)}>
                <FiChevronLeft size={24} className="text-white" />
              </button>
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, artist, or movie name"
                className="flex-1 bg-transparent border border-gray-500 text-white placeholder-gray-400 px-4 py-2 rounded-full focus:outline-none focus:border-white transition"
              />
            </div>
          </div>

          <div className="mt-2 space-y-2 overflow-y-auto">
            {searchLoading ? (
              <div className="text-white text-center py-2">Loading...</div>
            ) : searchResults.length === 0 ? (
              <div className="text-gray-400 text-center py-2">No results</div>
              //  <BrowseAll />
            ) : (
              searchResults.map((track) => (
                <div
                  key={track.trackId}
                  onClick={() => goToTrack(track)}
                  className="bg-[#1a1a1a] text-white p-3 rounded flex gap-3 items-center cursor-pointer hover:bg-[#2a2a2a]"
                >
                  <img
                    src={
                      track?.trackPhoto?.startsWith("http")
                        ? track.trackPhoto
                        : `${process.env.REACT_APP_BASE_API_ARTIST_PHOTO_URL}/${track.trackPhoto}`
                    }
                    alt={track.artist?.artistName}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium truncate max-w-[280px]">{track.trackName}</div>

                    <div className="text-xs text-gray-400">{track.artist?.artistName}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Drawer */}
      {/* {(isDrawerOpen || isClosing) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex" onClick={closeDrawer}>
          <div
            className={`bg-[#1f1f1f] text-white w-64 h-full p-6 shadow-lg transform ${isClosing ? "animate-slide-out" : "animate-slide-in"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-9">
              <button onClick={closeDrawer}>
                <FiX size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 -ml-[22px]">
              <Link
                to="/"
                onClick={closeDrawer}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${location.pathname === "/" ? "bg-[#0e0d0deb] font-semibold" : "hover:bg-[#0e0d0deb]"
                  }`}
              >
                <FiHome className="text-xl text-red-600" />
                <span className="text-base font-medium">Home</span>
              </Link>

              <Link
                to="/latest-songs/all"
                onClick={closeDrawer}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${location.pathname === "/latest-songs/all"
                  ? "bg-[#0e0d0deb] font-semibold"
                  : "hover:bg-[#0e0d0deb]"
                  }`}
              >
                <BiSolidMusic className="text-xl text-red-600" />
                <span className="text-base font-medium">Latest Songs</span>
              </Link>

              <Link
                to="/ai-cover/all"
                onClick={closeDrawer}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${location.pathname === "/ai-cover/all"
                  ? "bg-[#0e0d0deb] font-semibold"
                  : "hover:bg-[#0e0d0deb]"
                  }`}
              >
                <MdGraphicEq className="text-xl text-red-600" />
                <span className="text-base font-medium">AI Cover</span>
              </Link>

              <Link
                to="/acapella/all"
                onClick={closeDrawer}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${location.pathname === "/acapella/all"
                  ? "bg-[#0e0d0deb] font-semibold"
                  : "hover:bg-[#0e0d0deb]"
                  }`}
              >
                <GiMicrophone className="text-xl text-red-600" />
                <span className="text-base font-medium">Acapellas</span>
              </Link>

              <Link
                to="/karaoke/all"
                onClick={closeDrawer}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${location.pathname === "/karaoke/all"
                  ? "bg-[#0e0d0deb] font-semibold"
                  : "hover:bg-[#0e0d0deb]"
                  }`}
              >
                <GiMusicalNotes className="text-xl text-red-600" />
                <span className="text-base font-medium">Karaoke Instrument</span>
              </Link>
            </nav>
          </div>
        </div>
      )} */}
      {(isDrawerOpen || isClosing) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex" onClick={closeDrawer}>
          <div
            className={`bg-[#1f1f1f] text-white w-64 h-full p-6 shadow-lg transform ${isClosing ? "animate-slide-out" : "animate-slide-in"
              } flex flex-col justify-between overflow-y-auto hide-scrollbar`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Section: Logo + Nav */}
            <div>
              <div className="flex justify-between items-center mb-9">
                <button onClick={closeDrawer}>
                  <FiX size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-4 -ml-[22px]">
                <Link
                  to="/"
                  onClick={closeDrawer}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${location.pathname === "/"
                    ? "bg-[#0e0d0deb] font-semibold"
                    : "hover:bg-[#0e0d0deb]"
                    }`}
                >
                  <FiHome className="text-xl text-red-600" />
                  <span className="text-base font-medium">Home</span>
                </Link>

                <Link
                  to="/latest-songs/all"
                  onClick={closeDrawer}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${location.pathname === "/latest-songs/all"
                    ? "bg-[#0e0d0deb] font-semibold"
                    : "hover:bg-[#0e0d0deb]"
                    }`}
                >
                  <BiSolidMusic className="text-xl text-red-600" />
                  <span className="text-base font-medium">Latest Songs</span>
                </Link>

                <Link
                  to="/ai-cover/all"
                  onClick={closeDrawer}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${location.pathname === "/ai-cover/all"
                    ? "bg-[#0e0d0deb] font-semibold"
                    : "hover:bg-[#0e0d0deb]"
                    }`}
                >
                  <MdGraphicEq className="text-xl text-red-600" />
                  <span className="text-base font-medium">AI Cover</span>
                </Link>

                <Link
                  to="/acapella/all"
                  onClick={closeDrawer}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${location.pathname === "/acapella/all"
                    ? "bg-[#0e0d0deb] font-semibold"
                    : "hover:bg-[#0e0d0deb]"
                    }`}
                >
                  <GiMicrophone className="text-xl text-red-600" />
                  <span className="text-base font-medium">Acapellas</span>
                </Link>

                <Link
                  to="/karaoke/all"
                  onClick={closeDrawer}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${location.pathname === "/karaoke/all"
                    ? "bg-[#0e0d0deb] font-semibold"
                    : "hover:bg-[#0e0d0deb]"
                    }`}
                >
                  <GiMusicalNotes className="text-xl text-red-600" />
                  <span className="text-base font-medium">Karaoke Instrument</span>
                </Link>

                <Link
                  to="/products/all"
                  onClick={closeDrawer}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${location.pathname === "/products/all"
                    ? "bg-[#0e0d0deb] font-semibold"
                    : "hover:bg-[#0e0d0deb]"
                    }`}
                >
                  <FiArchive className="text-xl text-red-600" />
                  <span className="text-base font-medium">Archive</span>
                </Link>
              </nav>

              {/* 🔥 Promo Card for Other App */}
               <PromoAppCard />
              <PromoAppCard_8D />
            
            </div>

            {/* Bottom Section: Copyright */}
            <div className="text-xs text-gray-400 text-center mt-6">
              © {new Date().getFullYear()} bollywoodghost.com — All rights reserved.
            </div>
          </div>
        </div>
      )}

    </>
  );
}

