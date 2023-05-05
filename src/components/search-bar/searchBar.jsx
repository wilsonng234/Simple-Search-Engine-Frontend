import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

import SearchBarTextField from "./searchBar.styles";

const SearchBar = ({ setQuery }) => {
    // This is only for query display purposes
    const [queryDisplayed, setQueryDisplayed] = React.useState("");

    const handleOnChange = (event) => {
        setQueryDisplayed(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setQuery(event.target.value);
        }
    };

    const handleSearchIconClick = () => {
        setQuery(document.getElementById("search-bar").value);
    };

    return (
        <SearchBarTextField
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
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            value={queryDisplayed}
        />
    );
};

export default SearchBar;
