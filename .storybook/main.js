/**@type {import("@storybook/builder-vite").StorybookViteConfig}*/
const config = {
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@chakra-ui/storybook-addon",
    ],
    framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-vite",
    },
    features: {
        storyStoreV7: true,
        emotionAlias: false,
    },
    staticDirs: ["../public"],
};

module.exports = config;
