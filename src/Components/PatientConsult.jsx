// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { connect as connectTwilio,createLocalVideoTrack  } from "twilio-video";
// import { attachTrackOnce, detachTrack, wireParticipant } from "../utils/utils";
// import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from "react-icons/fa";

// export default function PatientConsult() {
//   const { roomName } = useParams();
//   const navigate = useNavigate();
//   const wrapRef = useRef(null);
//   const [error, setError] = useState("");
//   const [isConnecting, setIsConnecting] = useState(true);
//   const [participants, setParticipants] = useState([]);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [cameraFacing, setCameraFacing] = useState("user"); 

//   // 🔥 Transcript States
//   const [transcriptText, setTranscriptText] = useState("");
//   const recognitionRef = useRef(null);


//     // 🎙 Start Speech Recognition
//   // ==========================
// const startSpeechRecognition = () => {
//   const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;

//   if (!SpeechRecognition) {
//     console.warn("Web Speech API not supported in this browser");
//     return;
//   }

//   const recognition = new SpeechRecognition();
//   recognition.lang = "en-IN";
//   recognition.continuous = true;
//   recognition.interimResults = true;
//   recognition.maxAlternatives = 3; // ✅ Try multiple alternatives for fast speech

//   let interimBuffer = "";         // holds current interim text
//   let restartTimer = null;

//   recognition.onresult = (event) => {
//     let interimTranscript = "";
//     let finalTranscript = "";

//     for (let i = event.resultIndex; i < event.results.length; ++i) {
//       const result = event.results[i];

//       // ✅ Pick best alternative based on confidence
//       let bestTranscript = result[0].transcript;
//       let bestConfidence = result[0].confidence;

//       for (let j = 1; j < result.length; j++) {
//         if (result[j].confidence > bestConfidence) {
//           bestConfidence = result[j].confidence;
//           bestTranscript = result[j].transcript;
//         }
//       }

//       if (result.isFinal) {
//         // ✅ Accept even low-confidence finals (fast speech often scores lower)
//         if (bestConfidence > 0.1 || bestTranscript.trim().length > 0) {
//           finalTranscript += bestTranscript + " ";
//         }
//       } else {
//         interimTranscript += bestTranscript;
//       }
//     }

//     // ✅ Show interim text live in UI so user sees it being captured
//     interimBuffer = interimTranscript;

//     if (finalTranscript.trim() !== "") {
//       setTranscriptText(prev => {
//         // ✅ Avoid duplicate appends on rapid fire events
//         const trimmedFinal = finalTranscript.trim();
//         if (prev.trim().endsWith(trimmedFinal)) return prev;
//         return prev + finalTranscript;
//       });
//       interimBuffer = "";
//     }

//     // ✅ Always update interim display
//     setInterimText(interimBuffer);
//   };

//   recognition.onerror = (e) => {
//     console.warn("Speech recognition error:", e.error);

//     if (["network", "audio-capture", "no-speech"].includes(e.error)) {
//       clearTimeout(restartTimer);
//       restartTimer = setTimeout(() => {
//         if (roomRef.current) {
//           try { recognition.start(); } catch (err) {}
//         }
//       }, 800);
//     }
//   };

//   recognition.onend = () => {
//     clearTimeout(restartTimer);
//     if (roomRef.current) {
//       restartTimer = setTimeout(() => {
//         try { recognition.start(); } catch (e) {
//           console.warn("Restart failed:", e);
//         }
//       }, 300); // ✅ Shorter delay = less missed speech between sessions
//     }
//   };

//   recognition.start();
//   recognitionRef.current = recognition;
// };



//   const ranRef = useRef(false);
//   const roomRef = useRef(null);

//   useEffect(() => {
//     if (ranRef.current) return;
//     ranRef.current = true;

//     const start = async () => {
//       try {
//         setIsConnecting(true);
//         setError("");

//         const tokenRes = await fetch("https://api.zeromedixine.com/api/video/token", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ identity: `patient-${Math.random().toString(36).slice(2)}`, room: roomName })
//         });
//         const tokenJson = await tokenRes.json();
//         if (!tokenJson || !tokenJson.token) throw new Error("No token from server");

//         const token = tokenJson.token;

//         const room = await connectTwilio(token, { audio: true, video: true, dominantSpeaker: true });
//         roomRef.current = room;
//         console.log("✅ Twilio: joined room", room.name, "sid", room.sid);

