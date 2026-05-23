import React, { useEffect, useRef, useState } from "react";

const TestAdBanner = () => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    try {
      if (!adLoaded && window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
        setAdLoaded(true);
      }
    } catch (e) {
      console.error("AdSense test ad error:", e);
    }
  }, [adLoaded]);

  return (
    <ins
      className="adsbygoogle"
      ref={adRef}
      style={{ display: "block", width: "100%", height: "100px" }}
      data-ad-client="ca-pub-3940256099942544"
      data-ad-slot="6300978111"
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-adtest="on"
    ></ins>
  );
};

export default TestAdBanner;
