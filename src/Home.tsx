import { Button, FileButton, Flex, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import classes from "./Button.module.css";
import ImageView from "./ImageView";
import { compressImage } from "./compressor";
import { db } from "./db";
import useFirebaseFacade from "./hooks/useFirebaseFacade";

const Home = (): React.ReactElement => {
  const [authorized, setAuthorized] = useState(false);
  const [param, setParam] = useState("");
  const [ogImageFile, setOgImageFile] = useState<File>();
  const [compressedImageFile, setCompressedImageFile] = useState<Blob>();
  const isMobile = useMediaQuery("(max-width: 36em)");

  useFirebaseFacade();

  useEffect(() => {
    Notification.permission === "granted" && setAuthorized(true);
    const urlParams = new URLSearchParams(window.location.search);
    setParam(urlParams.get("param") ?? "");
    db.getImage()
      .then((file) => {
        if (file) {
          console.log(`there's an image! ${file.name}`);
          setOgImageFile(file);
        }
      })
      .catch(console.error);
  }, []);

  // request notification permission
  const requestNotificationPermission = async (): Promise<void> => {
    const permission = await Notification.requestPermission();
    setAuthorized(permission === "granted");
  };

  const onFileChange = (file: File | null): void => {
    if (!file) return;
    db.saveImage(file)
      .then(() => { return setOgImageFile(file); })
      .catch(console.error);
  };

  return (
    <Flex direction="column" gap="lg" p="lg">
      <Title>pwa-sample</Title>
      <Text>
        Param: {param}
      </Text>
      <Flex
        direction="column"
        gap="sm"
        align="flex-start"
      >
        <Button
          className={classes["button-permission"]}
          onClick={requestNotificationPermission}
          disabled={authorized}
        >
          Request notification permission
        </Button>
        <FileButton
          accept="image/*"
          onChange={onFileChange}
        >
          {(props) => { return <Button className={classes["button"]} {...props}>Camera</Button>; }}
        </FileButton>

        <Flex direction={isMobile ? "column" : "row"} gap="sm">
          <ImageView file={ogImageFile} />
          <ImageView file={compressedImageFile} />
        </Flex>


        <Button
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

