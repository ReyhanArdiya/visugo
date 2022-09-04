import type { Meta, StoryFn } from "@storybook/react";
import VisugoLogoComp from ".";

interface Args {
    noText: boolean;
}

const meta: Meta<Args> = {
    component: VisugoLogoComp,
    args: {
        noText: false,
    },
};

export const VisugoLogo: StoryFn<Args> = args => <VisugoLogoComp {...args} />;

export default meta;
