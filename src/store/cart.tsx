import React, { ReactNode, useState } from "react";

export interface ICartContext {
    totalItems: number;
    itemAdded(): void;
    itemRemoved(): void;
}

const CartContext = React.createContext<ICartContext>({
    itemAdded() {
        return undefined;
    },
    itemRemoved() {
        return undefined;
    },
    totalItems: 0,
});

export interface CartContextProviderProps {
    children: ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
    const [totalItems, setTotalItems] = useState(0);

    const value: ICartContext = {
        itemAdded() {
            setTotalItems(p => p + 1);
        },
        itemRemoved() {
            setTotalItems(p => p - 1);
        },
        totalItems,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
