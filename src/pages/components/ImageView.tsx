import { AspectRatio, Code, Stack } from "@mantine/core";
import { ReactElement, useEffect, useMemo } from "react";
import { formatBytes } from "../../helpers";
interface ImageViewProps {
    file: File | Blob | undefined;
}
const ImageView = ({ file }: ImageViewProps): ReactElement => {
    // create a imageUrl from imageFile
    const imageUrl = useMemo(() => {
        if (!file) return;
        console.log("creating object url the image.");
        const url = URL.createObjectURL(file);
        if (url) {
            console.log(`created object url: ${url}`);
            return url;
        }
    }, [file]);

    // Remember to revoke the object URL when the component unmounts
    useEffect(() => {
        return (): void => {
            imageUrl && URL.revokeObjectURL(imageUrl);
        };
    }, [imageUrl]);

    return (
        <Stack align="start">
            <AspectRatio ratio={1080 / 720} maw={450}>
                {imageUrl && <img src={imageUrl} alt="camera" />}
            </AspectRatio>
            {file && <Code >{formatBytes(file.size)}</Code>}
        </Stack>
    );
};

export default ImageView;