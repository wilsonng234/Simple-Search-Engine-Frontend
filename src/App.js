import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

import logo from "./logo.svg";
import "./App.css";
import getAllDocuments from "./api/getAllDocuments.js";
import { AppTextField, AppDocumentCards } from "./App.styles";

function App() {
    const [documents, setDocuments] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await getAllDocuments();
            setDocuments(response.data);
        };

        fetchDocuments();
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setQuery(event.target.value);
        }
    };

    const handleSearchIconClick = () => {
        setQuery(document.getElementById("search-bar").value);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <AppTextField
                    id="search-bar"
                    label="Enter your query"
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                children={<SearchIcon />}
                                onClick={handleSearchIconClick}
                            />
                        ),
                    }}
                    onKeyDown={handleKeyDown}
                />
                <AppDocumentCards documents={documents} />
            </header>
        </div>
    );
}

export default App;
