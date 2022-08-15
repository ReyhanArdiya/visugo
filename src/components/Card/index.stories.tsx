import type { Meta, StoryFn } from "@storybook/react";
import CardComp, { CardProps } from ".";

type Args = CardProps;

const meta: Meta<Args> = {
    component: CardComp,
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

export const Card: StoryFn<Args> = args => <CardComp {...args} />;

export default meta;
