import { ReactElement } from "react";
import { ActionIcon, CopyButton as CB, Tooltip, rem } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

interface CopyButtonProps {
    value: string;
}
const CopyButton = ({ value }: CopyButtonProps): ReactElement => (
        <CB value={value} timeout={2000}>
            {({ copied, copy }) => (
                    <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                        <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                            {copied ? (
                                <IconCheck style={{ width: rem(16) }} />
                            ) : (
                                <IconCopy style={{ width: rem(16) }} />
                            )}
                        </ActionIcon>
                    </Tooltip>
                )}
        </CB>
    );

export default CopyButton;