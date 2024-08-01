import { createLazyFileRoute } from "@tanstack/react-router";
import LinkTest from "../pages/LinkTest";

export const Route = createLazyFileRoute("/link-test")({
    component: LinkTest
});