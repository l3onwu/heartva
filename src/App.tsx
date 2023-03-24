import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalContextProvider } from "./lib/context";
import Home from "./views/Home";
import TokenExchange from "./views/TokenExchange";

export const App = () => {
  // State
  const router = createBrowserRouter([
    {
      path: "/token-exchange",
      element: <TokenExchange />,
    },
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <ChakraProvider theme={theme}>
      <GlobalContextProvider>
        <Box width="100vw" height="100vh" className="background-gradient">
          <RouterProvider router={router} />
        </Box>
      </GlobalContextProvider>
    </ChakraProvider>
  );
};
