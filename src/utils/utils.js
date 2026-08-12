 // src/utils/utils.js
 import { startPoseLoop, ensureLoaded } from "./poseLandmarker";

 /**
  * attachTrackOnce(container, track, opts)
  * - creates wrapper and attaches track element
  * - always creates a canvas overlay for remote videos but only starts pose loop
  *   if container.dataset.poseEnabled === "true"
  */
 export function attachTrackOnce(container, track, opts = {}) {
   if (!track || !container) return null;
   try {
     const trackId = track.id || track.sid || (track.trackId ? track.trackId : null);
     const participantId = opts.participant || "";
     const kind = track.kind || (track.mediaStreamTrack && track.mediaStreamTrack.kind) || "video";
 
     // dedupe existing
     let existing = null;
     if (trackId) existing = container.querySelector(`[data-track-id="${trackId}"]`);
     if (!existing && participantId) existing = container.querySelector(`.video-wrapper[data-participant="${participantId}"][data-kind="${kind}"]`);
     if (existing) return existing;
 
     const el = typeof track.attach === "function" ? track.attach() : null;
     if (!el) return null;
 
     el.style.display = "block";
     el.setAttribute("playsinline", "true");
     el.style.maxWidth = "100%";
     el.style.maxHeight = "100%";
 
     const wrapper = document.createElement("div");
     wrapper.className = "video-wrapper";
     wrapper.setAttribute("data-kind", kind);
     if (trackId) wrapper.setAttribute("data-track-id", trackId);
     if (participantId) wrapper.setAttribute("data-participant", participantId);
 
     const isLocal = Boolean(opts.isLocal);
 
     if (isLocal) {
       wrapper.style.position = "absolute";
       wrapper.style.width = opts.width || opts.localWidth || "220px";
       wrapper.style.height = opts.height || opts.localHeight || "160px";
       wrapper.style.bottom = opts.bottom || "20px";
       wrapper.style.right = opts.right || "20px";
       wrapper.style.zIndex = typeof opts.zIndex !== "undefined" ? String(opts.zIndex) : (opts.localZIndex || "70");
       wrapper.style.borderRadius = opts.borderRadius || "10px";
       wrapper.style.overflow = "hidden";
       wrapper.style.boxShadow = "0 6px 18px rgba(0,0,0,0.45)";
       wrapper.style.border = opts.border || "2px solid rgba(255,255,255,0.95)";
       el.style.width = "100%";
       el.style.height = "100%";
       el.style.objectFit = opts.objectFitLocal || "cover";
       wrapper.style.pointerEvents = "none"; // overlay doesn't block controls
     } else {
       // remote main stage
       wrapper.style.position = "absolute";
       wrapper.style.top = "0";
       wrapper.style.left = "0";
       wrapper.style.width = "100%";
       wrapper.style.height = "100%";
       wrapper.style.zIndex = typeof opts.zIndex !== "undefined" ? String(opts.zIndex) : (opts.remoteZIndex || "20");
       wrapper.style.overflow = "hidden";
       el.style.width = "100%";
       el.style.height = "100%";
       el.style.objectFit = opts.objectFitRemote || "cover";
       el.style.background = "#000";
       wrapper.style.pointerEvents = "none";
     }
 
     if (opts.label) {
       const label = document.createElement("div");
       label.textContent = opts.label;
       label.style.position = "absolute";
       label.style.left = "8px";
       label.style.bottom = "6px";
       label.style.padding = "4px 8px";
       label.style.background = "rgba(0,0,0,0.6)";
       label.style.color = "#fff";
       label.style.borderRadius = "6px";
       label.style.fontSize = "12px";
       label.style.pointerEvents = "none";
       label.style.zIndex = "75";
       wrapper.appendChild(label);
     }
 
     wrapper.appendChild(el);
 
     // create overlay canvas for remote videos (always create, but only start detection if container.dataset.poseEnabled === "true")
     if (!isLocal && kind === "video") {
       const canvas = document.createElement("canvas");
       canvas.className = "pose-overlay-canvas";
       canvas.style.position = "absolute";
       canvas.style.left = "0";
       canvas.style.top = "0";
       canvas.style.width = "100%";
       canvas.style.height = "100%";
       canvas.style.pointerEvents = "none";
       canvas.style.zIndex = "30";
       wrapper.appendChild(canvas);
 
       // expose a start/stop controller placeholder
       wrapper._poseController = null;
 
       // If container explicitly enabled pose, start controller
       try {
         const poseEnabled = container && container.dataset && container.dataset.poseEnabled === "true";
         if (poseEnabled) {
           // lazy start
           ensureLoaded().then(() => {
             try {
               // ensure we have a video element to feed
               let videoEl = el;
               if (el.tagName && el.tagName.toLowerCase() !== "video") {
                 videoEl = wrapper.querySelector("video") || el;
               }
               startPoseLoop(videoEl, canvas).then((controller) => {
                 wrapper._poseController = controller;
               }).catch((e) => {
                 console.warn("startPoseLoop failed on attach:", e);
               });
             } catch (e) {
               console.warn("pose start error on attach:", e);
             }
           }).catch((e) => console.warn("ensureLoaded error:", e));
         }
       } catch (e) {
         console.warn("pose attach decision error:", e);
       }
     }
 
     container.appendChild(wrapper);
     return wrapper;
   } catch (e) {
     console.error("attachTrackOnce error:", e);
     return null;
   }
 }
 
 /**
  * detachTrack(container, track)
  * - stops pose controller if present and removes wrappers
  */
 export function detachTrack(container, track) {
   if (!track) return;
   try {
     const els = typeof track.detach === "function" ? track.detach() : null;
     if (Array.isArray(els)) {
       els.forEach((el) => {
         const wrapper = el.closest?.(".video-wrapper") || el.parentNode;
         if (wrapper) {
           try { wrapper._poseController && wrapper._poseController.stop && wrapper._poseController.stop(); } catch (e) {}
           if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
         } else if (el && el.parentNode) {
           el.parentNode.removeChild(el);
         }
       });
     } else if (els && els.parentNode) {
       const wrapper = els.closest?.(".video-wrapper") || els.parentNode;
       if (wrapper) {
         try { wrapper._poseController && wrapper._poseController.stop && wrapper._poseController.stop(); } catch (e) {}
         if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
       } else if (els && els.parentNode) els.parentNode.removeChild(els);
     }
   } catch (e) {
     console.warn("detachTrack error:", e);
   }
 }
 
 /**
  * enablePoseOnContainer(container)
  * - sets container.dataset.poseEnabled = "true" and starts controllers for all remote wrappers that have canvas
  */
 export async function enablePoseOnContainer(container) {
   if (!container) return;
   container.dataset.poseEnabled = "true";
   try {
     await ensureLoaded();
     const wrappers = container.querySelectorAll(".video-wrapper");
     wrappers.forEach((wrapper) => {
       try {
         const pId = wrapper.getAttribute("data-participant") || "";
         // only remote wrappers (heuristic: presence of canvas and not local size)
         const canvas = wrapper.querySelector(".pose-overlay-canvas");
         if (!canvas) return;
         // if controller already present, skip
         if (wrapper._poseController) return;
         // find the video element inside wrapper
         let videoEl = wrapper.querySelector("video");
         if (!videoEl) {
           const possible = wrapper.querySelector("video") || wrapper.firstChild;
           videoEl = possible && possible.tagName && possible.tagName.toLowerCase() === "video" ? possible : null;
         }
         if (!videoEl) return;
         startPoseLoop(videoEl, canvas).then((controller) => {
           wrapper._poseController = controller;
         }).catch((e) => console.warn("enablePose start failed:", e));
       } catch (e) {
         console.warn("enablePoseOnContainer error per wrapper:", e);
       }
     });
   } catch (e) {
     console.warn("enablePoseOnContainer ensureLoaded failed:", e);
   }
 }
 
 /**
  * disablePoseOnContainer(container)
  * - sets pose flag false and stops any running controllers
  */
 export function disablePoseOnContainer(container) {
   if (!container) return;
   container.dataset.poseEnabled = "false";
   try {
     const wrappers = container.querySelectorAll(".video-wrapper");
     wrappers.forEach((wrapper) => {
       try {
         if (wrapper._poseController) {
           try { wrapper._poseController.stop(); } catch (e) {}
           wrapper._poseController = null;
         }
         // clear canvas if present
         const canvas = wrapper.querySelector(".pose-overlay-canvas");
         if (canvas && canvas.getContext) {
           try { canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height); } catch (e) {}
         }
       } catch (e) {
         console.warn("disablePoseOnContainer error per wrapper:", e);
       }
     });
   } catch (e) {
     console.warn("disablePoseOnContainer error:", e);
   }
 }
 
 /**
  * wireParticipant(container, participant, opts)
  * - attaches existing publications and subscribes to trackSubscribed/trackUnsubscribed
  *
  * NEW behavior: pass opts.hideVideoForDoctors = true to avoid creating video wrappers for participants
  * whose identity starts with "doctor-". Audio remains subscribed so doctors can speak.
  */
 export function wireParticipant(container, participant, opts = {}) {
   try {
     const myIdentity = opts.myIdentity || "";
     const myRoleLabel = opts.myRoleLabel || "You";
     const remoteRoleLabel = opts.remoteRoleLabel || "Remote";
 
     // New option: hideVideoForDoctors (boolean)
     const hideVideoForDoctors = !!opts.hideVideoForDoctors;
 
     const explicitIsLocal = typeof opts.isLocal === "boolean" ? opts.isLocal : null;
     const isLocal = explicitIsLocal !== null ? explicitIsLocal : (myIdentity && participant.identity === myIdentity);
 
     const participantIsDoctor = /(^doctor-)/i.test(participant.identity || "");
 
     function makeLabelFor(participantIdentity) {
       const isMe = myIdentity && participantIdentity === myIdentity;
       return isMe ? `You (${myRoleLabel})` : `${participantIdentity} (${remoteRoleLabel})`;
     }
 
     // Helper: shouldAttachVideo (apply hide rule)
     function shouldAttachVideoFor(participant) {
       if (!participant) return true;
       if (hideVideoForDoctors && participantIsDoctor && !isLocal) return false; // hide remote doctor video
       return true;
     }
 
     participant.tracks.forEach((publication) => {
       if (!publication.track) return;
       const kind = publication.track.kind || (publication.track.mediaStreamTrack && publication.track.mediaStreamTrack.kind) || "video";
       if (kind === "video" && !shouldAttachVideoFor(participant)) {
         // skip attaching remote doctor video (still subscribe to audio)
         return;
       }
 
       try {
         attachTrackOnce(container, publication.track, {
           label: makeLabelFor(participant.identity),
           participant: participant.identity,
           isLocal,
           objectFitRemote: opts.objectFitRemote,
           objectFitLocal: opts.objectFitLocal,
           zIndex: isLocal ? (opts.localZIndex || 70) : (opts.remoteZIndex || 20),
           width: opts.localWidth,
           height: opts.localHeight
         });
       } catch (e) {
         console.warn("attach existing publication failed", e);
       }
     });
 
     participant.on("trackSubscribed", (track) => {
       // if it's a video and we must hide doctor's video, skip attaching
       if (track.kind === "video" && hideVideoForDoctors && participantIsDoctor && !isLocal) {
         // We still subscribed to track (audio/video) at Twilio level, but we intentionally don't create a visual wrapper.
         console.log("Skipping remote doctor video attach for", participant.identity);
         return;
       }
 
       attachTrackOnce(container, track, {
         label: makeLabelFor(participant.identity),
         participant: participant.identity,
         isLocal,
         objectFitRemote: opts.objectFitRemote,
         objectFitLocal: opts.objectFitLocal,
         zIndex: isLocal ? (opts.localZIndex || 70) : (opts.remoteZIndex || 20),
         width: opts.localWidth,
         height: opts.localHeight
       });
 
       // If container has pose enabled, try to enable newly attached wrapper
       if (container && container.dataset && container.dataset.poseEnabled === "true") {
         setTimeout(() => {
           const wrapper = container.querySelector(`.video-wrapper[data-participant="${participant.identity}"]`);
           if (wrapper && wrapper.querySelector(".pose-overlay-canvas") && !wrapper._poseController) {
             const canvas = wrapper.querySelector(".pose-overlay-canvas");
             const videoEl = wrapper.querySelector("video");
             if (videoEl && canvas) {
               startPoseLoop(videoEl, canvas).then((controller) => {
                 wrapper._poseController = controller;
               }).catch((e) => console.warn("startPoseLoop failed on new track:", e));
             }
           }
         }, 350);
       }
     });
 
     participant.on("trackUnsubscribed", (track) => {
       detachTrack(container, track);
     });
   } catch (e) {
     console.error("wireParticipant error:", e);
   }
 }