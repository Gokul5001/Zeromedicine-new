
import React, { useEffect, useRef, useState } from "react"; 
import { useParams, useNavigate,useLocation  } from "react-router-dom";
import { connect as connectTwilio } from "twilio-video";
import { attachTrackOnce, detachTrack, wireParticipant, enablePoseOnContainer, disablePoseOnContainer } from "../utils/utils";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash, FaFileMedical, FaUserMd } from "react-icons/fa";
import { MdAccessibility, MdOutlineAccessibility } from "react-icons/md";
import PostureReport from "../utils/PostureReport";
import { FaCamera } from "react-icons/fa";


export default function DoctorJoin() {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const wrapRef = useRef(null);
  const [error, setError] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [poseEnabled, setPoseEnabled] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [connectionStats, setConnectionStats] = useState(null);
  const [joinedDoctors, setJoinedDoctors] = useState([]);
  

  const ranRef = useRef(false);
  const roomRef = useRef(null);
  const statsIntervalRef = useRef(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);

const doctorId = query.get("doctorId");
const doctorUsername = query.get("doctorUsername");

const isApp = query.get("platform") === "app";  // ✅ if mounted with platform=app
const isWeb = !isApp;

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    let stopped = false;

    const start = async () => {
      try {
        setIsConnecting(true);
        setError("");

        const tokenRes = await fetch("https://api.zeromedixine.com/api/video/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identity: `doctor-${Math.random().toString(36).slice(2)}`, room: roomName })
        });
        const tokenJson = await tokenRes.json();
        if (!tokenJson || !tokenJson.token) throw new Error("No token from server");

        const token = tokenJson.token;
        const room = await connectTwilio(token, { 
          audio: true, 
          video: true, 
          dominantSpeaker: true,
          networkQuality: { local: 1, remote: 1 },
          iceTransportPolicy: "relay",  

        });
        roomRef.current = room;
        console.log("✅ Twilio: joined room", room.name, "sid", room.sid);

        const container = wrapRef.current;
        const myIdentity = room.localParticipant.identity || "";

        // Initialize participants list
        const initial = [room.localParticipant];
        room.participants.forEach(p => initial.push(p));
        setParticipants(initial);

        // Update joined doctors list
        updateJoinedDoctors(initial, myIdentity);

        // Set container dataset pose flag initial state
        if (container) container.dataset.poseEnabled = poseEnabled ? "true" : "false";

        // Start connection stats monitoring
        startStatsMonitoring(room);

        // Only show local video if this is the primary doctor (first to join)
        const isPrimaryDoctor = isPrimaryDoctorInRoom(initial, myIdentity);
        if (isPrimaryDoctor) {
          // Attach local tracks (small overlay)
          room.localParticipant.tracks.forEach((pub) => {
            if (pub.track) {
              attachTrackOnce(container, pub.track, {
                label: `You (Doctor)`,
                participant: room.localParticipant.identity,
                isLocal: true,
                objectFitLocal: "cover",
                localZIndex: 90,
                localWidth: "220px",
                localHeight: "160px",
                bottom: "20px",
                right: "20px"
              });
            }
          });
        }

        // Attach existing remote participants
        room.participants.forEach((p) => {
          const isRemoteDoctor = p.identity.startsWith('doctor-');
          if (!isRemoteDoctor) { // Only wire patient for video display
            wireParticipant(container, p, {
              myIdentity,
              myRoleLabel: "Doctor",
              remoteRoleLabel: "Patient",
              isLocal: p.identity === myIdentity,
              objectFitRemote: "cover",
              objectFitLocal: "cover",
              remoteZIndex: 20,
              localZIndex: 90,
              localWidth: "220px",
              localHeight: "160px"
            });
          }
        });

        // Participant events
        room.on("participantConnected", (p) => {
          console.log("participantConnected", p.identity);
          setParticipants(prev => {
            const found = prev.find(x => x.identity === p.identity);
            if (found) return prev;
            return [...prev, p];
          });

          // Update joined doctors list
          updateJoinedDoctors([...participants, p], myIdentity);

          const isRemoteDoctor = p.identity.startsWith('doctor-');
          if (!isRemoteDoctor) { // Only wire patient for video display
            wireParticipant(container, p, {
              myIdentity,
              myRoleLabel: "Doctor",
              remoteRoleLabel: "Patient",
              isLocal: p.identity === myIdentity,
              objectFitRemote: "cover",
              objectFitLocal: "cover",
              remoteZIndex: 20,
              localZIndex: 90,
              localWidth: "220px",
              localHeight: "160px"
            });
          }
        });

        room.on("participantDisconnected", (p) => {
          console.log("participantDisconnected", p.identity);
          setParticipants(prev => prev.filter(part => part.identity !== p.identity));
          // Update joined doctors list
          updateJoinedDoctors(participants.filter(part => part.identity !== p.identity), myIdentity);
          p.tracks.forEach((pub) => pub.track && detachTrack(container, pub.track));
        });

        room.on("reconnecting", (err) => console.warn("TWILIO: reconnecting", err));
        room.on("reconnected", () => console.log("TWILIO: reconnected"));
        room.on("dominantSpeakerChanged", (s) => console.log("dominantSpeakerChanged", s && s.identity));

        room.on("disconnected", (roomObj, error) => {
          console.warn("TWILIO: disconnected", { room: roomObj?.name, error });
          try {
            fetch("https://api.zeromedixine.com/api/log-twilio-error", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ when: new Date().toISOString(), role: "doctor", room: roomObj?.name, error })
            }).catch(() => {});
          } catch (e) {}
          
          // cleanup
          stopStatsMonitoring();
          room.localParticipant.tracks.forEach((pub) => {
            if (pub.track) {
              try { pub.track.stop(); } catch (e) {}
              detachTrack(container, pub.track);
            }
          });
          container?.querySelectorAll("video,audio").forEach((el) => el.remove());
          setParticipants([]);
          setJoinedDoctors([]);
        });

        setIsConnecting(false);
      } catch (e) {
        console.error("DoctorJoin: connection error:", e);
        setError(e.message || "Failed to connect");
        setIsConnecting(false);
      }
    };

    const updateJoinedDoctors = (participantsList, myIdentity) => {
      const doctors = participantsList.filter(p => 
        p.identity.startsWith('doctor-') && p.identity !== myIdentity
      );
      setJoinedDoctors(doctors);
    };

    const isPrimaryDoctorInRoom = (participantsList, myIdentity) => {
      const doctors = participantsList.filter(p => p.identity.startsWith('doctor-'));
      const sortedDoctors = doctors.sort((a, b) => a.identity.localeCompare(b.identity));
      return sortedDoctors.length > 0 && sortedDoctors[0].identity === myIdentity;
    };

    const startStatsMonitoring = (room) => {
      statsIntervalRef.current = setInterval(async () => {
        try {
          const stats = await room.getStats();
          setConnectionStats({
            timestamp: new Date().toLocaleTimeString(),
            audio: {
              send: stats.localAudioTrackStats?.[0]?.bytesSent || 0,
              receive: stats.remoteAudioTrackStats?.[0]?.bytesReceived || 0
            },
            video: {
              send: stats.localVideoTrackStats?.[0]?.bytesSent || 0,
              receive: stats.remoteVideoTrackStats?.[0]?.bytesReceived || 0
            },
            participants: room.participants.size + 1 // +1 for local
          });
        } catch (error) {
          console.warn("Failed to get room stats:", error);
        }
      }, 5000);
    };

    const stopStatsMonitoring = () => {
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
        statsIntervalRef.current = null;
      }
    };

    start();

    return () => {
      stopStatsMonitoring();
      if (roomRef.current) {
        try { roomRef.current.disconnect(); } catch (e) {}
        roomRef.current = null;
      }
      stopped = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomName]);

  // Toggle audio
  const toggleAudio = () => {
    const room = roomRef.current;
    if (!room) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    try {
      const pubs = room.localParticipant && (room.localParticipant.audioTracks || room.localParticipant.tracks);
      if (!pubs) {
        console.warn("No local audio publications found");
        return;
      }

      pubs.forEach((pub) => {
        const t = pub && pub.track;
        if (!t) return;
        if (typeof t.enable === "function") t.enable(!nextMuted);
        else if (t.mediaStreamTrack && typeof t.mediaStreamTrack.enabled === "boolean") t.mediaStreamTrack.enabled = !nextMuted;
      });
    } catch (e) {
      console.warn("toggleAudio error", e);
    }
  };

  // Toggle video
  const toggleVideo = () => {
    const room = roomRef.current;
    if (!room) return;
    const nextVideoOff = !isVideoOff;
    setIsVideoOff(nextVideoOff);

    try {
      const pubs = room.localParticipant && (room.localParticipant.videoTracks || room.localParticipant.tracks);
      if (!pubs) {
        console.warn("No local video publications found");
        return;
      }

      pubs.forEach((pub) => {
        const t = pub && pub.track;
        if (!t) return;
        if (typeof t.enable === "function") t.enable(!nextVideoOff);
        else if (t.mediaStreamTrack && typeof t.mediaStreamTrack.enabled === "boolean") t.mediaStreamTrack.enabled = !nextVideoOff;
      });
    } catch (e) {
      console.warn("toggleVideo error", e);
    }
  };

  const capturePatientImage = () => {
    const container = wrapRef.current;
    if (!container) {
      alert("Video container not ready");
      return;
    }
  
    // Find patient video (exclude doctor local video)
    const videos = container.querySelectorAll("video");
  
    let patientVideo = null;
  
    videos.forEach((v) => {
      // Heuristic: patient video is NOT muted and larger
      if (!v.muted && v.videoWidth > 0) {
        patientVideo = v;
      }
    });
  
    if (!patientVideo) {
      alert("Patient video not found");
      return;
    }
  
    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.width = patientVideo.videoWidth;
    canvas.height = patientVideo.videoHeight;
  
    const ctx = canvas.getContext("2d");
    ctx.drawImage(patientVideo, 0, 0, canvas.width, canvas.height);
  
    // Convert to PNG & download
    canvas.toBlob((blob) => {
      if (!blob) return;
  
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
  
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      a.href = url;
      a.download = `patient-capture-${roomName}-${timestamp}.png`;
  
      document.body.appendChild(a);
      a.click();
  
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  
  
  // const endCall = () => {
  //   const room = roomRef.current;
  //   const container = wrapRef.current;
  //   if (room) {
  //     try {
  //       room.localParticipant.tracks.forEach((pub) => {
  //         if (pub.track) {
  //           try { pub.track.stop(); } catch (e) {}
  //           try { detachTrack(container, pub.track); } catch (e) {}
  //         }
  //       });
  //       room.disconnect();
  //     } catch (e) {
  //       console.warn("endCall error", e);
  //     }
  //   }
  //   container?.querySelectorAll("video,audio").forEach((el) => el.remove());
  //   roomRef.current = null;
  //   navigate("/");
  // };


  const endCall = () => {
    const room = roomRef.current;
    const container = wrapRef.current;
  
    if (room) {
      try {
        room.localParticipant.tracks.forEach((pub) => {
          if (pub.track) {
            try { pub.track.stop(); } catch (e) {}
            try { detachTrack(container, pub.track); } catch (e) {}
          }
        });
        room.disconnect();
      } catch (e) {
        console.warn("endCall error", e);
      }
    }
  
    container?.querySelectorAll("video,audio").forEach((el) => el.remove());
    roomRef.current = null;
  
    // ✅ Redirect doctor to his admin dashboard
    if (doctorId && doctorUsername) {
      navigate(`/patients/admin/${doctorUsername}/${doctorId}`);
    } else {
      // fallback
      navigate("/");
    }
  };

// 🔗 Android WebView JS bridge (FINAL SAFE VERSION)
useEffect(() => {
  if (!isApp) return;

  window.ZMVideo = window.ZMVideo || {};

  window.ZMVideo.muteAudio = () => {
    console.log("📱 App → muteAudio");
    if (!isMuted) toggleAudio();
  };

  window.ZMVideo.unmuteAudio = () => {
    console.log("📱 App → unmuteAudio");
    if (isMuted) toggleAudio();
  };

  window.ZMVideo.muteVideo = () => {
    console.log("📱 App → muteVideo");
    if (!isVideoOff) toggleVideo();
  };

  window.ZMVideo.unmuteVideo = () => {
    console.log("📱 App → unmuteVideo");
    if (isVideoOff) toggleVideo();
  };

  window.ZMVideo.endCall = () => {
    console.log("📱 App → endCall");
    endCall();
  };

  console.log("✅ ZMVideo bridge ready", Object.keys(window.ZMVideo));

  return () => {
    // ❌ DO NOT delete — Android may still call it
    console.log("ℹ️ ZMVideo bridge cleanup skipped");
  };
}, [isApp, isMuted, isVideoOff]);



  // Posture overlay toggle handlers
  const togglePoseOverlay = async () => {
    const container = wrapRef.current;
    if (!container) return;
    const next = !poseEnabled;
    setPoseEnabled(next);
    if (next) {
      container.dataset.poseEnabled = "true";
      try { 
        await enablePoseOnContainer(container); 
        console.log("Pose analysis enabled");
      } catch (e) { 
        console.warn("enablePose failed:", e);
        setPoseEnabled(false);
      }
    } else {
      container.dataset.poseEnabled = "false";
      try { 
        disablePoseOnContainer(container); 
        console.log("Pose analysis disabled");
      } catch (e) { 
        console.warn("disablePose failed:", e);
      }
    }
  };

  // Button style configuration
  const buttonStyle = {
    width: 55,
    height: 55,
    borderRadius: "50%",
    background: "#ffffff",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    outline: "none",
    transition: "all 0.2s ease-in-out"
  };

  const specialButtonStyle = {
    ...buttonStyle,
    borderRadius: "12px",
    flexDirection: "column",
    padding: "8px"
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
<div className="min-h-screen bg-gray-900 p-0">

        {/* Header */}
        {/* Joined Doctors List */}
        {joinedDoctors.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4 mb-4 shadow">
            <h3 className="text-lg font-semibold text-white mb-2">Joined Doctors</h3>
            <div className="flex flex-wrap gap-2">
              {joinedDoctors.map((doctor, index) => (
                <div key={doctor.identity} className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">
                    Doctor {index + 1} ({doctor.identity.replace('doctor-', '').substring(0, 8)}...)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-gray-800 rounded-lg p-4 shadow relative min-h-[600px]">
          <div className="flex justify-between items-center mb-5">
            {/* <h2 className="text-lg font-semibold text-white">Video Consultation</h2> */}
            <div className="flex items-center space-x-4">
              {poseEnabled && (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">AI Posture Active</span>
                </div>
              )}
              <div className="text-sm text-gray-300">
                {isMuted && <span className="text-red-400">Muted</span>}
                {isVideoOff && <span className="text-red-400 ml-2">Video Off</span>}
              </div>
            </div>
          </div>

          {isConnecting && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
                <p className="mt-4 text-gray-300">Connecting to video consultation...</p>
                <p className="text-sm text-gray-400 mt-2">Please wait while we establish the connection</p>
              </div>
            </div>
          )}

          {/* Main Video Container */}
          <div className="relative w-full h-[700px] bg-black rounded-lg overflow-hidden border-2 border-gray-600">
            <div
              ref={wrapRef}
              className="w-full h-full relative"
              style={{ position: "relative" }}
              data-pose-enabled={poseEnabled ? "true" : "false"}
            />
            
            {/* Connection Status Overlay */}
            {participants.filter(p => !p.identity.startsWith('doctor-')).length === 0 && !isConnecting && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                <div className="text-center text-white">
                  <div className="animate-pulse text-4xl mb-4">👨‍⚕️</div>
                  <h3 className="text-xl font-semibold mb-2">Waiting for Patient</h3>
                  <p className="text-gray-300">The patient will join shortly...</p>
                  {joinedDoctors.length > 0 && (
                    <p className="text-blue-300 mt-2">
                      {joinedDoctors.length} other doctor{joinedDoctors.length > 1 ? 's' : ''} joined the call
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Pose Analysis Indicator */}
            {poseEnabled && (
              <div className="absolute top-4 left-4 bg-green-600 bg-opacity-90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
                <MdAccessibility className="text-white" />
                <span>AI Posture Analysis Active</span>
              </div>
            )}
          </div>

          {/* Control Bar */}
          <div className="fixed left-1/2 transform -translate-x-1/2 bottom-8 z-90">
            <div className="flex items-center gap-4 rounded-full px-6 py-3 shadow-2xl">
              {/* Audio Toggle */}
              {isWeb && (

              <button
                onClick={toggleAudio}
                className="rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                style={buttonStyle}
                title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
              >

                {isMuted ? (
                  <FaMicrophoneSlash size={24} color="#e03a2f" />
                ) : (
                  <FaMicrophone size={24} color="#10b981" />
                )}
              </button>
)}

              {/* Video Toggle */}
              {isWeb && (
              <button
                onClick={toggleVideo}
                className="rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                style={buttonStyle}
                title={isVideoOff ? "Start Video" : "Stop Video"}
              >
                {isVideoOff ? (
                  <FaVideoSlash size={24} color="#e03a2f" />
                ) : (
                  <FaVideo size={24} color="#10b981" />
                )}
              </button>
              )}


              {/* End Call */}
              {/* <button
                onClick={endCall}
                className="rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 bg-red-500 hover:bg-red-600"
                style={{
                  ...buttonStyle,
                  background: "#e03a2f",
                }}
                title="End Consultation"
              >
                <FaPhoneSlash size={24} color="#ffffff" />
              </button> */}

{isWeb && (
  <button
    onClick={endCall}
    className="rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 bg-red-500 hover:bg-red-600"
    style={{
      ...buttonStyle,
      background: "#e03a2f",
    }}
    title="End Consultation"
  >
    <FaPhoneSlash size={24} color="#ffffff" />
  </button>
)}



              {/* Posture Overlay Toggle */}
              {/* <button
                onClick={togglePoseOverlay}
                className="rounded-xl flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95"
                style={{
                  ...specialButtonStyle,
                  background: poseEnabled ? "#10b981" : "#ffffff",
                }}
                title={poseEnabled ? "Disable Posture Analysis" : "Enable Posture Analysis"}
              >
                {poseEnabled ? (
                  <MdAccessibility size={20} color="#ffffff" />
                ) : (
                  <MdOutlineAccessibility size={20} color="#10b981" />
                )}
                <div className="text-xs font-bold mt-1" style={{ color: poseEnabled ? "#ffffff" : "#10b981" }}>
                  {poseEnabled ? "ON" : "OFF"}
                </div>
                <div className="text-xs" style={{ color: poseEnabled ? "#ffffff" : "#6b7280" }}>
                  Posture
                </div>
              </button> */}

              {/* Report Generator */}
              {/* <button
                onClick={() => setShowReport(true)}
                className="rounded-xl flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95"
                style={{
                  ...specialButtonStyle,
                  background: "#3b82f6",
                }}
                title="Generate Posture Analysis Report"
              >
                <FaFileMedical size={18} color="#ffffff" />
                <div className="text-xs font-bold mt-1 text-white">
                  
                </div>
              </button> */}
              {/* Capture Image */}
{/* <button
  onClick={capturePatientImage}
  className="rounded-xl flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95"
  style={{
    ...specialButtonStyle,
    background: "#f59e0b",
  }}
  title="Capture Patient Image"
>
  <FaCamera size={18} color="#ffffff" />
  <div className="text-xs font-bold mt-1 text-white">
    
  </div>
</button> */}

{isWeb && (
  <button
    onClick={capturePatientImage}
    className="rounded-xl flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95"
    style={{
      ...specialButtonStyle,
      background: "#f59e0b",
    }}
    title="Capture Patient Image"
  >
    <FaCamera size={18} color="#ffffff" />
  </button>
)}


            </div>
          </div>

          {/* Participant Info Footer */}
          <div className="mt-4 text-center">
            <div className="text-gray-400 text-sm">
              {participants.filter(p => !p.identity.startsWith('doctor-')).length > 0 ? (
                <div className="flex justify-center space-x-6">
                  {participants.filter(p => !p.identity.startsWith('doctor-')).map((participant, index) => (
                    <div key={participant.identity} className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Patient {index + 1}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span>Waiting for patient to join...</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Posture Report Modal */}
      <PostureReport
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        roomName={roomName}
      />
    </div>
  );
}