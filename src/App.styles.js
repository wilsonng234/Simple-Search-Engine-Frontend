import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import DocumentCards from "./components/document/documentCards";

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

export { AppTextField, AppDocumentCards };
