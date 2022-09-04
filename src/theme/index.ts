import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import fonts from "./fonts";
import textStyles from "./text-styles";

const theme = extendTheme({
    config: {
        useSystemColorMode: true,
    },
    components: {
        Button,
        Input,
        Card,
    },
    colors,
    fonts,
    styles: {
        global: {
            body: {
                fontSize: "62.5%",
            },
        },
    },
    textStyles,
});

export default theme;
