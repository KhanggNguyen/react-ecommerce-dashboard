import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";
const SearchBox = (props) => {
    return (
        <TextField
            align="right"
            size="small"
            type="search"
            variant="outlined"
            color="primary"
            placeholder="Search..."
            style={{ margin: "4px 4px" }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBox;
