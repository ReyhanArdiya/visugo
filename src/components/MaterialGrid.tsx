import { Grid, GridProps } from "@chakra-ui/react";

export type MaterialGridProps = GridProps;

const MaterialGrid = ({ children, ...props }: MaterialGridProps) => (
    <Grid
        templateColumns={{
            base: "repeat(4, 1fr)",
            md: "repeat(8, 1fr)",
            lg: "repeat(12, 1fr)",
        }}
        columnGap={{
            base: "4",
            md: "6",
        }}
        {...props}
    >
        {children}
    </Grid>
);

export default MaterialGrid;
