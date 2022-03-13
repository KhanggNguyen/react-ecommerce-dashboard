import React, { useEffect } from "react";
import { Card, Chart, Layout } from "../../components";
import { Box, Toolbar, Container, Grid, Typography } from "@material-ui/core";

import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../actions/category";
import { getAllProduct } from "../../actions/product";
import { getAllOrders } from "../../actions/order";
import { getAllUser } from "../../actions/user";

const dataChart = [
    {
        time: "January",
        amount: 100,
    },
    {
        time: "February",
        amount: 300,
    },
    {
        time: "Mars",
        amount: 800,
    },
    {
        time: "April",
        amount: 1000,
    },
    {
        time: "May",
        amount: 1000,
    },
    {
        time: "June",
        amount: 500,
    },
    {
        time: "July",
        amount: 100,
    },
    {
        time: "August",
        amount: 900,
    },
    {
        time: "September",
        amount: 2000,
    },
    {
        time: "October",
        amount: 555,
    },
    {
        time: "November",
        amount: 100,
    },
    {
        time: "December",
        amount: 900,
    },
];

const DashboardPage = () => {
    const product = useSelector((state) => state.product);
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (auth.authenticated) {
            dispatch(getAllCategory());
            dispatch(getAllProduct());
            dispatch(getAllOrders());
            dispatch(getAllUser());
        }
    }, [auth.authenticated]);

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
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                className={classes.cardsContainer}
                            >
                                <Card
                                    title={"Products"}
                                    href={"/admin/products/"}
                                    linkContent={"More infos"}
                                    backgroundColor="#17a2b8"
                                    actionsColor="#149cb1"
                                >
                                    {" "}
                                    <Typography variant="h5">
                                        {product.products.length}
                                    </Typography>
                                </Card>
                                <Card
                                    title="Customers"
                                    href={"/admin/customers/"}
                                    linkContent={"More infos"}
                                    backgroundColor="#cfe035"
                                    actionsColor="#bbcc26"
                                >
                                    {" "}
                                    <Typography variant="h5">
                                        {user.users.length}
                                    </Typography>
                                </Card>
                                <Card
                                    title="Orders"
                                    href={"/admin/orders/"}
                                    linkContent={"More infos"}
                                    backgroundColor="#eb4654"
                                    actionsColor="#d6404d"
                                >
                                    {" "}
                                    <Typography variant="h5">
                                        {order.orders.length}
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} className={classes.grid}>
                                <Chart dataChart={dataChart} />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Layout>
        </>
    );
};

export default DashboardPage;
