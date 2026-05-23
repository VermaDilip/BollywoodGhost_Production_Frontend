import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/Bgicon.png";

export default function Footer() {
  return (
    <footer className="bg-hero-gradient text-white px-6 py-8">
      <div className="max-w-6xl mx-auto text-center space-y-6">

        {/* Logo & Description */}
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="mb-2">
            <img
              src={Logo}
              alt="BollywoodGhost Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-gray-300 max-w-md">
            Your destination for exclusive Bollywood videos, artist highlights, and entertainment insights.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-5 text-xl">
          <a href="https://www.facebook.com/Bollywoodghosts" className="hover:text-purple-300" aria-label="Facebook" target="_blank">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-purple-300" aria-label="Twitter" target="_blank">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-purple-300" aria-label="Instagram" target="_blank">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/@bollywoodghost" className="hover:text-purple-300" aria-label="YouTube" target="_blank">
            <FaYoutube />
          </a>
        </div>

        {/* Footer Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
          <li><a href="#" className="hover:text-purple-300">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-purple-300">Terms of Service</a></li>
          <li><a href="#" className="hover:text-purple-300">Contact Us</a></li>
          <li><a href="#" className="hover:text-purple-300">About</a></li>
        </ul>

        {/* Copyright */}
        <div className="text-xs text-gray-400">
          © {new Date().getFullYear()} bollywoodghost.com — All rights reserved.
        </div>

      </div>
    </footer>
  );
}
