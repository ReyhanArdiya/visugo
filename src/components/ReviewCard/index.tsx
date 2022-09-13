import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    Box,
    Button,
    ButtonGroup,
    Heading,
    HStack,
    Text,
    useBoolean,
    useStyleConfig,
    VStack,
} from "@chakra-ui/react";
import { motion, MotionConfig, Variants } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { ReviewDoc } from "../../models/user/listing/review";
import ProfilePic from "../ProfilePic";
import ReviewStars, { OnStarClick, ReviewStarsProps } from "./ReviewStars";

export interface ReviewCardEditableProps
    extends Pick<ReviewStarsProps, "onStarClick"> {
    onFinish?: (
        data: Omit<ReviewCardProps, "created" | "authorImage" | "edit">
    ) => void;
    onCancel?: () => void;
}

export interface ReviewCardProps {
    authorImage: string;
    authorName: string;
    created: Date;
    description: ReviewDoc["description"];
    star: ReviewDoc["star"];
    title: ReviewDoc["title"];
    edit?: ReviewCardEditableProps;
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
    edit,
}: ReviewCardProps) => {
    const [hidden, { toggle: toggleHidden }] = useBoolean(true);
    const [stars, setStars] = useState(star);

    const authorNameRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const cardStyles = useStyleConfig("Card");

    const onEditFinishHandler = useCallback(() => {
        if (edit?.onFinish) {
            edit.onFinish({
                authorName: authorNameRef.current?.innerText as string,
                description: descriptionRef.current?.innerText as string,
                title: titleRef.current?.innerText as string,
                star: stars,
            });
        }
    }, [edit, stars]);

    const onStarClickHandler = useCallback<OnStarClick>(
        index => {
            if (edit?.onStarClick) {
                setStars(index);
                edit.onStarClick(index);
            }
        },
        [edit]
    );

    const isHidden = hidden && !edit;

    return (
        <Accordion allowToggle>
            <AccordionItem border="none">
                <MotionConfig
                    transition={{
                        staggerChildren: 0.12,
                    }}
                >
                    <VStack
                        className="review-card"
                        variants={fadeIn}
                        as={motion.article}
                        initial="hidden"
                        animate="visible"
                        // animate={{
                        //     height: isHidden ? "256px" : "max-content",
                        //     transition: {
                        //         type: "tween",
                        //     },
                        // }}
                        // initial={false}
                        sx={cardStyles}
                        p="5"
                        spacing={4}
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
                                    noOfLines={isHidden ? 1 : undefined}
                                    as={motion.h4}
                                    variants={fadeIn}
                                    ref={authorNameRef}
                                    contentEditable={!!edit}
                                    cursor={edit ? "text" : "default"}
                                >
                                    {authorName}
                                </Heading>

                                <HStack
                                    w="full"
                                    justify="space-between"
                                >
                                    <ReviewStars
                                        count={stars}
                                        as={motion.div}
                                        // @ts-expect-error: this will exist cuz as motion
                                        variants={fadeIn}
                                        onStarClick={
                                            edit?.onStarClick && onStarClickHandler
                                        }
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
                            w="full"
                        >
                            <Heading
                                fontSize="2xl"
                                fontWeight="black"
                                fontFamily="title"
                                noOfLines={isHidden ? 1 : undefined}
                                as={motion.h3}
                                variants={fadeIn}
                                ref={titleRef}
                                contentEditable={!!edit}
                                cursor={edit ? "text" : "default"}
                                w="full"
                            >
                                {title}
                            </Heading>
                            <Text
                                fontSize="md"
                                noOfLines={isHidden ? 3 : undefined}
                                as={motion.p}
                                variants={fadeIn}
                                ref={descriptionRef}
                                contentEditable={!!edit}
                                cursor={edit ? "text" : "default"}
                                w="full"
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
                            {edit ? (
                                <ButtonGroup
                                    data-testid="edit-actions"
                                    w="full"
                                    justifyContent="center"
                                    spacing={10}
                                >
                                    <Button onClick={onEditFinishHandler}>
                                        Finish
                                    </Button>
                                    <Button onClick={edit.onCancel}>Cancel</Button>
                                </ButtonGroup>
                            ) : (
                                <AccordionButton
                                    data-testid="toggle-button"
                                    onClick={toggleHidden}
                                    rounded="inherit"
                                >
                                    <AccordionIcon />
                                </AccordionButton>
                            )}
                        </Box>
                    </VStack>
                </MotionConfig>
            </AccordionItem>
        </Accordion>
    );
};

export default ReviewCard;
