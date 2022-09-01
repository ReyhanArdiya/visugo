import { Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReviewDoc } from "../../models/user/listing/review";
import { fadeFromLeft } from "../../styles/framer-variants";
import ReviewStars from "../ReviewCard/ReviewStars";

export interface ListingDetailsReviewsHeaderProps {
    stars: ReviewDoc["star"];
}

const ListingDetailsReviewsHeader = ({
    stars,
}: ListingDetailsReviewsHeaderProps) => (
    <VStack
        as={motion.header}
        initial="hidden"
        animate="visible"
        align="flex-start"
        spacing="3"
    >
        <HStack
            w="full"
            justify="space-between"
            spacing={0}
        >
            <Text
                as={motion.h1}
                variants={fadeFromLeft}
                fontFamily="heading"
                fontSize="4xl"
                lineHeight={1}
            >
                Reviews
            </Text>

            <ReviewStars
                fontSize="xl"
                count={stars}
            />
        </HStack>

        <Divider
            bg="accent"
            h="0.5px"
            opacity={1}
        />

        <HStack
            justify="end"
            w="full"
        >
            <Button>Add Review</Button>
        </HStack>
    </VStack>
);

export default ListingDetailsReviewsHeader;
