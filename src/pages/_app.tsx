import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import CartModal, { CartModalProps } from "../components/CartModal";
import Navbar, { LoggedInNavbar, LoggedOutNavbar } from "../components/Navbar";
import useCurrentUserDocListener from "../hooks/use-current-user-doc-listener";
import { UserCollection, UserDoc, userDocConverter } from "../models/user/user";
import { CartContextProvider } from "../store/cart";
import theme from "../theme";
import { firebaseTokenCookie } from "../utils/cookies";
import getFirestoreClient from "../utils/firebase/client/firestore/get-firestore-client";
import getFirebaseClient from "../utils/firebase/client/get-firebase-client";
import { getCartTotal, getUserDocCartProducts } from "../utils/user-cart";

function MyApp({ Component, pageProps }: AppProps) {
    // Firebase data
    const app = getFirebaseClient();
    const auth = getAuth(app);
    const db = getFirestoreClient(app);
    const { isLoggedIn, userDoc } = useCurrentUserDocListener(auth, db);

    useEffect(
        () =>
            onIdTokenChanged(auth, async user => {
                const userCol = new UserCollection(userDocConverter, db);

                if (user) {
                    userCol.signUp(user.uid, new UserDoc(user.uid));

                    firebaseTokenCookie.set(await user.getIdToken());
                } else {
                    firebaseTokenCookie.destroy();
                }
            }),
        [auth, db]
    );

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
                  router.push("/user");
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
