import { ReactElement, useEffect, useState } from "react";
import { formatBytes } from "../../helpers";

const MP3Player = (): ReactElement => {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [fileSize, setFileSize] = useState(0);
    const [quotaInfo, setQuotaInfo] = useState<{ usage: number | undefined; quota: number | undefined } | null>(null);

    const fetchQuotaInfo = async (): Promise<void> => {
        if ("storage" in navigator && "estimate" in navigator.storage) {
            const { usage, quota } = await navigator.storage.estimate();
            setQuotaInfo({ usage, quota });
        } else {
            console.warn("Storage API not supported in this browser.");
        }
    };
    useEffect(() => {
        fetchQuotaInfo();
    }, []);
    // This useEffect simulates fetching or generating the 1GB MP3 file.
    useEffect(() => {
        const createLargeMp3 = (): void => {
            const url = "https://objects.githubusercontent.com/github-production-release-asset-2e65be/833398706/5aaf9581-3204-468f-9d33-db9cfb4d0ecb?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=releaseassetproduction%2F20241007%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241007T091927Z&X-Amz-Expires=300&X-Amz-Signature=0d6970be8bad0396fc0a27825e39d8034b447e8238d9a5567a273f907d9fbbe2&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3Dlarge-fake.mp3&response-content-type=application%2Foctet-stream";
            // blob from url
            fetch(url).then(async (r) => {
                const blob = await r.blob();
                // Set the file URL and file size in state
                setFileUrl(url);
                setFileSize(blob.size);
            });
        };

        // Call the function to generate the MP3 file when the component mounts
        createLargeMp3();
    }, []);

    return (
        <div>
            {quotaInfo && (
                <div>
                    <p>Usage: {formatBytes(quotaInfo.usage ?? 0)}</p>
                    <p>Quota: {formatBytes(quotaInfo.quota ?? 0)}</p>
                    <p>Remaining: {formatBytes((quotaInfo.quota ?? 0) - (quotaInfo.usage ?? 0))}</p>
                </div>)}
            {/* Display file size */}
            <p>File Size: {formatBytes(fileSize)}</p>

            {/* Show audio player if the file URL is available */}
            {fileUrl ? (
                <audio controls>
                    <source src={fileUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            ) : (
                <p>Generating audio file, please wait...</p>
            )}
        </div>
    );
};

export default MP3Player;