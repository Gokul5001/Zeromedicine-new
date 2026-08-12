import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBg2vdI5AzAQ9F7r7mKO73arsOTm9ncZtY",
    authDomain: "zeromedixine-76219.firebaseapp.com",
    projectId: "zeromedixine-76219",
    storageBucket: "zeromedixine-76219.firebasestorage.app",
    messagingSenderId: "880038340902",
    appId: "1:880038340902:web:817153310d6bc671f339e7",
    measurementId: "G-X16X05GEJ4"
  };

const vapidKey = "BAFe3kcc6yZYp8XXB1mUq1LqQ_-bWGHwHbLzC_IbaGaVHFd5ENr6Kfkr-l3o87XXqlT1al6PEbR5ozee_GerF9k";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      throw new Error("Notification permission not granted");
    }

    const token = await getToken(messaging, { vapidKey });

    if (token) {
      console.log("🔥 FCM Token:", token);
      return token;
    } else {
      throw new Error("No FCM token received");
    }
  } catch (error) {
    console.error("❌ Error getting FCM token:", error);
    throw error;
  }
};
