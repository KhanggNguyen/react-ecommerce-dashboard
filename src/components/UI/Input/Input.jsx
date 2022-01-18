import React from "react";

import {
    FormControl,
    InputLabel,
    TextField,
    Select,
    MenuItem,
    Box,
} from "@material-ui/core";

const Input = (props) => {
    let input;

    switch (props.type) {
        case "select":
            input = (
                <FormControl fullWidth>
                    <InputLabel>{props.label}</InputLabel>
                    <Select value={props.value} onChange={props.handleChange}>
                        <MenuItem value="" selected>{props.placeholder}</MenuItem>
                        {props.options?.length > 0
                            ? props.options.map((option, index) => (
                                  <MenuItem key={index} value={option.value}>
                                      {option.name}
                                  </MenuItem>
                              ))
                            : null}
                    </Select>
                </FormControl>
            );
            break;
        case "text":
        default:
            input = (
                <TextField
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    label={props.label}
                    variant="standard"
                    fullWidth
                    {...props}
                />
            );
            break;
    }

    return input;
};

export default Input;
