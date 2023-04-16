import { useState, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";
import getAllDocuments from "./api/getAllDocuments.js";

import AppDocumentCards from "./App.styles";

function App() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await getAllDocuments();
            setDocuments(response.data);
        };

        fetchDocuments();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <AppDocumentCards documents={documents} />
            </header>
        </div>
    );
}

export default App;
