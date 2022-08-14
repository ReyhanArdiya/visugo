import { Image, Text, VStack } from "@chakra-ui/react";

export interface VisugoLogoProps {
    noText?: boolean;
}

const VisugoLogo = ({ noText }: VisugoLogoProps) => (
    <VStack
        spacing="0"
        w="28.8em"
        justify="center"
    >
        <Image
            src="images/visugo-logo.png"
            maxW="14.4em"
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
