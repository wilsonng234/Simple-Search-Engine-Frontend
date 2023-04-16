import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const LinkTypography = ({ url }) => (
    <Typography variant="h6">
        <Link href={url} underline="none">
            {url}
        </Link>
    </Typography>
);

export default LinkTypography;
