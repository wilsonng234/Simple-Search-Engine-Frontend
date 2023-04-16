import Chip from "@mui/material/Chip";

const KeyValueDisplay = ({ left, right }) => {
    return <Chip label={left + ": " + right} />;
};

export default KeyValueDisplay;
