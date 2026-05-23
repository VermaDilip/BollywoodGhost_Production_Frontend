import { useEffect, useState } from "react";
import { getAllTopVideos } from "../services/servicesApi";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";

export default function RelatedVideos({ videoId }) {
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTopVideos()
      .then((data) => {
        setRelated(data);
      })
      .catch((err) => {
        console.error("Error fetching related videos:", err.message);
      });
  }, [videoId]);

  return (
    <div className="text-white">
      <div className="grid grid-cols-1 gap-4">
        {related.map((video) => (
          <div
            key={video.id}
            className="cursor-pointer flex flex-col sm:flex-row sm:w-[400px] w-full sm:h-[100px] h-auto bg-white/5 p-2 rounded-md hover:scale-[1.03] transition-transform duration-200"
            onClick={() =>
              navigate(`/watch/${slugify(video.title, { lower: true })}/${video.id}`)
            }
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full sm:w-[168px] h-[180px] sm:h-[95px] object-cover rounded-md flex-shrink-0"
              loading="lazy"
            />
            <div className="sm:ml-3 mt-2 sm:mt-0 sm:w-[180px] w-full overflow-hidden">
              <h4 className="text-white text-sm font-semibold truncate">{video.title}</h4>
              <p className="text-gray-400 text-xs line-clamp-2">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
