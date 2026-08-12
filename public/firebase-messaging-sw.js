importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBg2vdI5AzAQ9F7r7mKO73arsOTm9ncZtY",
  authDomain: "zeromedixine-76219.firebaseapp.com",
  projectId: "zeromedixine-76219",
  storageBucket: "zeromedixine-76219.firebasestorage.app",
  messagingSenderId: "880038340902",
  appId: "1:880038340902:web:817153310d6bc671f339e7",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("📩 Background message received:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png",
  });
});
