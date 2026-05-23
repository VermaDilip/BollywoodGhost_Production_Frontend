// import React, { useEffect, useState } from "react";
// import { MdMessage } from "react-icons/md";
// import { FiX } from "react-icons/fi";
// import { createUserRequest, getAllRequestSubjects } from "../services/servicesApi";

// export default function RequestModal() {
//   const [showModal, setShowModal] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const [subjects, setSubjects] = useState([]);
//   const [formData, setFormData] = useState({
//     subjectId: "",
//     details: "",
//     userEmail: "",
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [responseData, setResponseData] = useState(null); // <- to hold response

//   const closeModal = () => {
//     setIsClosing(true);
//     setTimeout(() => {
//       setShowModal(false);
//       setIsClosing(false);
//       setFormData({ subjectId: "", details: "", userEmail: "" });
//       setResponseData(null);
//     }, 300);
//   };

//   const handleOpen = async () => {
//     try {
//       const allSubjects = await getAllRequestSubjects();
//       setSubjects(allSubjects);
//       setShowModal(true);
//     } catch (err) {
//       console.error("Error loading subjects:", err.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { subjectId, details, userEmail } = formData;
//     if (!subjectId || !details || !userEmail) return alert("Please fill all fields.");
//     setSubmitting(true);
//     try {
//       const response = await createUserRequest({ subjectId, details, userEmail });
//       setResponseData(response); // Save response
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getSubjectName = (id) => {
//     const subject = subjects.find((s) => String(s.id) === String(id));
//     return subject ? subject.subname : "N/A";
//   };

//   return (
//     <>
//       {/* Floating Action Button */}
//       <button
//         onClick={handleOpen}
//         className="fixed bottom-[8.5rem] right-6 bg-red-600 text-white rounded-full shadow-lg p-4 z-50 hover:bg-red-700 transition-all duration-200"
//         title="Make a Request"
//       >
//         <MdMessage size={24} />
//       </button>

//       {/* Modal */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2"
//           onClick={closeModal}
//         >
//           <div
//             className={`bg-[#181818] rounded-xl p-6 w-[90%] max-w-md text-white relative shadow-xl transition-all duration-300 ${
//               isClosing ? "animate-fade-out-down" : "animate-fade-in-up"
//             }`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close Button */}
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
//             >
//               <FiX />
//             </button>

//             {!responseData ? (
//               <>
//                 <h2 className="text-xl font-semibold mb-4">Submit a Request</h2>

//                 <form onSubmit={handleSubmit}>
//                   <label className="block mb-2 text-sm">Select Subject</label>
//                   <select
//                     value={formData.subjectId}
//                     onChange={(e) =>
//                       setFormData({ ...formData, subjectId: e.target.value })
//                     }
//                     className="w-full mb-3 px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 text-white"
//                   >
//                     <option value="">-- Select a Subject --</option>
//                     {subjects.map((subject) => (
//                       <option key={subject.id} value={subject.id}>
//                         {subject.subname}
//                       </option>
//                     ))}
//                   </select>

//                   <label className="block mb-2 text-sm">Details</label>
//                   <textarea
//                     rows="4"
//                     value={formData.details}
//                     onChange={(e) =>
//                       setFormData({ ...formData, details: e.target.value })
//                     }
//                     placeholder="I want more AI covers of Arijit Singh..."
//                     className="w-full mb-3 px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none"
//                   ></textarea>

//                   <label className="block mb-2 text-sm">Email</label>
//                   <input
//                     type="email"
//                     value={formData.userEmail}
//                     onChange={(e) =>
//                       setFormData({ ...formData, userEmail: e.target.value })
//                     }
//                     placeholder="you@example.com"
//                     className="w-full mb-4 px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 focus:outline-none"
//                   />

//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className={`w-full ${
//                       submitting ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
//                     } text-white font-semibold py-2 rounded transition`}
//                   >
//                     {submitting ? "Submitting..." : "Submit Request"}
//                   </button>
//                 </form>
//               </>
//             ) : (
//               <div className="text-center">
//                 <h2 className="text-2xl font-bold text-green-400 mb-3">🎉 Success!</h2>
//                 <p className="text-sm text-gray-300 mb-6">{`Thank you! Your request has been submitted. We'll get back to you shortly.`}</p>

//                 <button
//                   onClick={closeModal}
//                   className="mt-6 w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-2 rounded"
//                 >
//                   Close
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import { MdMessage } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { createUserRequest, getAllRequestSubjects } from "../services/servicesApi";

export default function RequestModal() {
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    subjectId: "",
    details: "",
    userEmail: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
      setFormData({ subjectId: "", details: "", userEmail: "" });
      setResponseData(null);
      setErrors({});
    }, 300);
  };

  const handleOpen = async () => {
    try {
      const allSubjects = await getAllRequestSubjects();
      setSubjects(allSubjects);
      setShowModal(true);
    } catch (err) {
      console.error("Error loading subjects:", err.message);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.subjectId) newErrors.subjectId = "Subject is required.";
    if (!formData.details || formData.details.trim().length < 10)
      newErrors.details = "Please enter at least 10 characters.";
    if (!formData.userEmail) {
      newErrors.userEmail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
      newErrors.userEmail = "Enter a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await createUserRequest(formData);
      setResponseData(response);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Real-time field updates and live error clearing
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => {
      const updated = { ...prev };
      if (field === "subjectId" && value) delete updated.subjectId;
      if (field === "details" && value.trim().length >= 10) delete updated.details;
      if (field === "userEmail") {
        if (/\S+@\S+\.\S+/.test(value)) delete updated.userEmail;
      }
      return updated;
    });
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-[8.5rem] right-6 bg-red-600 text-white rounded-full shadow-lg p-4 z-50 hover:bg-red-700 transition-all duration-200"
        title="Make a Request"
      >
        <MdMessage size={24} />
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2"
          onClick={closeModal}
        >
          <div
            className={`bg-[#181818] rounded-xl p-6 w-[90%] max-w-md text-white relative shadow-xl transition-all duration-300 ${
              isClosing ? "animate-fade-out-down" : "animate-fade-in-up"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
            >
              <FiX />
            </button>

            {!responseData ? (
              <>
               <h2 className="text-xl font-semibold mb-4 text-center">Submit a Request</h2>

                <form onSubmit={handleSubmit}>
                  {/* Subject */}
                  <label className="block mb-2 text-sm">Select Subject</label>
                  <select
                    value={formData.subjectId}
                    onChange={(e) => handleChange("subjectId", e.target.value)}
                    className={`w-full mb-1 px-4 py-2 rounded bg-[#2a2a2a] border ${
                      errors.subjectId ? "border-red-500" : "border-gray-600"
                    } text-white`}
                  >
                    <option value="">-- Select a Subject --</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.subname}
                      </option>
                    ))}
                  </select>
                  {errors.subjectId && (
                    <p className="text-red-400 text-xs mb-2">{errors.subjectId}</p>
                  )}

                  {/* Details */}
                  <label className="block mb-2 text-sm">Details</label>
                  <textarea
                    rows="4"
                    value={formData.details}
                    onChange={(e) => handleChange("details", e.target.value)}
                    placeholder="I want more AI covers of Arijit Singh..."
                    className={`w-full mb-1 px-4 py-2 rounded bg-[#2a2a2a] border ${
                      errors.details ? "border-red-500" : "border-gray-600"
                    } focus:outline-none`}
                  ></textarea>
                  {errors.details && (
                    <p className="text-red-400 text-xs mb-2">{errors.details}</p>
                  )}

                  {/* Email */}
                  <label className="block mb-2 text-sm">Email</label>
                  <input
                    type="email"
                    value={formData.userEmail}
                    onChange={(e) => handleChange("userEmail", e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full mb-3 px-4 py-2 rounded bg-[#2a2a2a] border ${
                      errors.userEmail ? "border-red-500" : "border-gray-600"
                    } focus:outline-none`}
                  />
                  {errors.userEmail && (
                    <p className="text-red-400 text-xs mb-3">{errors.userEmail}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full ${
                      submitting ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
                    } text-white font-semibold py-2 rounded transition`}
                  >
                    {submitting ? "Submitting..." : "Submit Request"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-400 mb-3">🎉 Success!</h2>
                <p className="text-sm text-gray-300 mb-6">
                  Thank you! Your request has been submitted. We'll get back to you shortly.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-2 rounded"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
