import { Box, TextField } from "@material-ui/core";
import React from "react";

const Search = () => {
    return (
        <Box component="div" className="search">
            <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Search"
            />
        </Box>
    );
};

export default Search;
