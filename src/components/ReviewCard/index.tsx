import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    Box,
    Heading,
    HStack,
    Text,
    useBoolean,
    useStyleConfig,
    VStack,
} from "@chakra-ui/react";
import { motion, MotionConfig, Variants } from "framer-motion";
import { ReviewDoc } from "../../models/user/listing/review";
import ProfilePic from "../ProfilePic";
import ReviewStars from "./ReviewStars";

export interface ReviewCardProps {
    authorImage: string;
    authorName: string;
    created: Date;
    description: ReviewDoc["description"];
    star: ReviewDoc["star"];
    title: ReviewDoc["title"];
}

const fadeIn: Variants = {
    hidden: {
        y: "1.5em",
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const ReviewCard = ({
    authorImage,
    authorName,
    created,
    description,
    star,
    title,
}: ReviewCardProps) => {
    const [hidden, { toggle: toggleHidden }] = useBoolean(true);

    const cardStyles = useStyleConfig("Card");

    return (
        <Accordion allowToggle>
            <AccordionItem border="none">
                <MotionConfig
                    transition={{
                        staggerChildren: 0.12,
                    }}
                >
                    <VStack
                        variants={fadeIn}
                        as={motion.article}
                        initial="hidden"
                        animate="visible"
                        // animate={{
                        //     height: hidden ? "256px" : "max-content",
                        //     transition: {
                        //         type: "tween",
                        //     },
                        // }}
                        // initial={false}
                        sx={cardStyles}
                        p="5"
                        spacing={4}
                        minW={80}
                        maxW={96}
                    >
                        <HStack
                            w="full"
                            spacing="4"
                        >
                            <ProfilePic
                                src={authorImage}
                                size="10"
                                as={motion.div}
                                // @ts-expect-error: this will exist cuz as motion
                                variants={fadeIn}
                            />

                            <VStack
                                w="full"
                                align="start"
                                spacing="0"
                            >
                                <Heading
                                    fontFamily="body"
                                    fontWeight="thin"
                                    fontSize="lg"
                                    noOfLines={hidden ? 1 : undefined}
                                    as={motion.div}
                                    variants={fadeIn}
                                >
                                    {authorName}
                                </Heading>

                                <HStack
                                    w="full"
                                    justify="space-between"
                                >
                                    <ReviewStars
                                        count={star}
                                        as={motion.div}
                                        // @ts-expect-error: this will exist cuz as motion
                                        variants={fadeIn}
                                    />
                                    <Text
                                        fontSize="sm"
                                        fontFamily="title"
                                        as={motion.div}
                                        variants={fadeIn}
                                    >
                                        {created.toLocaleDateString()}
                                    </Text>
                                </HStack>
                            </VStack>
                        </HStack>

                        <VStack
                            align="start"
                            spacing="0"
                        >
                            <Heading
                                fontSize="2xl"
                                fontWeight="black"
                                fontFamily="title"
                                noOfLines={hidden ? 1 : undefined}
                                as={motion.h4}
                                variants={fadeIn}
                            >
                                {title}
                            </Heading>
                            <Text
                                fontSize="md"
                                noOfLines={hidden ? 3 : undefined}
                                as={motion.p}
                                variants={fadeIn}
                            >
                                {description}
                            </Text>
                        </VStack>

                        <Box
                            role="heading"
                            rounded="inherit"
                            as={motion.div}
                            variants={fadeIn}
                        >
                            <AccordionButton
                                onClick={toggleHidden}
                                rounded="inherit"
                            >
                                <AccordionIcon />
                            </AccordionButton>
                        </Box>
                    </VStack>
                </MotionConfig>
            </AccordionItem>
        </Accordion>
    );
};

export default ReviewCard;
