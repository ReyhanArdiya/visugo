import { ChakraProvider, Text } from "@chakra-ui/react";
import type { AppProps } from "next/app";
// import "../styles/globals.css";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
            <Text
                bg="blue.100"
                color="red.100"
            >
                Meow
            </Text>
        </ChakraProvider>
    );
}

export default MyApp;
