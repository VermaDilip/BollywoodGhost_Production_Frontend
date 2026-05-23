import { useEffect, useRef } from "react";

export default function useAudioVisualizer(audioRef, canvasRef) {
  const animationRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;

    if (!audio || !canvas) return;

    const context = new (window.AudioContext || window.webkitAudioContext)();

    // Prevent re-connecting same media element
    if (audio._connectedToVisualizer) return;
    audio._connectedToVisualizer = true;

    const src = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const ctx = canvas.getContext("2d");

    const scale = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * scale;
    canvas.height = canvas.clientHeight * scale;
    ctx.scale(scale, scale);

    const barWidth = (canvas.clientWidth / bufferLength) * 2.5;

    function renderFrame() {
      animationRef.current = requestAnimationFrame(renderFrame);

      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];
        const r = barHeight + 25 * (i / bufferLength);
        const g = 250 * (i / bufferLength);
        const b = 50;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, canvas.clientHeight - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
      }
    }

    renderFrame();

    return () => {
      cancelAnimationFrame(animationRef.current);
      analyser.disconnect();
      src.disconnect();
      context.close();
      delete audio._connectedToVisualizer;
    };
  }, [audioRef, canvasRef]);
}
