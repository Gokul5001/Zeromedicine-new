// // src/utils/poseLandmarker.js
// // Lazy-loads MediaPipe Tasks Vision and exposes start/stop helpers.

// let loadingPromise = null;
// let _poseLandmarker = null;
// let _DrawingUtils = null;
// let _PoseLandmarkerClass = null;

// export async function ensureLoaded() {
//   if (loadingPromise) return loadingPromise;
//   loadingPromise = (async () => {
//     // dynamic import
//     const mod = await import("https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.0");
//     const { FilesetResolver, PoseLandmarker, DrawingUtils } = mod;
//     _DrawingUtils = DrawingUtils;
//     _PoseLandmarkerClass = PoseLandmarker;

//     const fileset = await FilesetResolver.forVisionTasks(
//       "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
//     );

//     _poseLandmarker = await PoseLandmarker.createFromOptions(fileset, {
//       baseOptions: {
//         modelAssetPath:
//           "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
//         delegate: "GPU"
//       },
//       runningMode: "VIDEO",
//       numPoses: 1
//     });

//     return { _poseLandmarker, _DrawingUtils, _PoseLandmarkerClass };
//   })();
//   return loadingPromise;
// }

// /**
//  * startPoseLoop(videoEl, canvasEl) -> { stop() }
//  * Runs detectForVideo in a RAF loop and draws landmarks onto canvasEl.
//  */
// export async function startPoseLoop(videoEl, canvasEl) {
//   if (!videoEl || !canvasEl) throw new Error("videoEl and canvasEl required");
//   await ensureLoaded();
//   const pl = _poseLandmarker;
//   const DrawingUtils = _DrawingUtils;
//   const PoseLandmarkerClass = _PoseLandmarkerClass;

//   const ctx = canvasEl.getContext("2d");
//   const drawingUtils = new DrawingUtils(ctx);

//   function syncSizes() {
//     const w = videoEl.videoWidth || videoEl.clientWidth || 640;
//     const h = videoEl.videoHeight || videoEl.clientHeight || 480;
//     if (canvasEl.width !== w || canvasEl.height !== h) {
//       canvasEl.width = w;
//       canvasEl.height = h;
//     }
//     // keep css sizing in sync with element's client size
//     canvasEl.style.width = `${videoEl.clientWidth || w}px`;
//     canvasEl.style.height = `${videoEl.clientHeight || h}px`;
//   }

//   let running = true;
//   let lastVideoTime = -1;

//   async function frameLoop(now) {
//     if (!running) return;
//     try {
//       if (videoEl.readyState >= 2) {
//         syncSizes();
//         if (lastVideoTime !== videoEl.currentTime) {
//           lastVideoTime = videoEl.currentTime;
//           const startTimeMs = performance.now();
//           pl.detectForVideo(videoEl, startTimeMs, (result) => {
//             ctx.save();
//             ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

//             if (result && Array.isArray(result.landmarks)) {
//               for (const landmark of result.landmarks) {
//                 drawingUtils.drawLandmarks(landmark, {
//                   radius: (data) => DrawingUtils.lerp(data.from.z ?? 0, -0.15, 0.1, 5, 1)
//                 });
//                 drawingUtils.drawConnectors(landmark, PoseLandmarkerClass.POSE_CONNECTIONS);
//               }
//             }
//             ctx.restore();
//           });
//         }
//       }
//     } catch (err) {
//       console.warn("pose loop error:", err);
//     }
//     if (running) requestAnimationFrame(frameLoop);
//   }

//   function startWhenReady() {
//     if (videoEl.readyState >= 2) requestAnimationFrame(frameLoop);
//     else {
//       const onLoaded = () => {
//         videoEl.removeEventListener("loadeddata", onLoaded);
//         requestAnimationFrame(frameLoop);
//       };
//       videoEl.addEventListener("loadeddata", onLoaded);
//     }
//   }

//   startWhenReady();

//   return {
//     stop() {
//       running = false;
//       try { ctx.clearRect(0, 0, canvasEl.width, canvasEl.height); } catch (e) {}
//     }
//   };
// }



// src/utils/poseLandmarker.js
// Lazy-loads MediaPipe Tasks Vision and exposes start/stop helpers.

