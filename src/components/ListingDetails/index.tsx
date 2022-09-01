import {
    Button,
    GridItem,
    HStack,
    Image as ChakraImage,
    List,
    ListItem,
    Text,
} from "@chakra-ui/react";
import Image from "../Image";
import MaterialGrid from "../MaterialGrid";
import ReviewCard, { ReviewCardProps } from "../ReviewCard";
import ReviewStars from "../ReviewCard/ReviewStars";
import ListingDetailsHeader, {
    ListingDetailsHeaderProps,
} from "./ListingDetailsHeader";

import ListingDetailsReviewsHeader, {
    ListingDetailsReviewsHeaderProps,
} from "./ListingDetailsReviewsHeader";

export interface ListingDetailsProps
    extends ListingDetailsHeaderProps,
        ListingDetailsReviewsHeaderProps {
    description: string;
    price: number;
    reviews: ReviewCardProps[];
    productImage: string;
}

const ListingDetails = ({
    created,
    description,
    price,
    reviews,
    sellerImage,
    sellerName,
    stars,
    title,
    productImage,
}: ListingDetailsProps) => {
    const reviewCards = reviews.map((review, i) => (
        <GridItem
            key={i}
            // colSpan={{ base: 4, lg: 6 }}
            colSpan={{ base: 4, md: 8, lg: 12 }}
            as={ListItem}
        >
            <ReviewCard {...review} />
        </GridItem>
    ));

    return (
        <MaterialGrid
            boxSize="full"
            minH="600px"
            minW="300px"
            px={{ base: "4", md: "8" }}
            py="6"
            rowGap="8"
            maxW="container.lg"
            mx="auto"
        >
            <GridItem colSpan={{ base: 4, md: 8, lg: 12 }}>
                <ListingDetailsHeader
                    created={created}
                    title={title}
                    sellerImage={sellerImage}
                    sellerName={sellerName}
                />
            </GridItem>

            <GridItem
                colSpan={{ base: 4, md: 8, lg: 12 }}
                rowSpan={4}
                rowStart={2}
                rowGap="inherit"
            >
                <MaterialGrid
                    rowGap="inherit"
                    gridAutoRows="minmax(auto, 200px)"
                >
                    <GridItem
                        colSpan={{ base: 4, md: 8, lg: 12 }}
                        overflowY="auto"
                        alignSelf="center"
                    >
                        <HStack justify="space-between">
                            <ReviewStars
                                fontSize="4xl"
                                count={stars}
                                display={{ base: "none", md: "inline-block" }}
                            />
                            <Text
                                fontFamily="sans"
                                fontSize="5rem"
                                textAlign="right"
                                fontWeight="extrabold"
                                h="full"
                                flexGrow={1}
                            >
                                ${price}
                            </Text>
                        </HStack>
                    </GridItem>

                    <GridItem
                        colSpan={4}
                        rowSpan={2}
                    >
                        {process.env.NODE_ENV === "development" ? (
                            <ChakraImage
                                objectFit="cover"
                                boxSize="full"
                                src="https://picsum.photos/1000/1000"
                            />
                        ) : (
                            <Image
                                layout="fill"
                                src={productImage}
                            />
                        )}
                    </GridItem>

                    <GridItem
                        colSpan={{ base: 4, lg: 8 }}
                        rowSpan={2}
                        overflowY="auto"
                    >
                        <Text
                            fontFamily="body"
                            fontSize="lg"
                            fontWeight="normal"
                        >
                            {description}
                        </Text>
                    </GridItem>

                    <GridItem colSpan={{ base: 4, md: 8, lg: 12 }}>
                        <Button boxSize="full">Add to Cart</Button>
                    </GridItem>
                </MaterialGrid>
            </GridItem>

            <GridItem colSpan={{ base: 4, md: 8, lg: 12 }}>
                <ListingDetailsReviewsHeader stars={stars} />
            </GridItem>

            <GridItem
                colSpan={{ base: 4, md: 8, lg: 12 }}
                rowGap="inherit"
            >
                <MaterialGrid
                    rowGap="inherit"
                    as={List}
                    // gridAutoRows="minmax(auto, 200px)"
                >
                    {reviewCards}
                </MaterialGrid>
            </GridItem>
        </MaterialGrid>
    );
};

export default ListingDetails;
