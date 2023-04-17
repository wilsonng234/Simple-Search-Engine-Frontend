import Typography from "@mui/material/Typography";

const ScoreTypography = ({ score }) => (
    <Typography
        variant="body1"
        color="text.secondary"
        style={{
            float: "right",
        }}
    >
        {score}
    </Typography>
);

export default ScoreTypography;
