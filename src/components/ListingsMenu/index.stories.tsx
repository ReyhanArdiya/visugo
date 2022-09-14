import type { Meta, StoryFn } from "@storybook/react";
import ListingsMenuComp, { ListingsMenuProps } from ".";

type Args = ListingsMenuProps;

const meta: Meta<Args> = {
    component: ListingsMenuComp,
    args: {
        listings: [
            {
                src: "https://picsum.photos/200",
                title: "Black Leather Bag",
                sellerPic: "https://picsum.photos/100",
                sellerName: "Elys Maldov",
                price: 9.99,
                onCardClick: () => alert("open edit menu"),
            },
            {
                src: "https://picsum.photos/200",
                title: "Black Leather Bag",
                sellerPic: "https://picsum.photos/100",
                sellerName: "Elys Maldov",
                price: 9.99,
                onCardClick: () => alert("open edit menu"),
            },
            {
                src: "https://picsum.photos/200",
                title: "Black Leather Bag",
                sellerPic: "https://picsum.photos/100",
                sellerName: "Elys Maldov",
                price: 9.99,
                onCardClick: () => alert("open edit menu"),
            },
        ],
    },
    parameters: {
        layout: "fullscreen",
    },
};

export const ListingsMenu: StoryFn<Args> = args => <ListingsMenuComp {...args} />;

export default meta;
