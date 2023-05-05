import styled from "@emotion/styled";
import { Autocomplete } from "@mui/material";

const SearchBarAutocomplete = styled(Autocomplete)({
    marginBottom: "20px",
    width: "60%",

    "& .MuiOutlinedInput-root": {
        borderRadius: "40px",
    },
});

export default SearchBarAutocomplete;
