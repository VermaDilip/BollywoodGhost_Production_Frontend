// /* global APP */
// import { useNavigate } from "react-router-dom";
// import slugify from "slugify";

// export default function BrowseAll() {
//   const navigate = useNavigate();

//   const categories = [
//     { name: "Chill Vibes", color: "#1E3A8A" },
//     { name: "Workout", color: "#047857" },
//     { name: "Romantic", color: "#BE123C" },
//     { name: "Party", color: "#B45309" },
//     { name: "Sad Songs", color: "#334155" },
//     { name: "AI Covers", color: "#7C3AED" },
//     { name: "Acoustic", color: "#DC2626" },
//     { name: "Karaoke", color: "#0F766E" },
//   ];

//   const handleCategoryClick = (categoryName) => {
//     const slug = slugify(categoryName, { lower: true });
//     navigate(`/browse/${slug}`);

//     // If you use APP.CallSub for native apps
//     if (typeof APP !== "undefined" && APP.CallSub) {
//       APP.CallSub("Js_handleLink", true, `/browse/${slug}`);
//     }
//   };

//   return (
//     <div className="p-4 text-white">
//       <h2 className="text-2xl font-bold mb-4">Browse All</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {categories.map((category, index) => (
//           <div
//             key={index}
//             onClick={() => handleCategoryClick(category.name)}
//             className="rounded-lg p-4 cursor-pointer transition-transform duration-200 hover:scale-105 text-white shadow-lg"
//             style={{ backgroundColor: category.color }}
//           >
//             <h3 className="text-lg font-semibold">{category.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

/* global APP */
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

export default function BrowseAll() {
  const navigate = useNavigate();

  const categories = [
    { name: "Chill Vibes", color: "#1E3A8A" },
    { name: "Workout", color: "#047857" },
    { name: "Romantic", color: "#BE123C" },
    { name: "Party", color: "#B45309" },
    { name: "Sad Songs", color: "#334155" },
    { name: "AI Covers", color: "#7C3AED" },
    { name: "Acoustic", color: "#DC2626" },
    { name: "Karaoke", color: "#0F766E" },
  ];

  const handleCategoryClick = (categoryName) => {
    const slug = slugify(categoryName, { lower: true });
    navigate(`/browse/${slug}`);

    if (typeof APP !== "undefined" && APP.CallSub) {
      APP.CallSub("Js_handleLink", true, `/browse/${slug}`);
    }
  };

  return (
    <div className="p-4 text-white t min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Browse All
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className="cursor-pointer hover:bg-white/10 p-2 rounded-lg transition duration-200"
          >
            <div
              className="aspect-square rounded-lg shadow-md flex items-end justify-start p-4 relative overflow-hidden"
              style={{ backgroundColor: category.color }}
            >
              <h3 className="text-lg font-semibold z-10">{category.name}</h3>
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/40 z-0 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
