import React, { useState } from "react";
import { requestFCMToken } from "../utils/firebaseUtils";

const FCMTokenPage = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateToken = async () => {
    setLoading(true);
    setError("");
    setToken("");

    try {
      const fcmToken = await requestFCMToken();
      setToken(fcmToken);
    } catch (err) {
      setError("Failed to generate FCM token. Check console.");
      console.error(err);
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    alert("Token copied to clipboard ✅");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Firebase FCM Token Generator
        </h2>

        <button
          onClick={handleGenerateToken}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          {loading ? "Generating..." : "Generate FCM Token"}
        </button>

        {token && (
          <div className="mt-6">
            <p className="font-semibold mb-2">Your FCM Token:</p>
            <textarea
              value={token}
              readOnly
              className="w-full h-32 p-3 border rounded-lg text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Copy Token
            </button>
          </div>
        )}

        {error && (
          <p className="text-red-600 mt-4 text-sm">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default FCMTokenPage;
