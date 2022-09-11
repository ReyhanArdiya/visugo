import { useBoolean } from "@chakra-ui/react";
import { FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    DocumentReference,
    DocumentSnapshot,
    getFirestore,
    onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserCollection, UserDoc, userDocConverter } from "../models/user/user";

/**
 *
 * Listen to the current user's {@link UserDoc} and rerender the current component
 * on update's to it; useful when listening to the current user's cart.
 *
 * @param app
 * @returns
 */
const useCurrentUserDocListener = (app: FirebaseApp) => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const [isLoggedIn, setIsLoggedIn] = useBoolean(false);
    const [userDocSnapshot, setUserDocSnapshot] =
        useState<DocumentSnapshot<UserDoc>>();

    const [userDoc, setUserDoc] = useState<UserDoc>();

    // Listener for getting UserDoc's document snapshot
    useEffect(
        () =>
            onAuthStateChanged(auth, async user => {
                if (user) {
                    setIsLoggedIn.on();
                    const userCollection = new UserCollection(userDocConverter, db);

                    setUserDocSnapshot(await userCollection.getDocById(user.uid));
                } else {
                    setIsLoggedIn.off();
                }
            }),
        [auth, db, setIsLoggedIn]
    );

    // Use to get live listener for UserDoc so stuff like quantity and items will be
    // automatically updated in the UI
    useEffect(
        () =>
            userDocSnapshot?.ref &&
            onSnapshot(userDocSnapshot?.ref as DocumentReference<UserDoc>, userDoc =>
                setUserDoc(userDoc.data())
            ),
        [userDocSnapshot?.ref]
    );

    return { isLoggedIn, userDoc, auth };
};

export default useCurrentUserDocListener;
