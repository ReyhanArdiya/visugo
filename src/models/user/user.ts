import { UserCredential } from "firebase/auth";
import { doc, Firestore, FirestoreDataConverter, setDoc } from "firebase/firestore";
import { ProductCardProps } from "../../components/CartModal/ProductCard";
import createPathSegments from "../../utils/firebase/client/firestore/create-path-segments";
import { FirestoreCollection } from "../base/firestore-collection";

export const userDocConverter: FirestoreDataConverter<UserDoc> = {
    fromFirestore(snapshot) {
        const userDoc = snapshot.data() as Pick<UserDoc, "uid" | "cart">;

        return new UserDoc(userDoc.uid, userDoc.cart);
    },

    toFirestore(modelObject) {
        return { ...modelObject };
    },
};

export interface CartItem
    extends Omit<
        ProductCardProps,
        "onAdd" | "onDelete" | "onImageClick" | "onRemove"
    > {
    quantity: number;
}

export type Cart = Record<string, CartItem>;

export type CartUpdatedCartItem = Omit<CartItem, "quantity"> & { id: string };

export class UserDoc {
    constructor(
        // CMT displayname comes from usercredential and photourl too
        public readonly uid: UserCredential["user"]["uid"],
        public cart: Cart = {}
    ) {}

    public async cartUpdated(
        db: Firestore,
        cartItem: CartUpdatedCartItem,
        incQuant: number | false
    ) {
        const userCol = new UserCollection(userDocConverter, db);
        const userDoc = await userCol.getDocById(this.uid);
        const cart = { ...userDoc.data()?.cart };

        const deleteCartItem = () => delete cart[cartItem.id];

        if (cart) {
            const item = cart[cartItem.id];

            if (incQuant === false) {
                deleteCartItem();
            } else if (!item) {
                cart[cartItem.id] = {
                    quantity: incQuant,
                    image: cartItem.image,
                    price: cartItem.price,
                    seller: cartItem.seller,
                    title: cartItem.title,
                };
            } else {
                item.quantity += incQuant;

                if (item.quantity <= 0) {
                    deleteCartItem();
                }
            }

            await userCol.updateDocById(userDoc.id, {
                cart,
            });
        }
    }

    // XXX Causes circural dependency!!!
    // listings() {
    //     return new ListingCollection(this.uid, listingDocConverter, db),
    // }

    // reviews() {
    //     return new ReviewCollection(this.uid, reviewDocConverter, this.db)
    // }
}

// @ts-expect-error: We don't constrain the T since each subcollection will have their own docs
export class UserCollection<T = UserDoc> extends FirestoreCollection<T> {
    public collectionId = "users";

    constructor(
        // @ts-expect-error: We don't constrain the T since each subcollection will have their own docs
        ...superParams: ConstructorParameters<typeof FirestoreCollection<T>>
    ) {
        const pathSegments = createPathSegments(["users"], superParams[2]);

        // @ts-expect-error: We don't constrain the T since each subcollection will have their own docs
        super(superParams[0], superParams[1], pathSegments);
    }

    /**
     * Prefer using this over {@link UserCollection.add}.
     */
    public async signUp(
        userId: string,
        data: Pick<UserDoc, "cart" | "uid"> = { cart: {}, uid: userId }
    ) {
        const userRef = doc(this.ref, userId);

        // @ts-expect-error: Too tired babe
        await setDoc(userRef, data);

        return userRef;
    }
}
