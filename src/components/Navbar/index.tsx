import { Button, HStack, List, ListItem, Skeleton, Spacer } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import CartIcon, { CartIconProps } from "../Icons/CartIcon";
import ProfilePic from "../ProfilePic";
import VisugoLogo from "../VisugoLogo";

export interface LoggedInNavbar extends CartIconProps {
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
    onLogoClick: MouseEventHandler;
    isLoaded: boolean;
}

const Navbar = ({
    profileImg,
    isLoggedIn,
    onLogoClick,
    isLoaded,
    ...props
}: NavbarProps & (LoggedInNavbar | LoggedOutNavbar)) => {
    const rightActions = isLoggedIn ? (
        <HStack
            as={ListItem}
            justify="space-between"
            spacing={10}
        >
            <Skeleton isLoaded={isLoaded}>
                <ProfilePic
                    src={profileImg}
                    size="10"
                    onClick={(props as LoggedInNavbar)?.onProfileClick}
                    cursor="pointer"
                />
            </Skeleton>

            <Skeleton isLoaded={isLoaded}>
                <CartIcon
                    cartCounter={(props as LoggedInNavbar)?.cartCounter}
                    onCartIconClick={(props as LoggedInNavbar)?.onCartIconClick}
                />
            </Skeleton>
        </HStack>
    ) : (
        <HStack
            as={ListItem}
            justify="space-between"
            spacing={2}
        >
            <Skeleton isLoaded={isLoaded}>
                <Button
                    // Apparently you can send colorMode thru props too
                    // colorMode="dark"
                    variant="outline"
                    onClick={(props as LoggedOutNavbar)?.onSignUp}
                >
                    Sign Up
                </Button>
            </Skeleton>

            <Skeleton isLoaded={isLoaded}>
                <Button onClick={(props as LoggedOutNavbar)?.onLogIn}>Log In</Button>
            </Skeleton>
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
            pos="sticky"
            top={0}
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

            {rightActions}
        </HStack>
    );
};

export default Navbar;
