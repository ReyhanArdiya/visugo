import type { Meta, StoryFn } from "@storybook/react";
import ProfilePicComp, { ProfilePicProps } from ".";

type Args = ProfilePicProps;

const meta: Meta<Args> = {
    component: ProfilePicComp,
    args: {
        src: "https://picsum.photos/200",
        size: 20,
    },
};

export const ProfilePic: StoryFn<Args> = args => <ProfilePicComp {...args} />;

export default meta;
