import { Center, Circle, Icon } from "@chakra-ui/react";
import { motion, useAnimationControls } from "framer-motion";
import { MouseEventHandler, useEffect } from "react";
import { MdShoppingCart } from "react-icons/md";

export interface CartIconProps {
    cartCounter: number;
    onCartIconClick: MouseEventHandler;
}

const CartIcon = ({ cartCounter, onCartIconClick }: CartIconProps) => {
    const controls = useAnimationControls();
    const isCounterVisible = cartCounter > 0;

    useEffect(() => {
        if (isCounterVisible) {
            (async () => {
                await controls.start(
                    {
                        scale: 1.5,
                    },
                    {
                        type: "spring",
                        damping: 5,
                        mass: 0.2,
                    }
                );

                await controls.start(
                    {
                        scale: 1,
                    },
                    {
                        type: "spring",
                    }
                );
            })();
        }
    }, [cartCounter, controls, isCounterVisible]);

    return (
        <Center
            pos="relative"
            onClick={onCartIconClick}
            cursor="pointer"
        >
            <Icon
                as={MdShoppingCart}
                boxSize="9"
            />

            <Circle
                as={motion.div}
                animate={controls}
                bg="accent"
                fontFamily="body"
                fontSize="xs"
                left="-0.4em"
                pos="absolute"
                size="6"
                top="-0.8em"
                userSelect="none"
            >
                {cartCounter}
            </Circle>
        </Center>
    );
};

export default CartIcon;
