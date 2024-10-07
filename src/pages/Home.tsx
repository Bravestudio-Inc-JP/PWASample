import { Anchor, Button, Code, Fieldset, FileButton, Flex, Stack, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect } from "react";
import { compressImage } from "../compressor";
import useFirebaseFacade from "../hooks/useFirebaseFacade";
import { useMyStore } from "../store";
import classes from "./components/Button.module.css";
import FcmToken from "./components/FcmToken";
import ImageView from "./components/ImageView";
import Location from "./components/Location";
import MP3Player from "./components/Mp3Player";
import NotificationButton from "./components/NotificationButton";

const Home = (): React.ReactElement => {
  const {
    ogImageFile,
    compressedImageFile,
    locationUrl,
    setOgImageFile,
    setCompressedImageFile,
    restoreOgImageFile,
    setLocationUrl
  } = useMyStore();
  const kitty = new URL("../assets/kitty.jpg", import.meta.url).toString();

  const isMobile = useMediaQuery("(max-width: 36em)");

  useFirebaseFacade();

  useEffect(() => {
    restoreOgImageFile(1);
  }, [restoreOgImageFile]);

  useEffect(() => {
    if (!ogImageFile) return;
    setLocationUrl(ogImageFile.file);
  }, [ogImageFile, setLocationUrl]);

  const onFileChange = (file: File | null): void => {
    if (!file) return;
    setOgImageFile(file, 1);
  };

  return (
    <Flex direction="column" gap="lg" p="lg" align="start">
      <Title>pwa-sample</Title>
      <Location />
      <FcmToken />
      <NotificationButton />

      <Anchor href="https://google.com" target="_blank">External Link Test</Anchor>

      <Fieldset legend="Cache Exlusion Test">
        <img src={kitty} alt="kitty" height="50" />
      </Fieldset>

      <Fieldset legend="Large File Cache Test">
        <MP3Player />
      </Fieldset>

      <Fieldset legend="Image Test">
        <Stack gap="sm">
          <FileButton
            accept="image/*"
            onChange={onFileChange}
          >
            {(props) => <Button size="lg" className={classes["button"]} {...props}>Camera</Button>}
          </FileButton>

          <Code>
            {locationUrl ? <Anchor href={locationUrl} target="">{locationUrl}</Anchor> : "No GPS data found in the image."}
          </Code>

          <Flex direction={isMobile ? "column" : "row"} gap="sm">
            <ImageView file={ogImageFile?.file} />
            <ImageView file={compressedImageFile} />
          </Flex>

          <Button
            size="lg"
            className={classes["button"]}
            onClick={async () => {
              if (!ogImageFile) return;
              const compressedImage = await compressImage(ogImageFile.file);
              setCompressedImageFile(compressedImage);
            }}>
            Compress
          </Button>
        </Stack>
      </Fieldset>
    </Flex >
  );
};

export default Home;

