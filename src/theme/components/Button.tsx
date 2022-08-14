import { ComponentStyleConfig } from "@chakra-ui/react";

export enum ButtonVariants {
    SOLID = "solid",
    OUTLINE = "outline",
}

const Button: ComponentStyleConfig = {
    baseStyle: ({ colorMode }) => ({
        color: colorMode === "light" ? "white" : "black",
        fontFamily: "body",
    }),
    variants: {
        [ButtonVariants.SOLID]: ({ colorMode }) => ({
            ring: colorMode === "dark" && "1px",
            ringColor: colorMode === "light" ? "white" : "black",
            bg: colorMode === "light" ? "black" : "white",
            _hover: {
                bg: colorMode === "light" ? "white" : "black",
                color: colorMode === "light" ? "black" : "white",
                ring: colorMode === "light" && "1px",
                ringColor: colorMode === "light" && "black",
            },
            _active: {
                bg: colorMode === "light" ? "black" : "white",
                color: colorMode === "light" ? "white" : "black",
            },
        }),
        [ButtonVariants.OUTLINE]: {
            outline: "none",
            ring: "1px",
            ringColor: "accent",
            color: "accent",
            _hover: {
                bg: "none",
            },
            _active: {
                bg: "none",
            },
        },
    },
    defaultProps: {
        variant: ButtonVariants.SOLID,
    },
};

export default Button;
