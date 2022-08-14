import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import fonts from "./fonts";

const theme = extendTheme({
    config: {
        useSystemColorMode: true,
    },
    colors,
    fonts,
});

export default theme;

