import { ReactElement, useEffect, useState } from "react";
import db from "../../db";
import { Code, Group, Text } from "@mantine/core";
import CopyButton from "./CopyButton";
import classes from "./FcmToken.module.css";

const FcmToken = (): ReactElement | null => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        db.getKv("fcmToken").then((token) => {
            token && setToken(token);
        });
    }, []);

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