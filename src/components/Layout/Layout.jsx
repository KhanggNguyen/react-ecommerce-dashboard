import React from "react";
import { Box, createTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { Sidebar } from "../index";

const mdTheme = createTheme();

const Layout = (props) => {

    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box
                    style={{
                        display: "flex",
                        minHeight: "100vh",
                    }}
                >
                    <CssBaseline />
                    <Sidebar title={props.title} />
                    {props.children}
                </Box>
            </ThemeProvider>
        </>
    );
};

export default Layout;
