import Compress from "compressorjs";

const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        new Compress(file, {
            quality: 0.5,
            success: (compressedFile): void => {
                resolve(compressedFile);
            },
            error: (error): void => {
                reject(error);
            },
        });
    });
};

export {
    compressImage
};
