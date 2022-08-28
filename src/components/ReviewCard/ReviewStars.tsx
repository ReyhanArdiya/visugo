import { StarIcon } from "@chakra-ui/icons";
import { HStack, StackProps } from "@chakra-ui/react";
import { ReviewDoc } from "../../models/user/listing/review";

export interface ReviewStarsProps extends StackProps {
    count: ReviewDoc["star"];
}

const ReviewStars = ({ count, ...props }: ReviewStarsProps) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(<StarIcon color={i < count ? "accent" : ""} />);
    }

    return <HStack {...props}>{stars}</HStack>;
};

export default ReviewStars;
