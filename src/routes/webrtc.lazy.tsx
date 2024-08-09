import { createLazyFileRoute } from "@tanstack/react-router";
import WebRtc from "../pages/WebRtc";

export const Route = createLazyFileRoute("/webrtc")({
    component: WebRtc
});