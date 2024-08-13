import { createFileRoute } from "@tanstack/react-router";
import PDFTest from "../pages/PDFTest";

type PDFTestSearchParams = {
  url: string;
};

export const Route = createFileRoute("/pdf-test")({
  validateSearch: (search: Record<string, unknown>): PDFTestSearchParams => {
    return {
      url: (search.url as string)
    };
  },
  component: PDFTest,
});