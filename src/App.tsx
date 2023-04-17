import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { GlobalContextProvider } from "./lib/context";
import Home from "./views/Home";
import HRGraphPage from "./views/HRGraphPage";
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
    {
      path: "/hrgraph",
      element: <HRGraphPage />,
    },
  ]);

  return (
    <ChakraProvider theme={theme}>
      <GlobalContextProvider>
        <BrowserRouter>
          <Box
            width="100%"
            height="100vh"
            className="background-gradient"
            px="40px"
            overflow="scroll"
            // pb="50px"
          >
            {/* Navbar */}
            <Navbar />

            {/* Routes */}
            <Routes>
              <Route path="/token-exchange" element={<TokenExchange />} />
              <Route path="/hrgraph" element={<HRGraphPage />} />
              <Route path="/" element={<Home />} />
            </Routes>
            {/* <RouterProvider router={router} /> */}
          </Box>
        </BrowserRouter>
      </GlobalContextProvider>
    </ChakraProvider>
  );
};
