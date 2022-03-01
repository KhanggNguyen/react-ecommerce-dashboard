import React from "react";
import { LoginForm } from "../../components";

import { Box, createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const mdTheme = createTheme();
const LoginPage = () => {
    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "100vw",
                        minHeight: "100vh",
                        margin: "0",
                        backgroundImage: "linear-gradient(to right top, #FF4988, #FFC781)",
                    }}
                >
                    <LoginForm />
                </Box>
            </ThemeProvider>
        </>
    );
};

export default LoginPage;
