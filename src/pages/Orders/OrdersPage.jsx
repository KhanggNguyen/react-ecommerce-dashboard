import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { Edit, Visibility } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormDialog, Layout } from "../../components";

import useStyles from "./styles";

const Orders = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order);

    const [open, setOpen] = useState(false);
    const [orderSelected, setOrderSelected] = useState(null);
    const [orderDetailDialog, setOrderDetailDialog] = useState(false);

    useEffect(() => {}, []);

    const handleOpen = (order) => {
        setOpen(true);
    };

    const showOrderDetailDialog = (order) => {
        setOrderSelected(order);
        setOrderDetailDialog(true);
    };

    const closeOrderDetailDialog = () => {
        setOrderSelected(null);
        setOrderDetailDialog(false);
    };

    const renderOrderDetailDialog = () => {
        if (!orderDetailDialog) {
            return;
        }

        return (
            <FormDialog
                title="Order detail"
                open={orderDetailDialog}
                onClose={closeOrderDetailDialog}
                buttons={[
                    {
                        label: "Close",
                        variant: "contained",
                        color: "primary",
                        onClick: closeOrderDetailDialog,
                    },
                ]}
                fullWidth
                maxWidth="md"
                className={classes.detailDialog}
            >
                <Box>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm container>
                                <Grid
                                    item
                                    xs
                                    container
                                    direction="column"
                                    spacing={2}
                                >
                                    <Grid item xs>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                        >
                                            {`Username : ${orderSelected.user.firstName} ${orderSelected.user.lastName}` }
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                        >
                                            {`Total price : ${orderSelected.items.reduce( (total, _item) => {
                                                return total + _item.payablePrice * _item.purchasedQty;
                                            }, 0)}`} €
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                        >
                                            {`Status : ${orderSelected.paymentStatus}`}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                        >
                                            {`Payment type : ${orderSelected.paymentType}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </FormDialog>
        );
    };

    const renderOrders = () => {
        return (
            <Paper className={classes.tablePaper}>
                <Table size="medium" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Payment type</TableCell>
                            <TableCell align="center">Date ordered</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.orders?.length > 0
                            ? order.orders.map((_order, index) => {
                                  return (
                                      <TableRow key={_order._id}>
                                          <TableCell align="center">
                                              {index + 1}
                                          </TableCell>
                                          <TableCell
                                              align="center"
                                              className={classes.titleCell}
                                          >
                                              {`${_order.user.firstName} ${_order.user.lastName}`}
                                          </TableCell>
                                          <TableCell align="center">
                                              {_order.items.reduce(
                                                  (total, _item) => {
                                                      return (
                                                          total +
                                                          _item.payablePrice *
                                                              _item.purchasedQty
                                                      );
                                                  },
                                                  0
                                              )}{" "}
                                              €
                                          </TableCell>
                                          <TableCell align="center">
                                              {_order.paymentStatus}
                                          </TableCell>
                                          <TableCell align="center">
                                              {_order.paymentType}
                                          </TableCell>
                                          <TableCell align="center">
                                              {new Intl.DateTimeFormat(
                                                  "fr-FR",
                                                  {
                                                      year: "numeric",
                                                      month: "2-digit",
                                                      day: "2-digit",
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                      second: "2-digit",
                                                  }
                                              ).format(
                                                  Date.parse(_order.createdAt)
                                              )}
                                          </TableCell>
                                          <TableCell align="center">
                                              <Button
                                                  onClick={() =>
                                                      showOrderDetailDialog(
                                                          _order
                                                      )
                                                  }
                                              >
                                                  <Visibility /> Detail
                                              </Button>
                                              <Button
                                                  onClick={() => {
                                                      handleOpen(order);
                                                  }}
                                              >
                                                  <Edit /> Edit
                                              </Button>
                                          </TableCell>
                                      </TableRow>
                                  );
                              })
                            : null}
                    </TableBody>
                </Table>
            </Paper>
        );
        return;
    };
    
    return (
        <Layout title={`Orders`}>
            <Box component="main" className={classes.box}>
                <Toolbar />
                <Container maxWidth="lg" style={{ margin: "4px 0" }}>
                    <Grid item xs={12} className={classes.grid}>
                        {order.orders.length && renderOrders()}
                    </Grid>
                </Container>
            </Box>
            {renderOrderDetailDialog()}
        </Layout>
    );
};

export default Orders;
