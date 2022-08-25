import type { Meta, StoryFn } from "@storybook/react";
import ListingCardComp, { ListingCardProps } from ".";

type Args = ListingCardProps;

const meta: Meta<Args> = {
    component: ListingCardComp,
    args: {
        src: "https://picsum.photos/200",
        title: "Black Leather Bag",
        sellerPic: "https://picsum.photos/100",
        sellerName: "Elys Maldov",
        price: 9.99,
    },
    argTypes: {
        onCardClick: {
            action: "Card Clicked!",
        },
    },
};

export const ListingCard: StoryFn<Args> = args => <ListingCardComp {...args} />;

export default meta;
