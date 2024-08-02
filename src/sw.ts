/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { initializeFirebaseMessaging } from "./firebase-messaging-sw";
declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

let allowlist: RegExp[] | undefined;
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV)
  allowlist = [/^\/$/];

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL("index.html"),
  { allowlist },
));

initializeFirebaseMessaging(self.registration);

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  
});

// https://vite-pwa-org.netlify.app/guide/inject-manifest.html#service-worker-code-1
self.skipWaiting();
clientsClaim();
