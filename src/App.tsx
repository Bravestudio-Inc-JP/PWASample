import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const App = (): React.ReactElement => <React.StrictMode>
        <MantineProvider defaultColorScheme="auto">
            <RouterProvider router={router}/>
        </MantineProvider>
    </React.StrictMode>;

export default App;