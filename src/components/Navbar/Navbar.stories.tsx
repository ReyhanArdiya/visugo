import type { Meta, StoryFn } from "@storybook/react";
import NavbarComp, { NavbarProps } from ".";

interface Args extends NavbarProps {
    nmeo: 1;
}

const meta: Meta<Args> = {
    component: NavbarComp,
    args: {
        profileImg: "https://picsum.photos/200",
        cartCounter: 0,
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
