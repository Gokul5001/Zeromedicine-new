import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";

let segmentation = null;
let animationFrame = null;

export async function startVirtualBackground(videoEl, canvasEl, imageUrl) {
  if (!videoEl || !canvasEl) return;

  const ctx = canvasEl.getContext("2d");

  // ✅ Proper image loading
  const bgImage = new Image();
  bgImage.crossOrigin = "anonymous";   // important for canvas
  bgImage.src = imageUrl;

  await new Promise((resolve, reject) => {
    bgImage.onload = resolve;
    bgImage.onerror = reject;
  });

  segmentation = new SelfieSegmentation({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
  });

  segmentation.setOptions({
    modelSelection: 1,
  });

  segmentation.onResults((results) => {
    canvasEl.width = videoEl.videoWidth;
    canvasEl.height = videoEl.videoHeight;

    ctx.save();
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    // Draw background first
    ctx.drawImage(bgImage, 0, 0, canvasEl.width, canvasEl.height);

    // Keep only person mask
    ctx.globalCompositeOperation = "destination-atop";
    ctx.drawImage(
      results.segmentationMask,
      0,
      0,
      canvasEl.width,
      canvasEl.height
    );

    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(results.image, 0, 0, canvasEl.width, canvasEl.height);

    ctx.restore();
  });

  async function processFrame() {
    if (!segmentation) return;
    await segmentation.send({ image: videoEl });
    animationFrame = requestAnimationFrame(processFrame);
  }

  processFrame();
}

export function stopVirtualBackground() {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  segmentation = null;
}
