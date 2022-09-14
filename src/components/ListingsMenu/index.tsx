import { Grid, GridItem, List, ListItem } from "@chakra-ui/react";
import ListingCard, { ListingCardProps } from "../ListingCard";

export interface ListingsMenuProps {
    listings: ListingCardProps[];
}

const ListingsMenu = ({ listings }: ListingsMenuProps) => {
    const listingCards = listings.map((listing, i) => (
        <GridItem
            as={ListItem}
            key={i}
        >
            <ListingCard {...listing} />
        </GridItem>
    ));

    return (
        <Grid
            gap="10"
            as={List}
            bg="gray.100"
            justifyItems="center"
            alignItems="center"
            p="8"
            rounded="md"
            w="full"
            maxW="container.md"
            overflowY="auto"
            gridAutoFlow={{ base: "column", md: "row" }}
            gridTemplateColumns={{ md: "repeat(3, 1fr)" }}
            maxH={96}
        >
            {listingCards}
        </Grid>
    );
};

export default ListingsMenu;
