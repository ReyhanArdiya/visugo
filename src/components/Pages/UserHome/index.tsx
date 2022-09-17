import { Button, Heading, Stack, VStack } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import ListingsMenu, { ListingsMenuProps } from "../../ListingsMenu";
import ProfilePic from "../../ProfilePic";

export interface UserHomeProps extends ListingsMenuProps {
    profilePicSrc: string;
    username: string;
    onLogout: MouseEventHandler;
    onDeleteAccount: MouseEventHandler;
}

const UserHome = ({
    profilePicSrc,
    username,
    listings,
    onDeleteAccount,
    onLogout,
}: UserHomeProps) => {
    return (
        <VStack
            py="10"
            boxSize="full"
            spacing={10}
        >
            <Stack
                w="full"
                direction={{ base: "column", md: "row" }}
                spacing={10}
                align="center"
                justify="center"
            >
                <ProfilePic
                    src={profilePicSrc}
                    size="40"
                />

                <Heading fontSize="4xl">{username}</Heading>
            </Stack>

            <Stack
                direction={{ base: "column", md: "row" }}
                spacing={5}
            >
                <Button
                    size="lg"
                    onClick={onLogout}
                >
                    Logout
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    onClick={onDeleteAccount}
                >
                    Delete Account
                </Button>
            </Stack>

            <VStack
                boxSize="full"
                bg="accent"
                py="3"
            >
                <Heading
                    fontSize="4xl"
                    as="h2"
                    fontFamily="title"
                >
                    Your listings
                </Heading>
                <ListingsMenu listings={listings} />
            </VStack>
        </VStack>
    );
};

export default UserHome;
