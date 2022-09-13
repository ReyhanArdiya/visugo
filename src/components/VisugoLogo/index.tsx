import { Image, ImageProps, Text, VStack } from "@chakra-ui/react";

export interface VisugoLogoProps extends ImageProps {
    noText?: boolean;
}

const VisugoLogo = ({ noText, ...props }: VisugoLogoProps) => (
    <VStack
        spacing="0"
        w={props.w || props.boxSize || "28.8em"}
        justify="center"
    >
        <Image
            src="images/visugo-logo.png"
            maxW="14.4em"
            {...props}
        />
        {!noText && (
            <Text
                as="h1"
                textStyle="h1"
                fontSize="4.8em"
                textAlign="center"
            >
                Visugo
            </Text>
        )}
    </VStack>
);

export default VisugoLogo;
