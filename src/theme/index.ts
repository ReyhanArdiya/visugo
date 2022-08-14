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
});

export default theme;
