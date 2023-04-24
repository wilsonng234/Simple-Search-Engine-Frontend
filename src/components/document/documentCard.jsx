import React from "react";
import "./documentCard.css";

import { Card, CardContent, Divider, Typography } from "@mui/material";
import LinkTypography from "./linkTypography";
import TitleTypography from "./titleTypography";
import KeyValueDisplay from "./keyValueDisplay";

import getParentLinksByUrl from "../../api/getParentLinksByUrl";
import ScoreTypography from "./scoreTypography";

const DocumentCard = ({ document }) => {
    const {
        score,
        docId,
        url,
        size,
        title,
        lastModificationDate,
        titleWordFreqs,
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
        const combinedWordFreqs = bodyWordFreqs.map((element) => ({
            ...element,
        }));

        for (const titleWordFreq of titleWordFreqs.map((element) => ({
            ...element,
        }))) {
            const idx = combinedWordFreqs.findIndex(
                (combinedWordFreq) =>
                    combinedWordFreq.first === titleWordFreq.first
            );

            console.log(title);
            if (idx === -1) {
                combinedWordFreqs.push(titleWordFreq);
            } else {
                combinedWordFreqs[idx].second += titleWordFreq.second;
            }
        }

        combinedWordFreqs.sort((a, b) => b.second - a.second);
        return combinedWordFreqs
            .slice(0, k)
            .map((combinedWordFreq) => (
                <KeyValueDisplay
                    key={combinedWordFreq.first}
                    left={combinedWordFreq.first}
                    right={combinedWordFreq.second}
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
                {score !== "NaN" && <ScoreTypography score={score} />}

                <TitleTypography title={title} />
                <LinkTypography url={url} />
                <Divider sx={{ mt: "10px", mb: "10px" }} />

                <Typography
                    variant="body1"
                    color="text.secondary"
                    children={new Date(lastModificationDate) + ", " + size}
                />

                <Typography
                    variant="body1"
                    color="text.secondary"
                    children="Top10 Word Frequencies"
                />

                <div className="flex-container">
                    {getTopKWordFreqsDisplay(10)}
                </div>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    children="Child Links:"
                />
                {tenChildrenUrls.length > 0 ? (
                    tenChildrenUrls
                ) : (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        children="No Children Links"
                    />
                )}

                <Typography
                    variant="body1"
                    color="text.secondary"
                    children="Parent Links:"
                />
                {tenParentLinksDisplay.length > 0 ? (
                    tenParentLinksDisplay
                ) : (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        children="No Parent Links"
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default DocumentCard;
