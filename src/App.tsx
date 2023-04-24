import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { GlobalContextProvider } from "./lib/context";
import Home from "./views/Home";
import HRGraphPage from "./views/HRGraphPage";
import TokenExchange from "./views/TokenExchange";

export const App = () => {
  // State

  return (
    <ChakraProvider theme={theme}>
      <GlobalContextProvider>
        <BrowserRouter>
          <Box
            width="100%"
            height="100vh"
            className="background-gradient"
            overflow="scroll"
          >
            {/* Navbar */}
            <Navbar />

            <Box width="100%" px="40px" mt="55px">
              {/* Routes */}
              <Routes>
                <Route path="/token-exchange" element={<TokenExchange />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </GlobalContextProvider>
    </ChakraProvider>
  );
};
