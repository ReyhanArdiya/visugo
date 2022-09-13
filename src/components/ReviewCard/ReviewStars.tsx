import { StarIcon } from "@chakra-ui/icons";
import { HStack, StackProps } from "@chakra-ui/react";
import { ReviewDoc } from "../../models/user/listing/review";

export type OnStarClick = (index: ReviewDoc["star"]) => void;

export interface ReviewStarsProps extends StackProps {
    count: ReviewDoc["star"];
    onStarClick?: OnStarClick;
}

const ReviewStars = ({ count, onStarClick, ...props }: ReviewStarsProps) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <StarIcon
                onClick={onStarClick?.bind(null, (i + 1) as typeof count)}
                color={i < count ? "accent" : ""}
                cursor={onStarClick ? "pointer" : "default"}
            />
        );
    }

    return <HStack {...props}>{stars}</HStack>;
};

export default ReviewStars;
