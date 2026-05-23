import React from "react";

export default function CustomModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Download",
  cancelText = "Cancel",
  logo,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#1e1e1e] text-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        {logo && (
          <img src={logo} alt="Logo" className="h-12 mb-4 mx-auto" />
        )}
        <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
        <p className="text-sm text-gray-300 text-center">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-500 text-sm hover:bg-gray-700 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
