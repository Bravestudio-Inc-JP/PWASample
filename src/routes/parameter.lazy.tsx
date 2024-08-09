import { createLazyFileRoute } from "@tanstack/react-router";
import Parameter from "../pages/Parameter";

export const Route = createLazyFileRoute("/parameter")({
    component: Parameter
});