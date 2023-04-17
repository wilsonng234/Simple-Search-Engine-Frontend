import React from "react";
import "./documentCard.css";

import { Card, CardContent, Divider, Typography } from "@mui/material";
import LinkTypography from "./linkTypography";
import TitleTypography from "./titleTypography";
import KeyValueDisplay from "./keyValueDisplay";

import getParentLinksByUrl from "../../api/getParentLinksByUrl";

const DocumentCard = ({ document }) => {
    const {
        docId,
        url,
        size,
        title,
        lastModificationDate,
        // titleWordFreqs,
        bodyWordFreqs,
        childrenUrls,
    } = document;

    const [tenParentLinksDisplay, setTenParentLinksDisplay] = React.useState(
        []
    );

    React.useEffect(() => {
        const fetchParentLinks = async () => {
            const response = await getParentLinksByUrl(url);
            if (response.status !== 200) {
                console.log("Error: " + response.status);
                setTenParentLinksDisplay([]);
                return;
            }

            const parentLinks = response.data.parentUrls;

            const tenParentLinksDisplay = parentLinks
                .slice(0, 10)
                .map((parentLink) => {
                    return <LinkTypography key={parentLink} url={parentLink} />;
                });
            setTenParentLinksDisplay(tenParentLinksDisplay);
        };
        fetchParentLinks();
    }, [url]);

    const getTopKWordFreqsDisplay = (k) => {
        return bodyWordFreqs
            .slice(0, k)
            .map((bodyWordFreq) => (
                <KeyValueDisplay
                    key={bodyWordFreq.first}
                    left={bodyWordFreq.first}
                    right={bodyWordFreq.second}
                />
            ));
    };

    const tenChildrenUrls = childrenUrls
        .slice(0, 10)
        .map((childUrl) => <LinkTypography key={childUrl} url={childUrl} />);

    return (
        <Card
            key={docId}
            variant="outlined"
            sx={{
                color: "inherit",
                backgroundColor: "inherit",
                borderRadius: "30px",
                borderWidth: "1px",
                textAlign: "left",
                marginBottom: "20px",
            }}
        >
            <CardContent>
                <TitleTypography title={title} />
                <LinkTypography url={url} />
                <Divider sx={{ mt: "10px", mb: "10px" }} />

                <Typography variant="body1" color="text.secondary">
                    {new Date(lastModificationDate) + ", " + size}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    Top10 Word Frequencies
                </Typography>
                <div className="flex-container">
                    {getTopKWordFreqsDisplay(10)}
                </div>

                <Typography variant="body1" color="text.secondary">
                    Child Links:
                </Typography>
                {tenChildrenUrls}
                <Typography variant="body1" color="text.secondary">
                    Parent Links:
                </Typography>
                {tenParentLinksDisplay}
            </CardContent>
        </Card>
    );
};

export default DocumentCard;
