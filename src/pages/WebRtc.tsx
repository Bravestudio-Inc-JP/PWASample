import { Anchor, Code, Stack } from "@mantine/core";
import { ReactElement } from "react";
import { useRef, useEffect } from "react";
import { useMyStore } from "../store";
import ImageView from "./components/ImageView";

const CameraCapture = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {
        ogImageFile,
        locationUrl,
        setOgImageFile,
        restoreOgImageFile,
        setLocationUrl
    } = useMyStore();

    useEffect(() => {
        restoreOgImageFile(2);
    }, [restoreOgImageFile]);

    useEffect(() => {
        if (!ogImageFile) return;
        setLocationUrl(ogImageFile.file);
    }, [ogImageFile, setLocationUrl]);


    useEffect(() => {
        const videoElement = videoRef.current;
        // Get access to the camera
        const initCamera = async (): Promise<void> => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoElement) {
                    videoElement.srcObject = stream;
                    videoElement.play();
                }
            } catch (err) {
                console.error("Error accessing the camera: ", err);
            }
        };
        initCamera();

        // Cleanup on component unmount
        return (): void => {
            if (videoElement && videoElement.srcObject) {
                const stream = videoElement.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const takePhoto = (): void => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext("2d");
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                canvasRef.current.toBlob(blob => {
                    if (blob) {
                        setOgImageFile(blob, 2);
                    }
                });
            }
        }
    };

    return (
        <Stack p="md">
            <video ref={videoRef}></video>
            <button onClick={takePhoto}>Take Photo</button>
            <canvas ref={canvasRef} hidden></canvas>
            {ogImageFile && (
                <div>
                    <h2>Captured Photo:</h2>
                    <ImageView file={ogImageFile.file} />
                </div>
            )}

            <Code>
                {locationUrl ? <Anchor href={locationUrl} target="_blank">{locationUrl}</Anchor> : "No GPS data found in the image."}
            </Code>
        </Stack>
    );
};

const WebRtc = (): ReactElement => {
    return (
        <>
            <CameraCapture />
        </>
    );
};

export default WebRtc;