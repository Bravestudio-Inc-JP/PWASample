import { Stack, Text, TextInput } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { ReactElement, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useMyStore } from "../store";

pdfjs.GlobalWorkerOptions.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs";

const options = {
    cMapUrl: "/cmaps/",
    standardFontDataUrl: "/standard_fonts/",
};

const maxWidth = 700;


const PDFTest = (): ReactElement => {
    const [url, setUrl] = useState<string>("https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK");
    const { numPages, setNumPages } = useMyStore();
    const [containerRef, rect] = useResizeObserver();

    const onDocumentLoadSuccess = (numPages: number): void => {
        setNumPages(numPages);
    };

    return (
        <Stack p="md">
            <Text c="yellow">Link without CORS restriction</Text>
            <TextInput value={url} onChange={(event) => setUrl(event.currentTarget.value)} placeholder="Enter PDF URL" />
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