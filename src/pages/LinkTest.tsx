import { Anchor, Stack } from "@mantine/core";
import { ReactElement } from "react";

const LinkTest = (): ReactElement => {
    return (
        <Stack m="md">
            <Anchor href="https://google.com" target="_blank">Open in Browser</Anchor>
            <Anchor href="https://google.com">Open in PWA</Anchor>
        </Stack>
    );
};

export default LinkTest;