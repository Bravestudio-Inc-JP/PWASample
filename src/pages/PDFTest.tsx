import { Code, Stack } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { getRouteApi } from "@tanstack/react-router";
import { ReactElement } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useMyStore } from "../store";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

const options = {
    cMapUrl: "/cmaps/",
    standardFontDataUrl: "/standard_fonts/",
};

const maxWidth = 700;

const route = getRouteApi("/pdf-test");

const PDFTest = (): ReactElement => {
    const { url } = route.useSearch();
    const { numPages, setNumPages } = useMyStore();
    const [containerRef, rect] = useResizeObserver();

    const onDocumentLoadSuccess = (numPages: number): void => {
        setNumPages(numPages);
    };

    return (
        <Stack p="md">
            <Code>{url}</Code>
            <div ref={containerRef}>
                <Document file={url} onLoadSuccess={(proxy) => onDocumentLoadSuccess(proxy.numPages)} options={options}>
                    {Array.from(new Array(numPages), (_, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={rect.width < maxWidth ? rect.width : maxWidth}
                        />
                    ))}
                </Document>
            </div>
        </Stack>
    );
};

export default PDFTest;