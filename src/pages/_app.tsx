import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { CartContextProvider } from "../store/cart";
// import "../styles/globals.css";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <CartContextProvider>
                <Component {...pageProps} />
            </CartContextProvider>
        </ChakraProvider>
    );
}

export default MyApp;
