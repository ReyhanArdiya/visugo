import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    ModalProps,
    Button,
    List,
    ListItem,
    Text,
    Box,
    useTheme,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import ProductCard, { ProductCardProps } from "./ProductCard";

export interface CartModalProps extends Omit<ModalProps, "children"> {
    onCheckout: MouseEventHandler<HTMLButtonElement>;
    products: ProductCardProps[];
    totalPrice: number;
}

const CartModal = ({
    onCheckout,
    products,
    totalPrice,
    ...modalProps
}: CartModalProps) => {
    const productCards = products.map(
        (
            {
                image,
                onAdd,
                onRemove,
                price,
                seller,
                title,
                quantity,
                onImageClick,
                onDelete,
            },
            i
        ) => (
            <ListItem key={i}>
                <ProductCard
                    image={image}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    price={price}
                    seller={seller}
                    title={title}
                    quantity={quantity}
                    onDelete={onDelete}
                    onImageClick={onImageClick}
                />
            </ListItem>
        )
    );

    const {
        colors: { accent },
    } = useTheme();

    return (
        <Modal
            {...modalProps}
            isCentered
            scrollBehavior="inside"
            size={{
                base: "full",
                md: "xl",
            }}
        >
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Your Cart</ModalHeader>
                <ModalCloseButton />

                <ModalBody p={2}>
                    <List spacing="2">{productCards}</List>
                </ModalBody>

                <ModalFooter justifyContent="space-between">
                    <Text
                        fontSize="xl"
                        fontFamily="title"
                        fontWeight="black"
                    >
                        Total:{" "}
                        <Box
                            display="inline-block"
                            // bg="accent"
                            bgGradient={`linear-gradient(180deg,rgba(255,255,255,0) 50%, ${accent} 50%)`}
                        >
                            ${totalPrice}
                        </Box>
                    </Text>
                    <Button onClick={onCheckout}>Checkout</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CartModal;
