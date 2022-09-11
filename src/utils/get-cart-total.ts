import { Cart } from "../models/user/user";

const getCartTotal = (cart: Cart) => {
    const cartItems = Object.values(cart);

    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
};

export default getCartTotal;