//         const container = wrapRef.current;
//         const myIdentity = room.localParticipant.identity || "";

//         // Initialize participants list - include local participant first
//         const initial = [room.localParticipant];
//         room.participants.forEach(p => initial.push(p));
//         setParticipants(initial);

//         // Attach local tracks (small overlay for patient)
//         room.localParticipant.tracks.forEach((pub) => {
//           if (pub.track) {
//             attachTrackOnce(container, pub.track, {
//               label: `You (Patient)`,
//               participant: room.localParticipant.identity,
//               isLocal: true,
//               objectFitLocal: "cover",
//               localZIndex: 70,
//               localWidth: "200px",
//               localHeight: "150px",
//               bottom: "20px",
//               right: "20px"
//             });
//           }
//         });

//         // Attach existing remote participants
//         room.participants.forEach((p) =>
//           wireParticipant(container, p, {
//             myIdentity,
//             myRoleLabel: "Patient",
//             remoteRoleLabel: "Doctor",
//             isLocal: p.identity === myIdentity,
//             objectFitRemote: "cover",
//             objectFitLocal: "cover",
//             remoteZIndex: 20,
//             localZIndex: 70,
//             localWidth: "200px",
//             localHeight: "150px"
//           })
//         );

//         room.on("participantConnected", (p) => {
//           setParticipants(prev => {
//             const found = prev.find(x => x.identity === p.identity);
//             if (found) return prev;
//             return [...prev, p];
//           });

//           wireParticipant(container, p, {
//             myIdentity,
//             myRoleLabel: "Patient",
//             remoteRoleLabel: "Doctor",
//             isLocal: p.identity === myIdentity,
//             objectFitRemote: "cover",
//             objectFitLocal: "cover",
//             remoteZIndex: 20,
//             localZIndex: 70,
//             localWidth: "200px",
//             localHeight: "150px"
//           });
//         });

//         room.on("participantDisconnected", (p) => {
//           setParticipants(prev => prev.filter(part => part.identity !== p.identity));
//           p.tracks.forEach((pub) => pub.track && detachTrack(container, pub.track));
//         });

//         room.on("disconnected", (roomObj, error) => {
//           room.localParticipant.tracks.forEach((pub) => {
//             if (pub.track) {
//               try { pub.track.stop(); } catch (e) {}
//               detachTrack(container, pub.track);
//             }
//           });
//           container?.querySelectorAll("video,audio").forEach((el) => el.remove());
//           setParticipants([]);
//         });

//         setIsConnecting(false);
//         startSpeechRecognition();

//       } catch (e) {
//         console.error("PatientJoin: connection error:", e);
//         setError(e.message || "Failed to connect");
//         setIsConnecting(false);
//       }
//     };

//     start();

//     return () => {
//       if (roomRef.current) {
//         try { roomRef.current.disconnect(); } catch (e) {}
//         roomRef.current = null;
//       }
//     };
//   }, [roomName]);

//   // Helper function to enable/disable tracks
//   const setPublicationTrackEnabled = (pub, enabled) => {
//     try {
//       const t = pub && pub.track;
//       if (!t) return false;

//       if (typeof t.enable === "function") {
//         t.enable(enabled);
//         return true;
//       }

//       if (t.mediaStreamTrack && typeof t.mediaStreamTrack.enabled === "boolean") {
//         t.mediaStreamTrack.enabled = enabled;
//         return true;
//       }

//       if (!enabled && typeof t.disable === "function") {
//         t.disable();
//         return true;
//       }

//       if (!enabled && typeof t.stop === "function") {
//         t.stop();
//         return true;
//       }

//       return false;
//     } catch (err) {
//       console.warn("setPublicationTrackEnabled error", err);
//       return false;
//     }
//   };

//   const toggleAudio = () => {
//     const room = roomRef.current;
//     if (!room) return;
//     const nextMuted = !isMuted;
//     setIsMuted(nextMuted);

//     try {
//       const pubs = room.localParticipant && (room.localParticipant.audioTracks || room.localParticipant.tracks);
//       if (!pubs) {
//         console.warn("No local audio publications found");
//         return;
//       }

//       pubs.forEach((pub) => {
//         setPublicationTrackEnabled(pub, !nextMuted);
//       });
//     } catch (e) {
//       console.warn("toggleAudio error", e);
//     }
//   };

