import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useMemo } from "react";
import CartModal, { CartModalProps } from "../components/CartModal";
import Navbar, { LoggedInNavbar, LoggedOutNavbar } from "../components/Navbar";
import useCurrentUserDocListener from "../hooks/use-current-user-doc-listener";
import { CartContextProvider } from "../store/cart";
import theme from "../theme";
import getFirebaseClient from "../utils/firebase/client/get-firebase-client";
import { getCartTotal, getUserDocCartProducts } from "../utils/user-cart";

function MyApp({ Component, pageProps }: AppProps) {
    // Firebase data
    const app = getFirebaseClient();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const { isLoggedIn, userDoc } = useCurrentUserDocListener(auth, db);

    // Cart
    const { isOpen, onClose, onOpen } = useDisclosure();
    const products = useMemo(
        () => userDoc?.cart && getUserDocCartProducts(userDoc, db),
        [db, userDoc]
    );
    const cartTotal = userDoc?.cart
        ? getCartTotal(userDoc.cart)
        : { quantity: 0, price: 0 };

    // Navigation
    const router = useRouter();
    const navbarActions = isLoggedIn
        ? ({
              cartCounter: cartTotal.quantity,
              onCartIconClick() {
                  onOpen();
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
                    profileImg={
                        auth.currentUser?.photoURL || "/images/user-placeholder.png"
                    }
                    isLoggedIn={isLoggedIn !== null && isLoggedIn}
                    isLoaded={isLoggedIn !== null}
                    {...navbarActions}
                />

                {userDoc?.cart && (
                    <CartModal
                        isOpen={isOpen}
                        products={products as CartModalProps["products"]}
                        onClose={onClose}
                        onCheckout={() => alert("Fake checkout!")}
                        totalPrice={cartTotal.price}
                    />
                )}
                <Component {...pageProps} />
            </CartContextProvider>
        </ChakraProvider>
    );
}

export default MyApp;
