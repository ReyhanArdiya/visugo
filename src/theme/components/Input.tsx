import { ComponentStyleConfig } from "@chakra-ui/react";

export enum InputVariants {
    OUTLINE = "outline",
}

const Input: ComponentStyleConfig = {
    baseStyle: ({ colorMode }) => ({
        field: {
            bg: colorMode === "light" ? "transparent" : "black",
            border: colorMode === "light" && "1px solid black",
            color: "accent",
        },
    }),
    defaultProps: {
        variant: null,
    },
};

export default Input;
