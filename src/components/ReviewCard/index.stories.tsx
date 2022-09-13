import type { Meta, StoryFn } from "@storybook/react";
import ReviewCardComp, { ReviewCardProps } from ".";

type Args = ReviewCardProps;

const meta: Meta<Args> = {
    component: ReviewCardComp,
    args: {
        // @ts-expect-error: just need the toggle baeb
        edit: false,
        authorImage: "https://picsum.photos/500",
        authorName: "Elys Maldov",
        created: new Date(),
        description:
            "Lorem ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer amet consecturer amet consecturerameamet consectureramet consectureramet consecturert consecturer Lorem ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer amet consecturer amet consecturerameamet consectureramet consectureramet consecturert consecturer Lorem ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer amet consecturer amet consecturerameamet consectureramet consectureramet consecturert consecturer Lorem ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer ipsum dolor domo sit amet consecturer amet consecturer amet consecturerameamet consectureramet consectureramet consecturert consecturer",
        star: 3,
        title: "Hello world and all who inhabit it it is so nice to meet you guys Hello world and all who inhabit it it is so nice to meet you guys Hello world and all who inhabit it it is so nice to meet you guys",
    },
};

export const ReviewCard: StoryFn<Args> = args => (
    <ReviewCardComp
        edit={
            args.edit && {
                onFinish(data) {
                    console.log(data);
                },
                onCancel() {
                    console.log("cancel");
                },
                onStarClick(index) {
                    console.log(index);
                },
            }
        }
        {...args}
    />
);

export default meta;
