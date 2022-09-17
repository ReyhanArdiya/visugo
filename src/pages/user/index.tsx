import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { where } from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ListingCardProps } from "../../components/ListingCard";
import UserHome from "../../components/Pages/UserHome";
import { ListingCollection, listingDocConverter } from "../../models/user/listing";
import { UserCollection, userDocConverter } from "../../models/user/user";
import getFirestoreClient from "../../utils/firebase/client/firestore/get-firestore-client";
import getFirebaseClient from "../../utils/firebase/client/get-firebase-client";

const UserHomePage: NextPage = () => {
    // User's auth data
    const app = getFirebaseClient();
    const auth = getAuth(app);
    const router = useRouter();

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    useEffect(() => onAuthStateChanged(auth, user => setCurrentUser(user)), [auth]);

    const logoutHandler = () => {
        // firebaseTokenCookie.destroy();
        auth.signOut();
        router.replace("/");
    };

    const deleteAccountHandler = () => {
        // firebaseTokenCookie.destroy();
        auth.currentUser?.delete();
        router.replace("/");
    };

    // User's listings
    const db = getFirestoreClient(app);
    const [listings, setListings] = useState<ListingCardProps[]>([]);
    useEffect(() => {
        const getUsersListings = async () => {
            if (auth.currentUser) {
                const userCollection = new UserCollection(userDocConverter, db);
                const userDoc = await userCollection.getDocById(
                    auth.currentUser.uid
                );

                const usersListingCollection = new ListingCollection(
                    auth.currentUser.uid,
                    listingDocConverter,
                    db
                );

                const usersListings = (
                    await usersListingCollection.queryFrom(
                        where("seller", "==", userDoc.ref)
                    )
                ).docs;

                const usersListingsProps: ListingCardProps[] = [];
                usersListings.forEach(async listingDoc => {
                    const { image, price, title } = listingDoc.data();

                    usersListingsProps.push({
                        onCardClick: () => {
                            alert("Open lisitng CRUD menu");
                        },
                        price,
                        sellerName: auth.currentUser?.displayName as string,
                        sellerPic: auth.currentUser?.photoURL as string,
                        src: await getDownloadURL(image),
                        title,
                    });
                });

                setListings(usersListingsProps);
            }
        };

        getUsersListings();
    }, [auth.currentUser, db]);

    return (
        <UserHome
            onDeleteAccount={deleteAccountHandler}
            onLogout={logoutHandler}
            username={currentUser?.displayName || ""}
            profilePicSrc={currentUser?.photoURL || "/images/user-placeholder.png"}
            listings={listings}
        />
    );
};

export default UserHomePage;
