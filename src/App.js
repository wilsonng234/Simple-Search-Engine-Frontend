import React from "react";

import logo from "./logo.svg";
import "./App.css";
import getAllDocuments from "./api/getAllDocuments.js";
import getDocumentsByQuery from "./api/getDocumentsByQuery";
import { AppDocumentCards } from "./App.styles";
import SearchBar from "./components/search-bar/searchBar";
import ReactLoading from "react-loading";

function App() {
    const [documents, setDocuments] = React.useState([]);
    const [query, setQuery] = React.useState("");
    const [showLoading, setShowLoading] = React.useState(false);

    /*  // Fetch all documents when the component is mounted
    React.useEffect(() => {
        const fetchDocuments = async () => {
            const response = await getAllDocuments();
            setDocuments(response.data);
        };

        fetchDocuments();
    }, []);
    */

    React.useEffect(() => {
        const fetchDocumentsByQuery = async () => {
            setShowLoading(true);
            const response = await getDocumentsByQuery(query);
            setDocuments(response.data);
            setShowLoading(false);
        };

        if (query.length != 0)
            fetchDocumentsByQuery();
    }, [query]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <SearchBar setQuery={setQuery} />
                {showLoading && (
                    <ReactLoading type={"bars"} color="#0080FF" />
                )}
                {!showLoading && <AppDocumentCards documents={documents} />}
            </header>
        </div>
    );
}   

export default App;
