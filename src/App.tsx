import React from "react";
import { MantineProvider } from "@mantine/core";
import Home from "./Home";
import "@mantine/core/styles.css";

const App = (): React.ReactElement => {
    return <React.StrictMode>
        <MantineProvider defaultColorScheme="auto">
            <Home />
        </MantineProvider>
    </React.StrictMode>;
};

export default App;