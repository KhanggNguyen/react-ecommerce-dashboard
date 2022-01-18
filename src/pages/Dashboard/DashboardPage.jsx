import React from "react";
import { Layout } from "../../components";
import { Box, Toolbar, Container, Grid } from "@material-ui/core";

const DashboardPage = () => {
    return (
        <>
            <Layout title={`Dashboard`}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" style={{margin: "4px 0"}}></Container>
                </Box>
            </Layout>
        </>
    );
};

export default DashboardPage;
