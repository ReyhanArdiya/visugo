import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Navbar, { LoggedInNavbar, LoggedOutNavbar } from "../components/Navbar";
import useCurrentUserDocListener from "../hooks/use-current-user-doc-listener";
import { CartContextProvider } from "../store/cart";
import theme from "../theme";
import getFirebaseClient from "../utils/firebase/client/get-firebase-client";
import getCartTotal from "../utils/get-cart-total";

function MyApp({ Component, pageProps }: AppProps) {
    // Firebase data
    const app = getFirebaseClient();
    const { isLoggedIn, userDoc, auth } = useCurrentUserDocListener(app);

    const router = useRouter();
    const navbarActions = isLoggedIn
        ? ({
              cartCounter: userDoc?.cart ? getCartTotal(userDoc.cart) : 0,
              onCartIconClick() {
                  alert("Open CartModal");
              },
              onProfileClick() {
                  alert("Go to user's homepage");
              },
          } as Omit<LoggedInNavbar, "isLoggedIn">)
        : ({
              onLogIn() {
                  router.push("/auth");
              },
              onSignUp() {
                  router.push("/auth");
              },
          } as Omit<LoggedOutNavbar, "isLoggedIn">);

    return (
        <ChakraProvider theme={theme}>
            <CartContextProvider>
                {/* @ts-expect-error: isLoggedIn should be right but I think true | false is not the same as boolean in TS' eyes */}
                <Navbar
                    onLogoClick={() => {
                        router.push("/");
                    }}
                    isLoggedIn={isLoggedIn}
                    profileImg={
                        auth.currentUser?.photoURL || "/images/user-placeholder.png"
                    }
                    isLoaded={isLoggedIn}
                    {...navbarActions}
                />
                <Component {...pageProps} />
            </CartContextProvider>
        </ChakraProvider>
    );
}

export default MyApp;
