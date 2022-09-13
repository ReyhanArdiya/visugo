import { Circle, SquareProps } from "@chakra-ui/react";

export interface ProfilePicProps extends SquareProps {
    src: string;
}

const ProfilePic = ({ src, ...props }: ProfilePicProps) => {
    return (
        <Circle
            size="6"
            bgImage={src}
            bgPosition="center"
            bgSize="cover"
            bgRepeat="no-repeat"
            {...props}
        />
    );
};

export default ProfilePic;
