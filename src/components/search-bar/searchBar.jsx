import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import SearchBarAutocomplete from "./searchBar.styles";

import getTenWordsByPrefix from "../../api/getTenWordsByPrefix";

const SearchBar = ({ setQuery }) => {
    // This is only for query display purposes
    const [queryDisplayed, setQueryDisplayed] = React.useState("");
    const [openRecommendations, setOpenRecommendations] = React.useState(false);
    const [recommendations, setRecommendations] = React.useState([
        "test",
        "test page",
    ]);

    React.useEffect(() => {
        try {
            const fetchRecommendations = async () => {
                const prefix = queryDisplayed;
                let fetchedRecommendations = await getTenWordsByPrefix(prefix);
                fetchedRecommendations = fetchedRecommendations.data;
                fetchedRecommendations = fetchedRecommendations.map(
                    (item) => item.word
                );

                setRecommendations(fetchedRecommendations);
                // setRecommendations(fetchedRecommendations.data);
            };

            fetchRecommendations();
        } catch (error) {
            console.log(error);
        }
    }, [queryDisplayed]);

    const handleOnChange = (event) => {
        setQueryDisplayed(event.target.value);
        console.log(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setQuery(queryDisplayed);
            setOpenRecommendations(false);
            console.log(queryDisplayed);
            event.stopPropagation();
        }
    };

    const handleSearchIconClick = () => {
        setQuery(queryDisplayed);
        console.log(queryDisplayed);
    };

    const handleOnSelectItem = (event, newValue) => {
        setQueryDisplayed(newValue);
        console.log(newValue);
    };

    const handleOpenRecommendations = (event) => {
        setOpenRecommendations(true);
    };

    const handleCloseRecommendations = (event) => {
        setOpenRecommendations(false);
    };

    const handleRenderInput = (params) => {
        return (
            <TextField
                {...params}
                id="search-bar-textfield"
                label="Enter your query"
                onChange={handleOnChange}
                InputProps={{
                    ...params.InputProps,
                    onKeyDown: handleKeyDown,
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
            filterOptions={(option) => option}
            onChange={handleOnSelectItem}
            open={openRecommendations}
            onOpen={handleOpenRecommendations}
            onClose={handleCloseRecommendations}
            renderInput={handleRenderInput}
        ></SearchBarAutocomplete>
    );
};

export default SearchBar;
