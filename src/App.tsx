import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import { RouterProvider, createHashHistory, createRouter } from "@tanstack/react-router";
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

// REMOVE THIS IF THIS IS NOT HOSTED ON GITHUB PAGES
const hashHistory = createHashHistory();

const App = (): React.ReactElement => <React.StrictMode>
  <MantineProvider defaultColorScheme="auto">
    <RouterProvider router={router} history={hashHistory} />
  </MantineProvider>
</React.StrictMode>;

export default App;