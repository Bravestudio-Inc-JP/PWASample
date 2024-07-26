import { Messaging, getMessaging, getToken, onMessage } from "firebase/messaging";

import { initializeApp } from "firebase/app";
import { useRegisterSW } from "virtual:pwa-register/react";
import { firebaseConfig, vapidKey } from "../config";
import db from "../db";

const useFirebaseFacade = (): void => {
  // check for updates every hour
  const period = 60 * 60 * 1000;

  useRegisterSW({
    onRegisterError(error) {
      console.error("Failed to register the ServiceWorker:", error);
    },
    onRegisteredSW(swUrl, swRegist) {
      if (swRegist) {
        const firebaseApp = initializeApp(firebaseConfig);
        const messaging = getMessaging(firebaseApp);

        getFirebaseToken(messaging, swRegist);
        handleForegroundMessage(messaging, swRegist);
      }

      if (period <= 0) return;
      if (swRegist?.active?.state === "activated") {
        registerPeriodicSync(period, swUrl, swRegist);
      }
      else if (swRegist?.installing) {
        swRegist.installing.addEventListener("statechange", (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === "activated")
            registerPeriodicSync(period, swUrl, swRegist);
        });
      }
    },
  });
};

export default useFirebaseFacade;

const getFirebaseToken = (messaging: Messaging, swRegist: ServiceWorkerRegistration): void => {
  getToken(messaging, {
    vapidKey: vapidKey,
    serviceWorkerRegistration: swRegist,
  })
    .then((currentToken) => {
      // TODO: Use custom logger which can be disabled in production
      console.log("currentToken", currentToken);
      db.saveKv("fcmToken", currentToken);
    });
};

const handleForegroundMessage = (messaging: Messaging, swRegist: ServiceWorkerRegistration): void => {
  onMessage(messaging, (payload) => {
    // TODO: Use custom logger which can be disabled in production
    console.log("Message received. ", payload);
    // show notification
    if (payload.data) {
      const { title, body, image } = payload.data;
      swRegist.showNotification(title ?? "", {
        body,
        icon: image,
      });
    }
  });
};

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
const registerPeriodicSync = (period: number, swUrl: string, r: ServiceWorkerRegistration): void => {
  if (period <= 0) return;

  setInterval(async () => {
    if ("onLine" in navigator && !navigator.onLine)
      return;

    const resp = await fetch(swUrl, {
      cache: "no-store",
      headers: {
        "cache": "no-store",
        "cache-control": "no-cache",
      },
    });

    if (resp?.status === 200)
      await r.update();
  }, period);
};
