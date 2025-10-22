import React from "react";
import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => (
  <button
    onClick={() =>
      window.open("https://wa.me/6380085913", "_blank") // Replace with your WhatsApp number
    }
    className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-6 h-6" />
  </button>
);

export default FloatingWhatsApp;
