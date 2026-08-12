import { PostureAnalysis } from "./poseAnalysis";

let controller = null;

export async function startOpenPoseOnVideo(videoEl, canvasEl) {
  const ctx = canvasEl.getContext("2d");
  const analysis = new PostureAnalysis();
  let running = true;

  async function tick() {
    if (!running) return;

    if (videoEl.readyState >= 2) {
      canvasEl.width = videoEl.videoWidth;
      canvasEl.height = videoEl.videoHeight;

      const blob = await captureFrame(videoEl);
      const res = await sendToOpenPose(blob);

      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

      if (res.landmarks?.length) {
        analysis.sampleMetrics(res.landmarks, performance.now());

        res.landmarks.forEach(person => {
          person.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x * canvasEl.width, p.y * canvasEl.height, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#00ff88";
            ctx.fill();
          });
        });
      }
    }

    setTimeout(tick, 120); // safe FPS
  }

  tick();

  return {
    stop() {
      running = false;
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    },
    getAnalysis() {
      return analysis;
    }
  };
}

async function captureFrame(videoEl) {
  const c = document.createElement("canvas");
  c.width = videoEl.videoWidth;
  c.height = videoEl.videoHeight;
  c.getContext("2d").drawImage(videoEl, 0, 0);
  return new Promise(res => c.toBlob(res, "image/jpeg", 0.7));
}

async function sendToOpenPose(blob) {
  const fd = new FormData();
  fd.append("file", blob);

  const r = await fetch("https://YOUR_OPENPOSE_API/pose", {
    method: "POST",
    body: fd
  });

  return r.json();
}
