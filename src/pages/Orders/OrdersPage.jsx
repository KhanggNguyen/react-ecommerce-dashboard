import {
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Step,
    StepLabel,
    Stepper,
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
import { updateOrder } from "../../actions/order";
import { FormDialog, Layout } from "../../components";

import useStyles from "./styles";

const Orders = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order);

    const [orderSelected, setOrderSelected] = useState(null);
    const [orderDetailDialog, setOrderDetailDialog] = useState(false);
    const [orderSelectedStatus, setOrderSelectedStatus] = useState(0);


    const formatDate = (date) => {
        if (!date) return "";

        return new Intl.DateTimeFormat("fr-FR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(Date.parse(date));
    };

    const showOrderDetailDialog = (order) => {
        
        setOrderSelected(order);
        for (let i = 0; i < order.orderStatus.length; i++) {
            if (!order.orderStatus[i].isCompleted) {
                setOrderSelectedStatus(i - 1);
                break;
            }
            if(orderSelectedStatus === 0 && i == order.orderStatus.length-1){
                setOrderSelectedStatus(order.orderStatus.length);
            }
        }
        
        setOrderDetailDialog(true);
    };

    const closeOrderDetailDialog = () => {
        setOrderSelected(null);
        setOrderSelectedStatus(0);
        setOrderDetailDialog(false);
    };

    const handleSubmitDetailDialog = (orderId) => {
        if (!orderSelected) {
            return;
        }
        
        const type = orderSelected.orderStatus;

        const payload = {
            orderId,
            type: type[orderSelectedStatus].type,
        };

        dispatch(updateOrder(payload));
    };

    const renderOrderDetailDialog = () => {
        if (!orderSelected || !orderDetailDialog) {
            return;
        }

        return (
            <FormDialog
                title={`Order #${orderSelected._id}`}
                createdAt={orderSelected.createdAt}
                open={orderDetailDialog}
                onClose={closeOrderDetailDialog}
                buttons={[
                    {
                        label: "Close",
                        variant: "outlined",
                        color: "default",
                        onClick: closeOrderDetailDialog,
                    },
                    {
                        label: "Save",
                        variant: "outlined",
                        color: "primary",
                        onClick: () =>
                            handleSubmitDetailDialog(orderSelected._id),
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
                                        <Grid container>
                                            <Grid item xs={12} sm={12}>
                                                <Typography
                                                    gutterBottom
                                                    variant="body2"
                                                >
                                                    {`Username : ${orderSelected.user.firstName} ${orderSelected.user.lastName}`}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <Typography
                                                    variant="body2"
                                                    gutterBottom
                                                >
                                                    {`Total price : ${orderSelected.items.reduce(
                                                        (total, _item) => {
                                                            return (
                                                                total +
                                                                _item.payablePrice *
                                                                    _item.purchasedQty
                                                            );
                                                        },
                                                        0
                                                    )}`}{" "}
                                                    €
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <Typography variant="body2">
                                                    {`Payment status : ${orderSelected.paymentStatus}`}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <Typography variant="body2">
                                                    {`Payment type : ${orderSelected.paymentType}`}
                                                </Typography>
                                            </Grid>
                                            <Divider />
                                            <Grid item xs={12} sm={12}>
                                                <Stepper
                                                    activeStep={
                                                        orderSelectedStatus
                                                    }
                                                >
                                                    {orderSelected.orderStatus.map(
                                                        (item, index) => (
                                                            <Step key={index}>
                                                                <StepLabel>
                                                                    {`${
                                                                        item.type
                                                                    } \n ${formatDate(
                                                                        item.date
                                                                    )}`}
                                                                </StepLabel>
                                                            </Step>
                                                        )
                                                    )}
                                                </Stepper>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <Select
                                                    label={`Order status`}
                                                    value={orderSelectedStatus}
                                                    onChange={(e) => {
                                                        setOrderSelectedStatus(
                                                            e.target.value
                                                        );
                                                    }}
                                                >
                                                    {orderSelected.orderStatus.map(
                                                        (status, index) => {
                                                            return !status.isCompleted ? (
                                                                <MenuItem
                                                                    key={index}
                                                                    value={
                                                                        index
                                                                    }
                                                                >
                                                                    {
                                                                        status.type
                                                                    }
                                                                </MenuItem>
                                                            ) : null;
                                                        }
                                                    )}
                                                </Select>
                                            </Grid>
                                        </Grid>
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
                <Table size="small" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell variant="head"  align="center">#</TableCell>
                            <TableCell variant="head"  align="center">Name</TableCell>
                            <TableCell variant="head"  align="center">Total</TableCell>
                            <TableCell variant="head"  align="center">Status</TableCell>
                            <TableCell variant="head"  align="center">Payment type</TableCell>
                            <TableCell variant="head"  align="center">Date ordered</TableCell>
                            <TableCell variant="head"  align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.orders?.length > 0
                            ? order.orders.map((_order, index) => {
                                  return (
                                      <TableRow key={_order._id}>
                                          <TableCell align="center"  style={{width: "5%"}}>
                                              {index + 1}
                                          </TableCell>
                                          <TableCell
                                              align="center"
                                              className={classes.titleCell}
                                              style={{width: "20%"}}
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
                                              {formatDate(_order.createdAt)}
                                          </TableCell>
                                          <TableCell align="center">
                                              <IconButton
                                                  onClick={() =>
                                                      showOrderDetailDialog(
                                                          _order
                                                      )
                                                  }
                                              >
                                                  <Visibility />
                                              </IconButton>
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
