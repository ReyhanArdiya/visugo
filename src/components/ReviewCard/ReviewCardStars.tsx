import { StarIcon } from "@chakra-ui/icons";
import { HStack, StackProps } from "@chakra-ui/react";
import { ReviewDoc } from "../../models/user/listing/review";

export interface ReviewCardStarsProps extends StackProps {
    count: ReviewDoc["star"];
}

const ReviewCardStars = ({ count, ...props }: ReviewCardStarsProps) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(<StarIcon color={i < count ? "accent" : ""} />);
    }

    return <HStack {...props}>{stars}</HStack>;
};

export default ReviewCardStars;
