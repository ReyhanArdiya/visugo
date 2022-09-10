import { Button, HStack, List, ListItem, Spacer } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import CartIcon, { CartIconProps } from "../Icons/CartIcon";
import ProfilePic from "../ProfilePic";
import VisugoLogo from "../VisugoLogo";

export interface LoggedInNavbar extends CartIconProps {
    onLogoClick?: MouseEventHandler;
    onProfileClick?: MouseEventHandler;
    isLoggedIn: true;
}

export interface LoggedOutNavbar {
    onSignUp?: MouseEventHandler;
    onLogIn?: MouseEventHandler;
    isLoggedIn: false;
}

export interface NavbarProps {
    profileImg: string;
}

const Navbar = ({
    profileImg,
    isLoggedIn,
    ...props
}: NavbarProps & (LoggedInNavbar | LoggedOutNavbar)) => {
    const rightActions = isLoggedIn ? (
        <HStack
            as={ListItem}
            justify="space-between"
            spacing={10}
        >
            <ProfilePic
                src={profileImg}
                size="10"
                onClick={(props as LoggedInNavbar)?.onProfileClick}
                cursor="pointer"
            />

            <CartIcon
                cartCounter={(props as LoggedInNavbar)?.cartCounter || 10}
                onCartIconClick={(props as LoggedInNavbar)?.onCartIconClick}
            />
        </HStack>
    ) : (
        <HStack
            as={ListItem}
            justify="space-between"
            spacing={2}
        >
            <Button
                // @ts-expect-error: Apparently you can send colorMode thru props too
                colorMode="dark"
                onClick={(props as LoggedOutNavbar)?.onSignUp}
            >
                Sign Up
            </Button>
            <Button onClick={(props as LoggedOutNavbar)?.onLogIn}>Log In</Button>
        </HStack>
    );

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
                    onClick={(props as LoggedInNavbar)?.onLogoClick}
                    cursor="pointer"
                />
            </ListItem>

            <Spacer />

            {rightActions}
        </HStack>
    );
};

export default Navbar;
