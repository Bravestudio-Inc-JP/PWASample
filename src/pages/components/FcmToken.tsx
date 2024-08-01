import { ReactElement, useEffect } from "react";
import { Code, Group, Text } from "@mantine/core";
import CopyButton from "./CopyButton";
import classes from "./FcmToken.module.css";
import { useMyStore } from "../../store";

const FcmToken = (): ReactElement | null => {
    const { token, restoreToken } = useMyStore();

    useEffect(() => {
        restoreToken();
    }, [restoreToken]);

    if (!token) return null;
    return (
        <Code color="cyan">
            <Group>
                <Text className={classes.text}>token: {token}</Text>
                <CopyButton value={token} />
            </Group>
        </Code>
    );
};

export default FcmToken;