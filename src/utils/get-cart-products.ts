import { Firestore } from "firebase/firestore";
import { CartModalProps } from "../components/CartModal";
import { UserDoc } from "../models/user/user";

const getUserDocCartProducts = (
    user: UserDoc,
    db: Firestore
): CartModalProps["products"] => {
    const cartItems = Object.entries(user.cart);

    return cartItems.map(([id, cartItem]) => {
        const cartItemWId = { ...cartItem, id };

        return {
            ...cartItem,
            async onAdd() {
                try {
                    user.cartUpdated(db, cartItemWId, 1);
                } catch (err) {
                    console.error(err);
                }
            },
            async onRemove() {
                try {
                    user.cartUpdated(db, cartItemWId, -1);
                } catch (err) {
                    console.error(err);
                }
            },
            async onDelete() {
                try {
                    user.cartUpdated(db, cartItemWId, false);
                } catch (err) {
                    console.error(err);
                }
            },
        };
    });
};

export default getUserDocCartProducts;
