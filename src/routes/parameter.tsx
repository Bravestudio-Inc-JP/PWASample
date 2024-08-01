import { createFileRoute } from "@tanstack/react-router";
import Parameter from "../pages/Parameter";

export const Route = createFileRoute("/parameter")({
    component: Parameter
});