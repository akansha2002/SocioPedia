import {Box } from "@mui/material";
import {styled} from "@mui/system";

// this is a good syntax if u r reusing css as a component- not a famous syntax
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})

export default FlexBetween;



