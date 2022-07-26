import { chakra, Image as ChakraImage } from "@chakra-ui/react";
import NextImage from "next/image";

const filters = { width: true, height: true, src: true, alt: true, layout: true };

/**
 * Combo of chakra & next image
 */
const Image =
    process.env.NODE_ENV === "development"
        ? ChakraImage
        : chakra(NextImage, {
              shouldForwardProp: (prop: keyof typeof filters) => filters[prop],
          });

export default Image;