//   const toggleVideo = () => {
//     const room = roomRef.current;
//     if (!room) return;
//     const nextVideoOff = !isVideoOff;
//     setIsVideoOff(nextVideoOff);

//     try {
//       const pubs = room.localParticipant && (room.localParticipant.videoTracks || room.localParticipant.tracks);
//       if (!pubs) {
//         console.warn("No local video publications found");
//         return;
//       }

//       pubs.forEach((pub) => {
//         setPublicationTrackEnabled(pub, !nextVideoOff);
//       });
//     } catch (e) {
//       console.warn("toggleVideo error", e);
//     }
//   };

//   // const endCall = () => {
//   //   const room = roomRef.current;
//   //   const container = wrapRef.current;
//   //   if (room) {
//   //     try {
//   //       room.localParticipant.tracks.forEach((pub) => {
//   //         if (pub.track) {
//   //           try { pub.track.stop(); } catch (e) {}
//   //           try { detachTrack(container, pub.track); } catch (e) {}
//   //         }
//   //       });
//   //       room.disconnect();
//   //     } catch (e) {
//   //       console.warn("endCall error", e);
//   //     }
//   //   }
//   //   container?.querySelectorAll("video,audio").forEach((el) => el.remove());
//   //   roomRef.current = null;
//   //   navigate("/");
//   // };


//   const endCall = async () => {
//     const room = roomRef.current;
//     const container = wrapRef.current;
  
//     try {
//       // 🔥 STOP speech recognition first
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
  
//       // 🔥 Save transcript ONLY IF something exists
//       if (transcriptText.trim() !== "") {
//         await fetch("https://srv1090011.hstgr.cloud/api/video/save-transcript", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             roomName,
//             transcript: transcriptText
//           })
//         });
//       }
      
  
//     } catch (err) {
//       console.error("Transcript save failed:", err);
//     }
  
//     // Disconnect Twilio
//     if (room) {
//       try {
//         room.localParticipant.tracks.forEach((pub) => {
//           if (pub.track) {
//             try { pub.track.stop(); } catch (e) {}
//             try { detachTrack(container, pub.track); } catch (e) {}
//           }
//         });
//         room.disconnect();
//       } catch (e) {
//         console.warn("endCall error", e);
//       }
//     }
  
//     container?.querySelectorAll("video,audio").forEach((el) => el.remove());
//     roomRef.current = null;
  
//     navigate("/");
//   };
  

//   const switchCamera = async () => {
//     const room = roomRef.current;
//     if (!room) return;
  
//     try {
//       const newFacing = cameraFacing === "user" ? "environment" : "user";
  
//       // Stop & unpublish old video tracks
//       const videoPubs = room.localParticipant.videoTracks;
//       videoPubs.forEach((pub) => {
//         if (pub.track) {
//           pub.track.stop();
//           room.localParticipant.unpublishTrack(pub.track);
//           detachTrack(wrapRef.current, pub.track);
//         }
//       });
  
//       // Create new track with new camera
//       const newTrack = await createLocalVideoTrack({
//         facingMode: { exact: newFacing }
//       });
  
//       // Publish new track
//       await room.localParticipant.publishTrack(newTrack);
  
//       // Attach to UI
//       attachTrackOnce(wrapRef.current, newTrack, {
//         label: "You (Patient)",
//         participant: room.localParticipant.identity,
//         isLocal: true,
//         objectFitLocal: "cover",
//         localZIndex: 70,
//         localWidth: "200px",
//         localHeight: "150px",
//         bottom: "20px",
//         right: "20px"
//       });
  
//       setCameraFacing(newFacing);
//     } catch (err) {
//       console.error("Camera switch failed:", err);
  
//       // fallback (some browsers don’t support exact)
//       try {
//         const newFacing = cameraFacing === "user" ? "environment" : "user";
//         const newTrack = await createLocalVideoTrack({
//           facingMode: newFacing
//         });
  
//         await room.localParticipant.publishTrack(newTrack);
//         setCameraFacing(newFacing);
//       } catch (e) {
//         console.error("Fallback camera switch failed:", e);
//       }
//     }
//   };

  
//   // small shared style object for buttons (keeps styles identical to Doctor page)
//   const buttonStyle = {
//     width: 55,
//     height: 55,
//     borderRadius: "50%",
//     background: "#ffffff",
//     boxShadow: "0px 3px 8px rgba(0,0,0,0.25)", // slightly softer
//     border: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     outline: "none"
//   };

