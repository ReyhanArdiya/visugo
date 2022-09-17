import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import UserHomeComp, { UserHomeProps } from ".";

type Args = UserHomeProps;

const meta: Meta<Args> = {
    component: UserHomeComp,
    args: {
        profilePicSrc: "https://picsum.photos/200",
        username: "John Doe",
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
            {
                src: "https://picsum.photos/200",
                title: "Black Leather Bag",
                sellerPic: "https://picsum.photos/100",
                sellerName: "Elys Maldov",
                price: 9.99,
                onCardClick: () => alert("open edit menu"),
            },
            // {
            //     src: "https://picsum.photos/200",
            //     title: "Black Leather Bag",
            //     sellerPic: "https://picsum.photos/100",
            //     sellerName: "Elys Maldov",
            //     price: 9.99,
            //     onCardClick: () => alert("open edit menu"),
            // },
            // {
            //     src: "https://picsum.photos/200",
            //     title: "Black Leather Bag",
            //     sellerPic: "https://picsum.photos/100",
            //     sellerName: "Elys Maldov",
            //     price: 9.99,
            //     onCardClick: () => alert("open edit menu"),
            // },
            // {
            //     src: "https://picsum.photos/200",
            //     title: "Black Leather Bag",
            //     sellerPic: "https://picsum.photos/100",
            //     sellerName: "Elys Maldov",
            //     price: 9.99,
            //     onCardClick: () => alert("open edit menu"),
            // },
            // {
            //     src: "https://picsum.photos/200",
            //     title: "Black Leather Bag",
            //     sellerPic: "https://picsum.photos/100",
            //     sellerName: "Elys Maldov",
            //     price: 9.99,
            //     onCardClick: () => alert("open edit menu"),
            // },
            // {
            //     src: "https://picsum.photos/200",
            //     title: "Black Leather Bag",
            //     sellerPic: "https://picsum.photos/100",
            //     sellerName: "Elys Maldov",
            //     price: 9.99,
            //     onCardClick: () => alert("open edit menu"),
            // },
            // {
            //     src: "https://picsum.photos/200",
            //     title: "Black Leather Bag",
            //     sellerPic: "https://picsum.photos/100",
            //     sellerName: "Elys Maldov",
            //     price: 9.99,
            //     onCardClick: () => alert("open edit menu"),
            // },
            // {
            //     src: "https://picsum.photos/200",
            //     title: "Black Leather Bag",
            //     sellerPic: "https://picsum.photos/100",
            //     sellerName: "Elys Maldov",
            //     price: 9.99,
            //     onCardClick: () => alert("open edit menu"),
            // },
        ],
        onDeleteAccount: action("Delete account"),
        onLogout: action("Logout"),
    },
    parameters: {
        layout: "fullscreen",
    },
};

export const UserHome: StoryFn<Args> = args => <UserHomeComp {...args} />;

export default meta;
