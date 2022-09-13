import { Firestore } from "firebase/firestore";
import { CartModalProps } from "../components/CartModal";
import { Cart, UserDoc } from "../models/user/user";

export const getUserDocCartProducts = (
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

export const getCartTotal = (cart: Cart): { quantity: number; price: number } => {
    const cartItems = Object.values(cart);

    let quantity = 0;
    let price = 0;

    for (const cartItem of cartItems) {
        quantity += cartItem.quantity;
        price += Number((cartItem.price * cartItem.quantity).toFixed(2));
    }

    return {
        quantity,
        price,
    };
};
