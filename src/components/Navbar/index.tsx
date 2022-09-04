import { HStack, List, ListItem, Spacer } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import CartIcon, { CartIconProps } from "../Icons/CartIcon";
import ProfilePic from "../ProfilePic";
import VisugoLogo from "../VisugoLogo";

export interface NavbarProps extends CartIconProps {
    profileImg: string;
    onLogoClick: MouseEventHandler;
    onProfileClick: MouseEventHandler;
}

const Navbar = ({
    profileImg,
    cartCounter,
    onLogoClick,
    onProfileClick,
    onCartIconClick,
}: NavbarProps) => {
    return (
        <HStack
            px={2}
            as={List}
            bg="white"
            h="16"
            justify="space-between"
            align="center"
        >
            <ListItem boxSize="max-content">
                <VisugoLogo
                    noText
                    boxSize="12"
                    onClick={onLogoClick}
                    cursor="pointer"
                />
            </ListItem>

            <Spacer />

            <HStack
                as={ListItem}
                justify="space-between"
                spacing={10}
            >
                <ProfilePic
                    src={profileImg}
                    size="10"
                    onClick={onProfileClick}
                    cursor="pointer"
                />

                <CartIcon
                    cartCounter={cartCounter || 10}
                    onCartIconClick={onCartIconClick}
                />
            </HStack>
        </HStack>
    );
};

export default Navbar;
