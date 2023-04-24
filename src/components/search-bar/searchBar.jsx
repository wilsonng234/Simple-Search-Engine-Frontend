import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

import SearchBarTextField from "./searchBar.styles";

const SearchBar = ({ setQuery }) => {
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
            onKeyDown={handleKeyDown}
        />
    );
};

export default SearchBar;
