import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import Button from "./components/Button";
import Input from "./components/Input";
import fonts from "./fonts";

const theme = extendTheme({
    config: {
        useSystemColorMode: true,
    },
    components: {
        Button,
        Input,
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
});

export default theme;
