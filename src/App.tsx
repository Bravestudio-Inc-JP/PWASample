import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import Home from "./pages/Home";

const App = (): React.ReactElement => {
    return <React.StrictMode>
        <MantineProvider defaultColorScheme="auto">
            <Home />
        </MantineProvider>
    </React.StrictMode>;
};

export default App;