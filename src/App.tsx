import { ChakraProvider, Box, theme, Flex } from "@chakra-ui/react";
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
        <Flex
          justify="center"
          width="100%"
          minHeight="100vh"
          className="background-gradient"
        >
          <Box width="90%">
            {/* Navbar */}
            {userHook?.userObject && <Navbar />}

            {/* Routes */}
            <Routes>
              <Route path="/token-exchange" element={<TokenExchange />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Box>
        </Flex>
      </BrowserRouter>
    </ChakraProvider>
  );
};
