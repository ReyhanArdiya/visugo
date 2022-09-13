import type { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CartModalComp, { CartModalProps } from ".";

type Args = CartModalProps;

const meta: Meta<Args> = {
    component: CartModalComp,
    args: {
        isOpen: true,
        products: [
            {
                image: "https://picsum.photos/200",
                onAdd: action("Added"),
                onRemove: action("Removed"),
                onDelete: action("Deleted"),
                onImageClick: action("Image Clicked"),
                price: 9.99,
                quantity: 2,
                seller: "John Doe",
                title: "Converse Sneakers",
            },
            {
                image: "https://picsum.photos/200",
                onAdd: action("Added"),
                onRemove: action("Removed"),
                onDelete: action("Deleted"),
                onImageClick: action("Image Clicked"),
                price: 9.99,
                quantity: 2,
                seller: "John Doe",
                title: "Converse Sneakers",
            },
            {
                image: "https://picsum.photos/200",
                onAdd: action("Added"),
                onRemove: action("Removed"),
                onDelete: action("Deleted"),
                onImageClick: action("Image Clicked"),
                price: 9.99,
                quantity: 2,
                seller: "John Doe",
                title: "Converse Sneakers",
            },
            {
                image: "https://picsum.photos/200",
                onAdd: action("Added"),
                onRemove: action("Removed"),
                onDelete: action("Deleted"),
                onImageClick: action("Image Clicked"),
                price: 9.99,
                quantity: 2,
                seller: "John Doe",
                title: "Converse Sneakers",
            },
        ],
        onCheckout: action("Checkout!"),
        totalPrice: 200,
    },
};

export const CartModal: StoryFn<Args> = args => <CartModalComp {...args} />;

export default meta;
