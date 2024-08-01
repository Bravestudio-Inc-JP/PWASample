import { Code } from "@mantine/core";
import { ReactElement, useEffect, useState } from "react";

const Parameter = (): ReactElement => {
    const [param, setParam] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setParam(urlParams.get("param") ?? "");
    }, []);
    return <Code m="md">
        Param: {param}
    </Code>;
};

export default Parameter;