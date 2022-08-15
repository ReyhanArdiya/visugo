import {
    Badge,
    Circle,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export interface CardProps {
    src: string;
    title: string;
    price: number;
    sellerPic: string;
    sellerName: string;
    onCardClick: MouseEventHandler<HTMLDivElement>;
}

const Card = ({
    src,
    title,
    price,
    sellerPic,
    sellerName,
    onCardClick,
}: CardProps) => {
    const bg = useColorModeValue("white", "black");
    const color = useColorModeValue("black", "accent");

    return (
        <Grid
            onClick={onCardClick}
            as="article"
            tabIndex={0}
            _focusVisible={{
                outline: "2px solid",
                outlineColor: "accent",
            }}
            bg={bg}
            shadow="lg"
            _dark={{
                shadow: "none",
            }}
            _hover={{
                outline: "1px solid",
                outlineColor: "accent",
            }}
            outline="0px solid"
            outlineColor="accent"
            transition="outline 100ms ease-in-out"
            boxSize="full"
            rounded="md"
            templateColumns="repeat(12, 1fr)"
            templateRows="minmax(0, 2fr) 1fr 0.65fr"
            cursor="pointer"
            w="20em"
            h="25em"
        >
            <GridItem
                colSpan={12}
                roundedTop="inherit"
            >
                <Image
                    boxSize="full"
                    objectFit="cover"
                    objectPosition="center"
                    roundedTop="inherit"
                    src={src}
                />
            </GridItem>

            <GridItem
                colStart={2}
                colSpan={10}
                alignSelf="center"
            >
                <Heading
                    as="h2"
                    fontFamily="heading"
                    size="md"
                    fontWeight="bold"
                    noOfLines={2}
                    color={color}
                >
                    {title}
                </Heading>
            </GridItem>

            <GridItem
                colStart={2}
                colSpan={7}
                alignSelf="center"
            >
                <HStack>
                    <Circle
                        size="6"
                        bgImage={sellerPic}
                        bgPosition="center"
                        bgSize="cover"
                        bgRepeat="no-repeat"
                    />
                    <Text
                        fontSize="sm"
                        fontWeight="normal"
                        color={color}
                    >
                        {sellerName}
                    </Text>
                </HStack>
            </GridItem>

            <GridItem
                colStart={10}
                colSpan={2}
                alignSelf="center"
            >
                <Badge
                    variant="solid"
                    colorScheme="yellow"
                    fontSize="sm"
                >
                    &#36;{price}
                </Badge>
            </GridItem>
        </Grid>
    );
};

export default Card;
