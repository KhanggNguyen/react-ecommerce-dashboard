import React from "react";
import { Chart, Layout } from "../../components";
import { Box, Toolbar, Container, Grid } from "@material-ui/core";

import useStyles from './styles';

const dataChart = [
    {
        time: "January",
        amount: 100
    },
    {
        time: "February",
        amount: 300
    },
    {
        time: "Mars",
        amount: 800
    },
    {
        time: "April",
        amount: 1000
    },
    {
        time: "May",
        amount: 1000
    },
    {
        time: "June",
        amount: 500
    },
    {
        time: "July",
        amount: 100
    },
    {
        time: "August",
        amount: 900
    },
    {
        time: "September",
        amount: 2000
    },
    {
        time: "Octuber",
        amount: 555
    },
    {
        time: "November",
        amount: 100
    },
    {
        time: "December",
        amount: 900
    },
]

const DashboardPage = () => {

    const classes = useStyles();
    
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
                    <Container maxWidth="lg" style={{ margin: "4px 0" }}>
                        <Grid item xs={12} className={classes.grid}>
                            <Chart dataChart={dataChart} />
                        </Grid> 
                    </Container>
                </Box>
            </Layout>
        </>
    );
};

export default DashboardPage;
