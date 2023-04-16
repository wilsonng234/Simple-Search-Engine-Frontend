import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import DocumentCards from "./components/document/documentCards";
import SearchIcon from "@mui/icons-material/Search";

const AppTextField = styled(TextField)({
    marginBottom: "20px",
    width: "60%",

    "& .MuiOutlinedInput-root": {
        borderRadius: "40px",
    },
});

const AppDocumentCards = styled(DocumentCards)({
    width: "80%",
});

const AppSearchIcon = styled(SearchIcon)({
    "&: hover": {
        cursor: "pointer",
    },
});

export { AppTextField, AppDocumentCards, AppSearchIcon };
