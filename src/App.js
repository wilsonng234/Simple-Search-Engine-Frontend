import React from "react";

import logo from "icon/logo.svg";
import "App.css";
import { AppDocumentCards } from "App.styles";
import getDocumentsByQuery from "api/getDocumentsByQuery";
import SearchBar from "components/search-bar/searchBar";
import CrawlerDialog from "components/crawler-dialog/crawlerDialog";

import ReactLoading from "react-loading";
import Typography from "@mui/material/Typography";
import { Routes, Route, useSearchParams } from "react-router-dom";

function App() {
    const [searchParam] = useSearchParams();
    const q = searchParam.get("q");
    const [documents, setDocuments] = React.useState([]);
    const [showLoading, setShowLoading] = React.useState(false);
    const [openCrawlerDialog, setOpenCrawlerDialog] = React.useState(false);

    React.useEffect(() => {
        const fetchDocumentsByQuery = async () => {
            setShowLoading(true);
            try {
                const response = await getDocumentsByQuery(q || "");
                setDocuments(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setShowLoading(false);
            }
        };

        if (q !== null && q.length !== 0) {
            fetchDocumentsByQuery();
        } else {
            setDocuments([]);
        }
    }, [q]);

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
                <SearchBar />
                <Routes>
                    <Route
                        index
                        element={
                            <Typography
                                sx={{ marginTop: "-10px" }}
                                variant={"caption"}
                                color="text.secondary"
                            >
                                Hint: Click the icon to crawl pages
                            </Typography>
                        }
                    />
                    <Route
                        path="/search"
                        element={
                            showLoading ? (
                                <ReactLoading type={"bars"} color="#0080FF" />
                            ) : (
                                <AppDocumentCards documents={documents} />
                            )
                        }
                    />
                </Routes>
            </header>

            <CrawlerDialog
                openCrawlerDialog={openCrawlerDialog}
                setOpenCrawlerDialog={setOpenCrawlerDialog}
            />
        </div>
    );
}

export default App;