//   return (
// <div className="h-screen bg-gray-900 overflow-hidden flex flex-col">
// <div className="flex flex-col flex-1 max-w-7xl mx-auto w-full px-6 py-4">
     

// <div className="bg-gray-800 rounded-lg p-4 shadow relative flex flex-col flex-1">
//           <h2 className="text-lg font-semibold text-white mb-4">Video Consultation</h2>

//           {isConnecting && (
//             <div className="flex justify-center items-center py-12">
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
//                 <p className="mt-4 text-gray-300">Connecting to video consultation...</p>
//               </div>
//             </div>
//           )}

// <div className="relative flex-1 w-full bg-black rounded-lg overflow-hidden">
//             <div
//               ref={wrapRef}
//               className="w-full h-full relative"
//               style={{ position: "relative" }}
//             />
//           </div>

// {/* Waiting for Doctor Overlay */}
// {participants.filter(p => p.identity.startsWith("doctor-")).length === 0 && !isConnecting && (
//   <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
//     <div className="text-center text-white">
//       <div className="animate-pulse text-4xl mb-4">👨‍⚕️</div>
//       <h3 className="text-xl font-semibold mb-2">Waiting for Doctor</h3>
//       <p className="text-gray-300">The doctor will join shortly...</p>
//     </div>
//   </div>
// )}


//        {/* 📝 Live Transcript Overlay */}
//        <div
//   style={{
//     position: "absolute",
//     top: "15px",
//     right: "15px",
//     width: "320px",
//     maxHeight: "45%",
//     overflowY: "auto",
//     background: "rgba(0,0,0,0.7)",
//     padding: "12px",
//     borderRadius: "10px",
//     color: "#fff",
//     fontSize: "14px",
//     zIndex: 1500
//   }}
// >
//   <h4 style={{ fontWeight: "bold", marginBottom: "8px" }}>
//     📝 Live Transcript
//   </h4>

//   {transcriptText.trim() === "" ? (
//     <p style={{ color: "#ccc" }}>Listening...</p>
//   ) : (
//     <p style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
//       {transcriptText}
//     </p>
//   )}
// </div>


//           {/* Control Bar: fixed, centered, high z-index */}
//           <div
// className="absolute left-1/2 transform -translate-x-1/2 bottom-2"
//             style={{ zIndex: 2000 }} // keep it above overlays
//           >
//             <div className="flex items-center gap-6">
//               <button
//                 onClick={toggleAudio}
//                 aria-label={isMuted ? "Unmute" : "Mute"}
//                 style={buttonStyle}
//               >
//                 {isMuted ? (
//                   <FaMicrophoneSlash size={22} color="#e03a2f" />
//                 ) : (
//                   <FaMicrophone size={22} color="#e03a2f" />
//                 )}
//               </button>

//               <button
//                 onClick={endCall}
//                 aria-label="End call"
//                 style={buttonStyle}
//               >
//                 <FaPhoneSlash size={22} color="#e03a2f" />
//               </button>

//               <button
//                 onClick={toggleVideo}
//                 aria-label={isVideoOff ? "Start video" : "Stop video"}
//                 style={buttonStyle}
//               >
//                 {isVideoOff ? (
//                   <FaVideoSlash size={22} color="#e03a2f" />
//                 ) : (
//                   <FaVideo size={22} color="#e03a2f" />
//                 )}
//               </button>
//               <button
//   onClick={switchCamera}
//   aria-label="Switch camera"
//   style={buttonStyle}
// >
//   🔄
// </button>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect as connectTwilio, createLocalVideoTrack } from "twilio-video";
import { attachTrackOnce, detachTrack, wireParticipant } from "../utils/utils";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from "react-icons/fa";

// 🔑 PUT YOUR DEEPGRAM KEY HERE
const DEEPGRAM_API_KEY = "925ba84b231b00a10d9918e864b2d18d80d48a08";

