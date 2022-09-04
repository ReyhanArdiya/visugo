import {
    Badge,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Text,
    useColorModeValue,
    useStyleConfig,
} from "@chakra-ui/react";
import { motion, MotionConfig } from "framer-motion";
import { MouseEventHandler } from "react";
import ProfilePic from "../ProfilePic";

export interface ListingCardProps {
    src: string;
    title: string;
    price: number;
    sellerPic: string;
    sellerName: string;
    onCardClick: MouseEventHandler<HTMLDivElement>;
}

const ListingCard = ({
    src,
    title,
    price,
    sellerPic,
    sellerName,
    onCardClick,
}: ListingCardProps) => {
    const bg = useColorModeValue("white", "black");
    const color = useColorModeValue("black", "accent");

    const cardStyle = useStyleConfig("Card");

    return (
        <MotionConfig
            transition={{
                type: "spring",
                damping: 15,
                stiffness: 280,
            }}
        >
            <Grid
                sx={cardStyle}
                userSelect="none"
                onClick={onCardClick}
                as={motion.article}
                whileHover={{
                    scale: 1.1,
                }}
                whileTap={{
                    scale: 0.9,
                }}
                tabIndex={0}
                _focusVisible={{
                    outline: "2px solid",
                    outlineColor: "accent",
                }}
                bg={bg}
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
                        <ProfilePic src={sellerPic} />
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
        </MotionConfig>
    );
};

export default ListingCard;
