import React from "react";
import DocumentCard from "components/document/documentCard";

const DocumentCards = ({ documents, className }) => {
    return (
        <div className={className}>
            {documents
                ? documents.map((document) => {
                      return (
                          <DocumentCard
                              key={document.docId}
                              document={document}
                          />
                      );
                  })
                : null}
        </div>
    );
};

export default DocumentCards;
