import { Button } from "@mantine/core";
import { ReactElement, useEffect, useState } from "react";
import classes from "./NotificationButton.module.css";

const NotificationButton = (): ReactElement => {
    const [authorized, setAuthorized] = useState(false);

    // request notification permission
    const requestNotificationPermission = async (): Promise<void> => {
        const permission = await Notification.requestPermission();
        setAuthorized(permission === "granted");
    };

    useEffect(() => {
        Notification.permission === "granted" && setAuthorized(true);
    }, []);

    return (
        <>
            <Button
                classNames={{root: `${classes.button} ${authorized ? classes.circular : ""}`}}
                onClick={requestNotificationPermission}
                disabled={authorized}
            >
                {authorized ? "✔" : "Request Notification Permission"}
            </Button>
        </>
    );
};
export default NotificationButton;