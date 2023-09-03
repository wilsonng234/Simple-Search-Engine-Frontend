import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import SearchBarAutocomplete from "components/search-bar/searchBar.styles";
import getTenWordsByPrefix from "api/getTenWordsByPrefix";

import { useSearchParams, useNavigate } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const q = searchParam.get("q");

    const [queryDisplayed, setQueryDisplayed] = React.useState(q || "");
    const [openRecommendations, setOpenRecommendations] = React.useState(false);
    const [recommendations, setRecommendations] = React.useState([]);

    React.useEffect(() => {
        setQueryDisplayed(q || "");
    }, [q]);

    React.useEffect(() => {
        try {
            const fetchRecommendations = async (lastKWords) => {
                const response = await getTenWordsByPrefix(lastKWords);
                const data = response.data;
                const recommendations = data.map((item) => item.word);

                return recommendations;
            };

            const prefix = queryDisplayed;
            const prefixSplit = prefix.trim().split(/\s+/);
            let recommendations = new Set();

            const setUpRecommendations = async () => {
                let getTenAlready = false;
                for (
                    let numPrefix = Math.min(3, prefixSplit.length);
                    numPrefix >= 1;
                    numPrefix--
                ) {
                    const firstWords = prefixSplit
                        .slice(0, -numPrefix)
                        .join(" ");
                    const lastKWords = prefixSplit.slice(-numPrefix).join(" ");
                    const newRecommendations = await fetchRecommendations(
                        lastKWords
                    );

                    for (let i = 0; i < newRecommendations.length; i++) {
                        newRecommendations[i] =
                            firstWords + " " + newRecommendations[i];
                        newRecommendations[i] = newRecommendations[i].trim();
                        newRecommendations[i] = newRecommendations[i].replace(
                            /[^a-zA-Z0-9\s]/g,
                            ""
                        );
                        recommendations.add(newRecommendations[i]);

                        if (recommendations.size >= 10) {
                            getTenAlready = true;
                            break;
                        }
                    }

                    if (getTenAlready) break;
                }

                let temp = [...recommendations];
                const idx = temp.findIndex((item) => item === prefix);
                if (idx !== -1) {
                    temp[idx] = temp[0];
                    temp[0] = prefix;
                }

                setRecommendations(temp);
            };

            setUpRecommendations();
        } catch (error) {
            console.error(error);
        }
    }, [queryDisplayed]);

    const handleOnChange = (event) => {
        setQueryDisplayed(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && queryDisplayed.length !== 0) {
            navigate({ pathname: "/search", search: `?q=${queryDisplayed}` });
            setOpenRecommendations(false);
        }
    };

    const handleSearchIconClick = () => {
        if (queryDisplayed.length !== 0)
            navigate({ pathname: "/search", search: `?q=${queryDisplayed}` });
    };

    const handleOnSelectItem = (event, newValue) => {
        navigate({ pathname: "/search", search: `?q=${newValue}` });
        setQueryDisplayed(newValue);
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
            value={queryDisplayed}
            freeSolo
            disableClearable
            options={recommendations}
            filterOptions={(option) => option}
            onChange={handleOnSelectItem}
            open={openRecommendations}
            onOpen={handleOpenRecommendations}
            onClose={handleCloseRecommendations}
            onKeyDown={handleKeyDown}
            renderInput={handleRenderInput}
        ></SearchBarAutocomplete>
    );
};

export default SearchBar;
