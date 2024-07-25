

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw"; // Notice 'sw'
import { firebaseConfig } from "./config";
import { onBackgroundMessage } from "firebase/messaging/sw"; // Notice 'sw'

export const initializeFirebaseMessaging = (r: ServiceWorkerRegistration): void => {
    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);
    onBackgroundMessage(messaging, (payload) => {
        // TODO: Use custom logger which can be disabled in production
        console.log("Message received. ", payload);
        if (payload.data) {
            const { title, body, image } = payload.data;
            r.showNotification(title ?? "", {
                body,
                icon: image,
            });
        }
    });
};