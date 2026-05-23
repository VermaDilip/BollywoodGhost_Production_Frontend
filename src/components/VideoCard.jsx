// src/components/VideoCard.jsx
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-xl transition">
        <img src={video.thumbnail} alt={video.title} className="w-full" />
        <div className="p-2 text-white">
          <h3 className="font-semibold">{video.title}</h3>
        </div>
      </div>
    </Link>
  );
}
