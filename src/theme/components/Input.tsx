import { ComponentStyleConfig } from "@chakra-ui/react";

export enum InputVariants {
    OUTLINE = "outline",
}

const Input: ComponentStyleConfig = {
    baseStyle: ({ colorMode }) => ({
        field: {
            bg: colorMode === "light" ? "transparent" : "black",
            border: "1px solid",
            borderColor: colorMode === "light" ? "black" : "white",
            color: colorMode === "light" ? "black" : "accent",
        },
    }),
    defaultProps: {
        variant: null,
    },
};

export default Input;
