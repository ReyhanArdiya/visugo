import type { Meta, StoryFn } from "@storybook/react";
import ListingDetailsComp, { ListingDetailsProps } from ".";

type Args = ListingDetailsProps;

const meta: Meta<Args> = {
    component: ListingDetailsComp,
    args: {
        created: new Date(),
        description:
            "Lorem ipsum dolor domo sit amet, Lorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit amet",
        price: 9.99,
        sellerName: "Elys Maldov",
        sellerImage: "https://picsum.photos/200",
        title: "Black Jeans",
        stars: 3,
        reviews: [
            {
                authorImage: "https://picsum.photos/200",
                authorName: "John Doe",
                created: new Date(),
                description:
                    "Lorem ipsum dolor domo sit amet, Lorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit amet",
                star: 4,
                title: "Good Stuff",
            },
            {
                authorImage: "https://picsum.photos/200",
                authorName: "John Doe",
                created: new Date(),
                description:
                    "Lorem ipsum dolor domo sit amet, Lorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit amet",
                star: 4,
                title: "Good Stuff",
            },
            {
                authorImage: "https://picsum.photos/200",
                authorName: "John Doe",
                created: new Date(),
                description:
                    "Lorem ipsum dolor domo sit amet, Lorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit ametLorem ipsum dolor domo sit amet",
                star: 4,
                title: "Good Stuff",
            },
        ],
    },
    parameters: {
        layout: "fullscreen",
    },
};

export const ListingDetails: StoryFn<Args> = args => (
    <ListingDetailsComp {...args} />
);

export default meta;
