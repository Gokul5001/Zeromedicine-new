// // src/components/AiSensyWhatsApp.jsx
// import { useEffect } from "react";

// export default function FloatingWhatsApp() {
//   useEffect(() => {
//     // Avoid loading multiple times
//     if (document.getElementById("aisensy-wa-widget")) return;

//     const script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src =
//       "https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js";
//     script.id = "aisensy-wa-widget";
//     script.setAttribute("widget-id", "aaa77i");
//     script.async = true;

//     document.body.appendChild(script);

//     return () => {
//       // Optional cleanup (usually not required)
//       // document.getElementById("aisensy-wa-widget")?.remove();
//     };
//   }, []);

//   return null; // AiSensy injects its own floating button
// }


import whatsappIcon from "../assets/whatsapp-new.webp";

export default function WhatsAppChatButton() {
  const whatsappLink =
    "https://wa.me/919429692742?text=Hi%2C%20I%20want%20to%20take%20consultation%20with%20Zeromedixine";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
      }}
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp Chat"
        style={{
          width: "50px",
          height: "50px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          borderRadius: "50%",
        }}
      />
    </a>
  );
}
