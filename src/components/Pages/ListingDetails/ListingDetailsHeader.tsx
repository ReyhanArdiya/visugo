import { Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { motion, MotionConfig } from "framer-motion";
import { fadeFromLeft, fadeFromRight } from "../../../styles/framer-variants";
import ProfilePic from "../../ProfilePic";

export interface ListingDetailsHeaderProps {
    sellerImage: string;
    sellerName: string;
    title: string;
    created: Date;
}

const ListingDetailsHeader = ({
    sellerName,
    sellerImage,
    title,
    created,
}: ListingDetailsHeaderProps) => {
    return (
        <MotionConfig
            transition={{
                ease: "easeOut",
                duration: 0.25,
                type: "tween",
            }}
        >
            <VStack
                as={motion.header}
                initial="hidden"
                animate="visible"
                align="flex-start"
                spacing="3"
            >
                <Text
                    as={motion.h1}
                    variants={fadeFromLeft}
                    fontFamily="heading"
                    fontSize="4xl"
                    lineHeight={1}
                >
                    {title}
                </Text>
                <Divider
                    bg="accent"
                    h="0.5px"
                    opacity={1}
                />

                <HStack
                    justify="space-between"
                    w="full"
                >
                    <HStack
                        as={motion.div}
                        variants={fadeFromLeft}
                    >
                        <ProfilePic
                            src={sellerImage}
                            size="8"
                        />
                        <Text
                            fontSize="md"
                            fontWeight="normal"
                        >
                            {sellerName}
                        </Text>
                    </HStack>

                    <Text
                        fontFamily="sans"
                        fontSize="md"
                        as={motion.div}
                        variants={fadeFromRight}
                    >
                        {created.toLocaleDateString()}
                    </Text>
                </HStack>
            </VStack>
        </MotionConfig>
    );
};

export default ListingDetailsHeader;
