import { createLazyFileRoute } from "@tanstack/react-router";
import PDFTest from "../pages/PDFTest";

export const Route = createLazyFileRoute("/pdf-test")({
  component: PDFTest
});