import React from "react";

import logo from "./logo.svg";
import "./App.css";
import getAllDocuments from "./api/getAllDocuments.js";
import getDocumentsByQuery from "./api/getDocumentsByQuery";
import { AppDocumentCards } from "./App.styles";
import SearchBar from "./components/search-bar/searchBar";

function App() {
    const [documents, setDocuments] = React.useState([]);
    const [query, setQuery] = React.useState("");

    React.useEffect(() => {
        const fetchDocuments = async () => {
            const response = await getAllDocuments();
            setDocuments(response.data);
        };

        fetchDocuments();
    }, []);

    React.useEffect(() => {
        const fetchDocumentsByQuery = async () => {
            const response = await getDocumentsByQuery(query);
            setDocuments(response.data);
        };

        fetchDocumentsByQuery();
    }, [query]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <SearchBar setQuery={setQuery} />
                <AppDocumentCards documents={documents} />
            </header>
        </div>
    );
}

export default App;
