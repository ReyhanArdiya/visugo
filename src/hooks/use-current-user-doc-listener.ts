import { Auth, onAuthStateChanged } from "firebase/auth";
import {
    DocumentReference,
    Firestore,
    onSnapshot,
    Unsubscribe,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserCollection, UserDoc, userDocConverter } from "../models/user/user";

/**
 *
 * Listen to the current user's {@link UserDoc} and rerender the current component
 * on update's to it; useful when listening to the current user's cart.
 *
 * @returns
 */
const useCurrentUserDocListener = (auth: Auth, db: Firestore) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [userDoc, setUserDoc] = useState<UserDoc>();

    // Listener for getting UserDoc's document snapshot
    useEffect(() => {
        let unsubSnapshot: Unsubscribe;

        const unsubAuthStateChanges = onAuthStateChanged(auth, async user => {
            if (user) {
                setIsLoggedIn(true);
                const userCollection = new UserCollection(userDocConverter, db);

                const userDocSnapshot = await userCollection.getDocById(user.uid);

                // Use to get live listener for UserDoc so stuff like quantity and items will be
                // automatically updated in the UI
                unsubSnapshot = onSnapshot(
                    userDocSnapshot?.ref as DocumentReference<UserDoc>,
                    userDoc => setUserDoc(userDoc.data())
                );
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => {
            unsubAuthStateChanges();
            unsubSnapshot();
        };
    }, [auth, db, setIsLoggedIn]);

    return { isLoggedIn, userDoc, auth };
};

export default useCurrentUserDocListener;
