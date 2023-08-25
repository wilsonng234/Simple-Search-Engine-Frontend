import React from "react";

import logo from "icon/logo.svg";
import "App.css";

import getDocumentsByQuery from "api/getDocumentsByQuery";
import { AppDocumentCards } from "App.styles";
import SearchBar from "components/search-bar/searchBar";
import ReactLoading from "react-loading";
import CrawlerDialog from "components/crawler-dialog/crawlerDialog";

function App() {
    const [documents, setDocuments] = React.useState([]);
    const [query, setQuery] = React.useState("");
    const [showLoading, setShowLoading] = React.useState(false);
    const [openCrawlerDialog, setOpenCrawlerDialog] = React.useState(false);

    React.useEffect(() => {
        const fetchDocumentsByQuery = async () => {
            setShowLoading(true);
            try {
                const response = await getDocumentsByQuery(query);
                setDocuments(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setShowLoading(false);
            }
        };

        if (query.length !== 0) fetchDocumentsByQuery();
    }, [query]);

    const handleClickOpenDialog = () => {
        setOpenCrawlerDialog(true);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img
                    src={logo}
                    className="App-logo"
                    alt="logo"
                    onClick={handleClickOpenDialog}
                />
                <SearchBar setQuery={setQuery} />
                {showLoading && <ReactLoading type={"bars"} color="#0080FF" />}
                {!showLoading && <AppDocumentCards documents={documents} />}
            </header>

            <CrawlerDialog
                openCrawlerDialog={openCrawlerDialog}
                setOpenCrawlerDialog={setOpenCrawlerDialog}
            />
        </div>
    );
}

export default App;
