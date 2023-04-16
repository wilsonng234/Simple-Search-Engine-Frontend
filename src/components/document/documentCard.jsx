import React from "react";
import "./documentCard.css";

import {
    Card,
    CardContent,
    Divider,
    Typography,
    withStyles,
} from "@mui/material";
import LinkTypography from "./linkTypography";
import TitleTypography from "./titleTypography";
import KeyValueDisplay from "./keyValueDisplay";

import getWordByWordId from "../../api/getWordByWordId";
import getParentLinksByUrl from "../../api/getParentLinksByUrl";

const DocumentCard = ({ document }) => {
    const {
        docId,
        url,
        size,
        title,
        lastModificationDate,
        titleWordIDFreqsMap,
        bodyWordIDFreqsMap,
        childrenUrls,
    } = document;

    const [wordFreqs, setWordFreqs] = React.useState({});
    const [wordIdToWordBinding, setWordIdToWordBinding] = React.useState({});
    const [tenParentLinksDisplay, setTenParentLinksDisplay] = React.useState(
        []
    );

    React.useEffect(() => {
        const fetchWordIdFreqs = async () => {
            const wordIdToWordBinding = {};
            for (const property in bodyWordIDFreqsMap) {
                const wordId = property;
                const response = await getWordByWordId(wordId);
                wordIdToWordBinding[wordId] = response.data.word;
            }
            setWordIdToWordBinding(wordIdToWordBinding);
        };

        fetchWordIdFreqs();
    }, []);

    React.useEffect(() => {
        const renameKeys = (obj, newKeys) => {
            const entries = Object.keys(obj).map((key) => {
                const newKey = newKeys[key] || key;

                return { [newKey]: obj[key] };
            });

            return Object.assign({}, ...entries);
        };

        const fetchWordIdFreqs = () => {
            const wordFreqsMap = renameKeys(
                bodyWordIDFreqsMap,
                wordIdToWordBinding
            );

            setWordFreqs(wordFreqsMap);
        };

        fetchWordIdFreqs();
    }, [wordIdToWordBinding]);

    React.useEffect(() => {
        const fetchParentLinks = async () => {
            const response = await getParentLinksByUrl(encodeURIComponent(url));
            if (response.status != 200) {
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
    }, []);

    const getRandomKWordFreqsDisplay = (k) => {
        return Object.keys(wordFreqs)
            .slice(0, k)
            .reduce((result, word) => {
                const freq = wordFreqs[word];
                result.push(
                    <KeyValueDisplay key={word} left={word} right={freq} />
                );
                return result;
            }, []);
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
                    {getRandomKWordFreqsDisplay(10)}
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