export default function PatientConsult() {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const wrapRef = useRef(null);
  const [error, setError] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [cameraFacing, setCameraFacing] = useState("user");

  // 🔥 Transcript States
  const [transcriptText, setTranscriptText] = useState("");
  const [interimText, setInterimText] = useState(""); // ✅ NEW: live interim display
  const lastSavedRef = useRef("");
  // ✅ REPLACED: recognitionRef → deepgram refs
  const deepgramSocketRef = useRef(null);
  const audioProcessorRef = useRef(null);

  const ranRef = useRef(false);
  const roomRef = useRef(null);

  // ✅ NEW: Deepgram transcription (replaces startSpeechRecognition entirely)
  const startDeepgramTranscription = (room) => {
    try {
      // Get audio track from Twilio (no new mic request = no conflict on mobile)
      let mediaStream = null;
      room.localParticipant.audioTracks.forEach((pub) => {
        if (pub.track && pub.track.mediaStreamTrack) {
          mediaStream = new MediaStream([pub.track.mediaStreamTrack]);
        }
      });

      if (!mediaStream) {
        console.warn("No audio track found from Twilio");
        return;
      }

      // Connect to Deepgram WebSocket
      const socket = new WebSocket(
        "wss://api.deepgram.com/v1/listen?" +
          new URLSearchParams({
            language: "en-IN",
            model: "nova-2",
            smart_format: "true",
            interim_results: "true",
            endpointing: "300",
            encoding: "linear16",
            sample_rate: "16000",
            channels: "1",
          }),
        ["token", DEEPGRAM_API_KEY]
      );

      deepgramSocketRef.current = socket;

      socket.onopen = () => {
        console.log("✅ Deepgram connected");

        const audioContext = new (window.AudioContext || window.webkitAudioContext)({
          sampleRate: 16000,
        });

        const source = audioContext.createMediaStreamSource(mediaStream);
        const processor = audioContext.createScriptProcessor(4096, 1, 1);

        processor.onaudioprocess = (e) => {
          if (socket.readyState !== WebSocket.OPEN) return;
          const inputData = e.inputBuffer.getChannelData(0);
          const int16 = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            const s = Math.max(-1, Math.min(1, inputData[i]));
            int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
          }
          socket.send(int16.buffer);
        };

        source.connect(processor);
        processor.connect(audioContext.destination);
        audioProcessorRef.current = { audioContext, processor, source };
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const transcript = data?.channel?.alternatives?.[0]?.transcript || "";
          const isFinal = data?.is_final;

          if (transcript.trim() === "") return;

          if (isFinal) {
            setTranscriptText((prev) => prev + transcript + " ");
            setInterimText("");
          } else {
            setInterimText(transcript); // live preview
          }
        } catch (e) {
          console.warn("Deepgram parse error", e);
        }
      };

      socket.onerror = (e) => console.error("Deepgram error", e);
      socket.onclose = () => console.log("Deepgram socket closed");

    } catch (err) {
      console.error("startDeepgramTranscription failed:", err);
    }
  };

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const start = async () => {
      try {
        setIsConnecting(true);
        setError("");

        const tokenRes = await fetch("https://api.zeromedixine.com/api/video/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identity: `patient-${Math.random().toString(36).slice(2)}`, room: roomName })
        });
        const tokenJson = await tokenRes.json();
        if (!tokenJson || !tokenJson.token) throw new Error("No token from server");

        const token = tokenJson.token;
        const room = await connectTwilio(token, { audio: true, video: true,  iceTransportPolicy: "relay",  dominantSpeaker: true });
        roomRef.current = room;
        console.log("✅ Twilio: joined room", room.name, "sid", room.sid);

        const container = wrapRef.current;
        const myIdentity = room.localParticipant.identity || "";

        const initial = [room.localParticipant];
        room.participants.forEach(p => initial.push(p));
        setParticipants(initial);

        room.localParticipant.tracks.forEach((pub) => {
          if (pub.track) {
            attachTrackOnce(container, pub.track, {
              label: `You (Patient)`,
              participant: room.localParticipant.identity,
              isLocal: true,
              objectFitLocal: "cover",
              localZIndex: 70,
              localWidth: "200px",
              localHeight: "150px",
              bottom: "20px",
              right: "20px"
            });
          }
        });

        room.participants.forEach((p) =>
          wireParticipant(container, p, {
            myIdentity,
            myRoleLabel: "Patient",
            remoteRoleLabel: "Doctor",
            isLocal: p.identity === myIdentity,
            objectFitRemote: "cover",
            objectFitLocal: "cover",
            remoteZIndex: 20,
            localZIndex: 70,
            localWidth: "200px",
            localHeight: "150px"
          })
        );

        room.on("participantConnected", (p) => {
          setParticipants(prev => {
            const found = prev.find(x => x.identity === p.identity);
            if (found) return prev;
            return [...prev, p];
          });
          wireParticipant(container, p, {
            myIdentity,
            myRoleLabel: "Patient",
            remoteRoleLabel: "Doctor",
            isLocal: p.identity === myIdentity,
            objectFitRemote: "cover",
            objectFitLocal: "cover",
            remoteZIndex: 20,
            localZIndex: 70,
            localWidth: "200px",
            localHeight: "150px"
          });
        });

        room.on("participantDisconnected", (p) => {
          setParticipants(prev => prev.filter(part => part.identity !== p.identity));
          p.tracks.forEach((pub) => pub.track && detachTrack(container, pub.track));
        });

        room.on("disconnected", () => {
          room.localParticipant.tracks.forEach((pub) => {
            if (pub.track) {
              try { pub.track.stop(); } catch (e) {}
              detachTrack(container, pub.track);
            }
          });
          container?.querySelectorAll("video,audio").forEach((el) => el.remove());
          setParticipants([]);
        });

        setIsConnecting(false);
        startDeepgramTranscription(room); // ✅ REPLACED: was startSpeechRecognition()

      } catch (e) {
        console.error("PatientJoin: connection error:", e);
        setError(e.message || "Failed to connect");
        setIsConnecting(false);
      }
    };

    start();

    return () => {
      if (roomRef.current) {
        try { roomRef.current.disconnect(); } catch (e) {}
        roomRef.current = null;
      }
    };
  }, [roomName]);


  useEffect(() => {
    const interval = setInterval(() => {
      if (!transcriptText.trim()) return;
  
      const lastSaved = lastSavedRef.current;
  
      // ✅ only new text
      const newChunk = transcriptText.substring(lastSaved.length);
  
      if (!newChunk.trim()) return;
  
      console.log("💾 Sending chunk:", newChunk);
  
      fetch("https://srv1090011.hstgr.cloud/api/video/save-transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          roomName,
          chunk: newChunk   // 🔥 IMPORTANT CHANGE
        })
      })
        .then(() => {
          lastSavedRef.current = transcriptText; // update pointer
        })
        .catch((err) => {
          console.warn("Auto-save failed:", err);
        });
  
    }, 5000); // every 5 sec
  
    return () => clearInterval(interval);
  }, [transcriptText, roomName]);


  const setPublicationTrackEnabled = (pub, enabled) => {
    try {
      const t = pub && pub.track;
      if (!t) return false;
      if (typeof t.enable === "function") { t.enable(enabled); return true; }
      if (t.mediaStreamTrack && typeof t.mediaStreamTrack.enabled === "boolean") {
        t.mediaStreamTrack.enabled = enabled; return true;
      }
      if (!enabled && typeof t.disable === "function") { t.disable(); return true; }
      if (!enabled && typeof t.stop === "function") { t.stop(); return true; }
      return false;
    } catch (err) {
      console.warn("setPublicationTrackEnabled error", err);
      return false;
    }
  };

  const toggleAudio = () => {
    const room = roomRef.current;
    if (!room) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    try {
      const pubs = room.localParticipant.audioTracks || room.localParticipant.tracks;
      pubs?.forEach((pub) => setPublicationTrackEnabled(pub, !nextMuted));
    } catch (e) { console.warn("toggleAudio error", e); }
  };

  const toggleVideo = () => {
    const room = roomRef.current;
    if (!room) return;
    const nextVideoOff = !isVideoOff;
    setIsVideoOff(nextVideoOff);
    try {
      const pubs = room.localParticipant.videoTracks || room.localParticipant.tracks;
      pubs?.forEach((pub) => setPublicationTrackEnabled(pub, !nextVideoOff));
    } catch (e) { console.warn("toggleVideo error", e); }
  };

  const endCall = async () => {
    const room = roomRef.current;
    const container = wrapRef.current;

    try {
      // ✅ REPLACED: stop Deepgram instead of SpeechRecognition
      if (deepgramSocketRef.current) {
        deepgramSocketRef.current.close();
        deepgramSocketRef.current = null;
      }

      // ✅ NEW: stop AudioContext processor
      if (audioProcessorRef.current) {
        const { audioContext, processor, source } = audioProcessorRef.current;
        try { source.disconnect(); processor.disconnect(); audioContext.close(); } catch (e) {}
        audioProcessorRef.current = null;
      }

      const remainingChunk = transcriptText.substring(lastSavedRef.current);


      // Save transcript if exists
   if (remainingChunk.trim() !== "") {
  await fetch("https://srv1090011.hstgr.cloud/api/video/save-transcript", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      roomName,
      chunk: remainingChunk
    })
  });
}

    }
    
    catch (err) {
      console.error("Transcript save failed:", err);
    }

    if (room) {
      try {
        room.localParticipant.tracks.forEach((pub) => {
          if (pub.track) {
            try { pub.track.stop(); } catch (e) {}
            try { detachTrack(container, pub.track); } catch (e) {}
          }
        });
        room.disconnect();
      } catch (e) { console.warn("endCall error", e); }
    }

    container?.querySelectorAll("video,audio").forEach((el) => el.remove());
    roomRef.current = null;
    navigate("/");
  };

  const switchCamera = async () => {
    const room = roomRef.current;
    if (!room) return;
    try {
      const newFacing = cameraFacing === "user" ? "environment" : "user";
      const videoPubs = room.localParticipant.videoTracks;
      videoPubs.forEach((pub) => {
        if (pub.track) {
          pub.track.stop();
          room.localParticipant.unpublishTrack(pub.track);
          detachTrack(wrapRef.current, pub.track);
        }
      });
      const newTrack = await createLocalVideoTrack({ facingMode: { exact: newFacing } });
      await room.localParticipant.publishTrack(newTrack);
      attachTrackOnce(wrapRef.current, newTrack, {
        label: "You (Patient)", participant: room.localParticipant.identity,
        isLocal: true, objectFitLocal: "cover", localZIndex: 70,
        localWidth: "200px", localHeight: "150px", bottom: "20px", right: "20px"
      });
      setCameraFacing(newFacing);
    } catch (err) {
      console.error("Camera switch failed:", err);
      try {
        const newFacing = cameraFacing === "user" ? "environment" : "user";
        const newTrack = await createLocalVideoTrack({ facingMode: newFacing });
        await room.localParticipant.publishTrack(newTrack);
        setCameraFacing(newFacing);
      } catch (e) { console.error("Fallback camera switch failed:", e); }
    }
  };

  const buttonStyle = {
    width: 55, height: 55, borderRadius: "50%", background: "#ffffff",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.25)", border: "none",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", outline: "none"
  };

  return (
    <div className="h-screen bg-gray-900 overflow-hidden flex flex-col">
      <div className="flex flex-col flex-1 max-w-7xl mx-auto w-full px-6 py-4">
        <div className="bg-gray-800 rounded-lg p-4 shadow relative flex flex-col flex-1">
          <h2 className="text-lg font-semibold text-white mb-4">Video Consultation</h2>

          {isConnecting && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
                <p className="mt-4 text-gray-300">Connecting to video consultation...</p>
              </div>
            </div>
          )}

          <div className="relative flex-1 w-full bg-black rounded-lg overflow-hidden">
            <div ref={wrapRef} className="w-full h-full relative" style={{ position: "relative" }} />
          </div>

          {participants.filter(p => p.identity.startsWith("doctor-")).length === 0 && !isConnecting && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <div className="text-center text-white">
                <div className="animate-pulse text-4xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-semibold mb-2">Waiting for Doctor</h3>
                <p className="text-gray-300">The doctor will join shortly...</p>
              </div>
            </div>
          )}

          {/* ✅ UPDATED: Live Transcript Overlay with interim text */}
      

          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-2" style={{ zIndex: 2000 }}>
            <div className="flex items-center gap-6">
              <button onClick={toggleAudio} aria-label={isMuted ? "Unmute" : "Mute"} style={buttonStyle}>
                {isMuted ? <FaMicrophoneSlash size={22} color="#e03a2f" /> : <FaMicrophone size={22} color="#e03a2f" />}
              </button>
              <button onClick={endCall} aria-label="End call" style={buttonStyle}>
                <FaPhoneSlash size={22} color="#e03a2f" />
              </button>
              <button onClick={toggleVideo} aria-label={isVideoOff ? "Start video" : "Stop video"} style={buttonStyle}>
                {isVideoOff ? <FaVideoSlash size={22} color="#e03a2f" /> : <FaVideo size={22} color="#e03a2f" />}
              </button>
              <button onClick={switchCamera} aria-label="Switch camera" style={buttonStyle}>🔄</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}