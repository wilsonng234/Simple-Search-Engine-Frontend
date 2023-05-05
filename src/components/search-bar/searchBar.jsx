import React from "react";

import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import SearchBarAutocomplete from "./searchBar.styles";

const SearchBar = ({ setQuery }) => {
    // This is only for query display purposes
    const [queryDisplayed, setQueryDisplayed] = React.useState("");
    const [recommendations, setRecommendations] = React.useState([
        "test",
        "test page",
    ]);

    const handleOnChange = (event) => {
        setQueryDisplayed(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            console.log(queryDisplayed);
            setQuery(queryDisplayed);
        }
    };

    const handleSearchIconClick = () => {
        console.log(queryDisplayed);
        setQuery(queryDisplayed);
    };

    const handleRenderInput = (params) => {
        return (
            <TextField
                {...params}
                id="search-bar-textfield"
                label="Enter your query"
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <IconButton
                            children={<SearchIcon />}
                            onClick={handleSearchIconClick}
                        />
                    ),
                }}
            ></TextField>
        );
    };

    return (
        <SearchBarAutocomplete
            id="search-bar-autocomplete"
            freeSolo
            disableClearable
            options={recommendations}
            renderInput={handleRenderInput}
        ></SearchBarAutocomplete>
    );
};

export default SearchBar;
