// src/components/Comments.jsx
import { useEffect, useState } from "react";
import { fetchComments } from "../api/fakeApi";

export default function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchComments(videoId).then(setComments);
  }, [videoId]);

  const handleAddComment = () => {
    if (text.trim()) {
      const newComment = { id: Date.now(), author: "You", text };
      setComments((prev) => [...prev, newComment]);
      setText("");
    }
  };

  return (
    <div className="mt-6 text-white">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <div className="mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 bg-title_description rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Post
        </button>
      </div>
      <ul>
        {comments.map((c) => (
          <li key={c.id} className="mb-2 border-b border-gray-600 pb-2">
            <strong>{c.author}</strong>: {c.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
