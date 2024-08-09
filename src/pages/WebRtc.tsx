import { Stack } from "@mantine/core";
import { ReactElement } from "react";
import { useRef, useState, useEffect } from "react";

const CameraCapture = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [photo, setPhoto] = useState<string | null>(null);

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
                const dataUrl = canvasRef.current.toDataURL("image/png");
                setPhoto(dataUrl);
            }
        }
    };

    return (
        <div>
            <video ref={videoRef}></video>
            <button onClick={takePhoto}>Take Photo</button>
            <canvas ref={canvasRef} hidden></canvas>
            {photo && (
                <div>
                    <h2>Captured Photo:</h2>
                    <img src={photo} alt="Captured" />
                </div>
            )}
        </div>
    );
};

const WebRtc = (): ReactElement => {
    return (
        <Stack p="md">
            <CameraCapture />
        </Stack>
    );
};

export default WebRtc;