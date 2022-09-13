import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import NavbarComp, { LoggedInNavbar, LoggedOutNavbar, NavbarProps } from ".";

type Args = NavbarProps &
    Omit<LoggedInNavbar, "isLoggedIn"> &
    Omit<LoggedOutNavbar, "isLoggedIn"> & { isLoggedIn: boolean };

const meta: Meta<Args> = {
    component: NavbarComp,
    args: {
        cartCounter: 10,
        isLoggedIn: true,
        onCartIconClick: action("Cart Clicked!"),
        onLogIn: action("Log In!"),
        onLogoClick: action("Logo Clicked!"),
        onProfileClick: action("Profile Clicked!"),
        onSignUp: action("Sign Up!"),
        profileImg: "https://picsum.photos/200",
    },
    parameters: {
        layout: "fullscreen",
        backgrounds: {
            default: "dark",
        },
    },
};

export const Navbar: StoryFn<Args> = args => <NavbarComp {...args} />;

export default meta;
