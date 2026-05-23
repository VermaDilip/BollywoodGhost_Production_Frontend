/* global APP */
import React from "react";
import { SiGoogleplay } from "react-icons/si";
import EightDAudioIcon from "../assets/8D_audio.webp"; // Ensure path is correct

export default function PromoAppCard8D() {
    const storeId = "com.venir.audio8d";

    const handlePromoClick = () => {
        window.open(`https://play.google.com/store/apps/details?id=${storeId}`, "_blank");
    };

    return (
        <div className="mt-6 p-3 bg-white/5 border border-white/10 rounded-lg shadow-md backdrop-blur-md transition hover:shadow-lg hover:scale-[1.02]">
            <div className="flex items-center gap-2 mb-1">
                <div className="bg-white rounded-lg p-[1px] shadow-md inline-block">
                    <img
                        src={EightDAudioIcon}
                        alt="8D Audio App"
                        className="w-10 h-10 rounded-lg object-cover"
                    />
                </div>
                <h4 className="text-sm font-semibold text-white">8D Audio!</h4>
            </div>

            <p className="text-xs text-white mb-2">8D Audio Converter & 8D Music.</p>

            <div className="flex justify-center mt-2">
                <button
                    onClick={handlePromoClick}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded-full transition-all shadow-md"
                >
                    <SiGoogleplay size={14} />
                    Try Now
                </button>
            </div>
        </div>
    );
}
