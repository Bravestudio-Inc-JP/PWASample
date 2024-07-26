import { ReactElement, useEffect, useState } from "react";
import db from "../../db";
import { Code, Group } from "@mantine/core";
import CopyButton from "./CopyButton";

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
                token: {token}
                <CopyButton value={token} />
            </Group>
        </Code>
    );
};

export default FcmToken;