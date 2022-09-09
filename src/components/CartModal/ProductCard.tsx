import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    GridItem,
    Heading,
    Icon,
    Text,
    VStack,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { BsTrashFill } from "react-icons/bs";
import Image from "../Image";

export interface ProductCardProps {
    image: string;
    onAdd: MouseEventHandler<HTMLButtonElement>;
    onDelete: MouseEventHandler<HTMLButtonElement>;
    onImageClick?: MouseEventHandler<HTMLImageElement>;
    onRemove: MouseEventHandler<HTMLButtonElement>;
    price: number;
    quantity: number;
    seller: string;
    title: string;
}

const ProductCard = ({
    image,
    onAdd,
    onDelete,
    onImageClick,
    onRemove,
    price,
    quantity,
    seller,
    title,
}: ProductCardProps) => (
    <Grid
        columnGap="2"
        rowGap="10"
        bg="blackAlpha.100"
        rounded="xl"
        gridTemplateAreas={`"image info"
                                "action action"`}
        gridAutoColumns="1fr"
        padding="4"
    >
        <GridItem
            gridArea="image"
            rounded="inherit"
        >
            <Box rounded="inherit">
                <Image
                    rounded="inherit"
                    layout="fill"
                    src={image}
                    cursor={onImageClick ? "pointer" : "default"}
                    onClick={onImageClick}
                />
            </Box>
        </GridItem>

        <GridItem gridArea="info">
            <VStack
                spacing={2}
                align="end"
            >
                <VStack
                    spacing={0}
                    align="end"
                >
                    <Heading
                        fontSize={{
                            base: "2xl",
                            md: "3xl",
                        }}
                        textAlign="right"
                    >
                        {title}
                    </Heading>

                    <Text
                        textAlign="right"
                        fontSize={{
                            base: "lg",
                            md: "xl",
                        }}
                    >
                        by{" "}
                        <Text
                            color="gray.500"
                            as="i"
                        >
                            {seller}
                        </Text>
                    </Text>
                </VStack>

                <VStack
                    w="full"
                    fontSize={{
                        base: "lg",
                        md: "xl",
                    }}
                    align="flex-end"
                >
                    <Text
                        color="accent"
                        fontWeight="black"
                    >
                        ${price} x {quantity}
                    </Text>
                </VStack>
            </VStack>
        </GridItem>

        <ButtonGroup
            as={GridItem}
            gridArea="action"
            w="full"
            justifyContent="flex-end"
        >
            <Button onClick={onDelete}>
                <Icon as={BsTrashFill} />
            </Button>
            <Button onClick={onRemove}>-</Button>
            <Button onClick={onAdd}>+</Button>
        </ButtonGroup>
    </Grid>
);

export default ProductCard;
