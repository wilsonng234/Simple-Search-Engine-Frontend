import React from "react";
import DocumentCard from "./documentCard";

import getWordByWordId from "../../api/getWordByWordId";

const DocumentCards = ({ documents, className }) => {
    const [wordIds, setWordIds] = React.useState(new Set());
    const [wordIdToWordBinding, setWordIdToWordBinding] = React.useState({});

    React.useEffect(() => {
        const allWordIds = new Set();
        for (const document of documents) {
            const { titleWordIDFreqsMap, bodyWordIDFreqsMap } = document;

            for (const wordId of Object.keys(titleWordIDFreqsMap))
                allWordIds.add(wordId);
            for (const wordId of Object.keys(bodyWordIDFreqsMap))
                allWordIds.add(wordId);
        }

        setWordIds(allWordIds);
    }, [documents]);

    React.useEffect(() => {
        const fetchWordIdFreqs = async () => {
            const wordIdToWordBinding = {};
            for (const wordId of wordIds) {
                const response = await getWordByWordId(wordId);
                wordIdToWordBinding[wordId] = response.data.word;
            }
            setWordIdToWordBinding(wordIdToWordBinding);
        };
        fetchWordIdFreqs();
    }, [wordIds]);

    return (
        <div className={className}>
            {documents
                ? documents.map((document) => {
                      return (
                          <DocumentCard
                              key={document.docId}
                              document={document}
                              wordIdToWordBinding={wordIdToWordBinding}
                          />
                      );
                  })
                : null}
        </div>
    );
};

export default DocumentCards;
