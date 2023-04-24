import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const SearchBarTextField = styled(TextField)({
    marginBottom: "20px",
    width: "60%",

    "& .MuiOutlinedInput-root": {
        borderRadius: "40px",
    },
});

export default SearchBarTextField;