let loadingPromise = null;
let _poseLandmarker = null;
let _DrawingUtils = null;
let _PoseLandmarkerClass = null;
let postureAnalysis = null;

// Import the PostureAnalysis class
import { PostureAnalysis } from './poseAnalysis.js';

export async function ensureLoaded() {
  if (loadingPromise) return loadingPromise;
  
  loadingPromise = (async () => {
    try {
      // dynamic import
      const mod = await import("https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.0");
      const { FilesetResolver, PoseLandmarker, DrawingUtils } = mod;
      _DrawingUtils = DrawingUtils;
      _PoseLandmarkerClass = PoseLandmarker;

      const fileset = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );

      _poseLandmarker = await PoseLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numPoses: 1
      });

      // Initialize posture analysis
      if (!postureAnalysis) {
        postureAnalysis = new PostureAnalysis();
      }

      return { _poseLandmarker, _DrawingUtils, _PoseLandmarkerClass };
    } catch (error) {
      console.error("Failed to load MediaPipe:", error);
      throw error;
    }
  })();
  
  return loadingPromise;
}

/**
 * startPoseLoop(videoEl, canvasEl) -> { stop() }
 * Runs detectForVideo in a RAF loop and draws landmarks onto canvasEl.
 */
export async function startPoseLoop(videoEl, canvasEl) {
  if (!videoEl || !canvasEl) throw new Error("videoEl and canvasEl required");
  await ensureLoaded();
  
  const pl = _poseLandmarker;
  const DrawingUtils = _DrawingUtils;
  const PoseLandmarkerClass = _PoseLandmarkerClass;

  const ctx = canvasEl.getContext("2d");
  const drawingUtils = new DrawingUtils(ctx);

  function syncSizes() {
    const w = videoEl.videoWidth || videoEl.clientWidth || 640;
    const h = videoEl.videoHeight || videoEl.clientHeight || 480;
    if (canvasEl.width !== w || canvasEl.height !== h) {
      canvasEl.width = w;
      canvasEl.height = h;
    }
    canvasEl.style.width = `${videoEl.clientWidth || w}px`;
    canvasEl.style.height = `${videoEl.clientHeight || h}px`;
  }

  let running = true;
  let lastVideoTime = -1;

  async function frameLoop(now) {
    if (!running) return;
    try {
      if (videoEl.readyState >= 2) {
        syncSizes();
        if (lastVideoTime !== videoEl.currentTime) {
          lastVideoTime = videoEl.currentTime;
          const startTimeMs = performance.now();
          
          pl.detectForVideo(videoEl, startTimeMs, (result) => {
            ctx.save();
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

            if (result && Array.isArray(result.landmarks)) {
              // Collect posture data
              if (postureAnalysis) {
                postureAnalysis.sampleMetrics(result.landmarks, startTimeMs);
              }
              
              // Draw landmarks
              for (const landmark of result.landmarks) {
                drawingUtils.drawLandmarks(landmark, {
                  radius: (data) => DrawingUtils.lerp(data.from.z ?? 0, -0.15, 0.1, 5, 1)
                });
                drawingUtils.drawConnectors(landmark, PoseLandmarkerClass.POSE_CONNECTIONS);
              }
            }
            ctx.restore();
          });
        }
      }
    } catch (err) {
      console.warn("pose loop error:", err);
    }
    if (running) requestAnimationFrame(frameLoop);
  }

  function startWhenReady() {
    if (videoEl.readyState >= 2) {
      requestAnimationFrame(frameLoop);
    } else {
      const onLoaded = () => {
        videoEl.removeEventListener("loadeddata", onLoaded);
        requestAnimationFrame(frameLoop);
      };
      videoEl.addEventListener("loadeddata", onLoaded);
    }
  }

  startWhenReady();

  return {
    stop() {
      running = false;
      try { 
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height); 
      } catch (e) {
        console.warn("Error clearing canvas:", e);
      }
    },
    getAnalysis() {
      return postureAnalysis;
    }
  };
}

// Export function to get current analysis
export function getPostureAnalysis() {
  return postureAnalysis;
}

// Export function to reset analysis
export function resetPostureAnalysis() {
  if (postureAnalysis) {
    postureAnalysis.clear();
  }
}

