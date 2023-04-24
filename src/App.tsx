import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useGlobalContext } from "./lib/context";
import Home from "./views/Home";
import HRGraphPage from "./views/HRGraphPage";
import TokenExchange from "./views/TokenExchange";

export const App = () => {
  // State
  const { userHook } = useGlobalContext();

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Box
          width="100%"
          height="100vh"
          className="background-gradient"
          overflow="scroll"
        >
          {/* Navbar */}
          {userHook?.userObject && <Navbar />}

          <Box width="100%" px="40px" mt="55px">
            {/* Routes */}
            <Routes>
              <Route path="/token-exchange" element={<TokenExchange />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
};
