import { AspectRatio, Button, Code, FileButton, Flex, Text, Title } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import classes from "./PermissionButton.module.css";
import { db } from "./db";
import { formatBytes } from "./helpers";
import useFirebaseFacade from "./hooks/useFirebaseFacade";

const Home = (): React.ReactElement => {
  const [authorized, setAuthorized] = useState(false);
  const [param, setParam] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  // create a imageUrl from imageFile
  const imageUrl = useMemo(() => {
    if (!imageFile) return;
    console.log(`creating object url for ${imageFile.name}`);
    const url = URL.createObjectURL(imageFile);
    if (url) {
      console.log(`created object url: ${url}`);
      return url;
    }
  }, [imageFile]);

  useFirebaseFacade();

  useEffect(() => {
    Notification.permission === "granted" && setAuthorized(true);
    const urlParams = new URLSearchParams(window.location.search);
    setParam(urlParams.get("param") ?? "");
    db.getImage()
      .then((file) => {
        if (file) {
          console.log(`there's an image! ${file.name}`);
          setImageFile(file);
        }
      })
      .catch(console.error);
  }, []);

  // Remember to revoke the object URL when the component unmounts
  useEffect(() => {
    return (): void => {
      imageUrl && URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);


  // request notification permission
  const requestNotificationPermission = async (): Promise<void> => {
    const permission = await Notification.requestPermission();
    setAuthorized(permission === "granted");
  };

  const onFileChange = (file: File | null): void => {
    if (!file) return;
    db.saveImage(file)
      .then(() => { return setImageFile(file); })
      .catch(console.error);
  };

  return (
    <Flex direction='column' gap='lg' p='lg'>
      <Title>pwa-sample</Title>
      <Text>
        Param: {param}
      </Text>
      <Flex
        direction='column'
        gap='sm'
        align='flex-start'
      >
        <Button
          className={classes["button-permission"]}
          onClick={requestNotificationPermission}
          disabled={authorized}
        >
          Request notification permission
        </Button>

        <FileButton
          accept='image/*'
          onChange={onFileChange}
        >
          {(props) => { return <Button className={classes["button"]} {...props}>Camera</Button>; }}
        </FileButton>

        <AspectRatio ratio={1080 / 720} maw={300}>
          {imageUrl && <img src={imageUrl} alt='camera' />}
        </AspectRatio>
        {imageFile && <Code>{formatBytes(imageFile.size)}</Code>}
      </Flex>
    </Flex>
  );
};

export default Home;

