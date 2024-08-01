import { Anchor, Button, FileButton, Flex, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect } from "react";
import { compressImage } from "../compressor";
import db from "../db";
import useFirebaseFacade from "../hooks/useFirebaseFacade";
import classes from "./components/Button.module.css";
import ImageView from "./components/ImageView";
import NotificationButton from "./components/NotificationButton";
import FcmToken from "./components/FcmToken";
import { useMyStore } from "../store";

const Home = (): React.ReactElement => {
  const {
    ogImageFile,
    compressedImageFile,
    setOgImageFile,
    setCompressedImageFile,
    restoreOgImageFile
  } = useMyStore();
  const isMobile = useMediaQuery("(max-width: 36em)");

  useFirebaseFacade();

  useEffect(() => {
    restoreOgImageFile();
  }, [restoreOgImageFile]);

  const onFileChange = (file: File | null): void => {
    if (!file) return;
    db.saveImage(file)
      .then(() => setOgImageFile(file))
      .catch(console.error);
  };

  return (
    <Flex direction="column" gap="lg" p="lg" align="start">
      <Title>pwa-sample</Title>
      <FcmToken />
      <Anchor href="https://google.com" target="_blank">External Link Test</Anchor>
      <Flex
        direction="column"
        gap="sm"
        align="flex-start"
        w={"100%"}
      >
        <NotificationButton />
        <FileButton
          accept="image/*"
          onChange={onFileChange}
        >
          {(props) => <Button size="lg" className={classes["button"]} {...props}>Camera</Button>}
        </FileButton>

        <Flex direction={isMobile ? "column" : "row"} gap="sm">
          <ImageView file={ogImageFile} />
          <ImageView file={compressedImageFile} />
        </Flex>


        <Button
          size="lg"
          className={classes["button"]}
          onClick={async () => {
            if (!ogImageFile) return;
            const compressedImage = await compressImage(ogImageFile);
            setCompressedImageFile(compressedImage);
          }}>
          Compress
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;

