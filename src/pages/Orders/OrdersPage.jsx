import {
    Box,
    Container,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Toolbar,
} from "@material-ui/core";
import { Edit, Visibility } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components";

import useStyles from "./styles";
import DetailModal from "./DetailModal";

const Orders = () => {
    const classes = useStyles();
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
            if (
                orderSelectedStatus === 0 &&
                i == order.orderStatus.length - 1
            ) {
                setOrderSelectedStatus(order.orderStatus.length);
            }
        }

        setOrderDetailDialog(true);
    };

    const renderOrders = () => {
        return (
            <Paper className={classes.tablePaper}>
                <Table size="small" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell variant="head" align="center">
                                #
                            </TableCell>
                            <TableCell variant="head" align="center">
                                Name
                            </TableCell>
                            <TableCell variant="head" align="center">
                                Total
                            </TableCell>
                            <TableCell variant="head" align="center">
                                Status
                            </TableCell>
                            <TableCell variant="head" align="center">
                                Payment type
                            </TableCell>
                            <TableCell variant="head" align="center">
                                Date ordered
                            </TableCell>
                            <TableCell variant="head" align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.orders?.length > 0
                            ? order.orders.map((_order, index) => {
                                  return (
                                      <TableRow key={_order._id}>
                                          <TableCell
                                              align="center"
                                              style={{ width: "5%" }}
                                          >
                                              {index + 1}
                                          </TableCell>
                                          <TableCell
                                              align="center"
                                              className={classes.titleCell}
                                              style={{ width: "20%" }}
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
            <DetailModal
                orderSelected={orderSelected}
                orderDetailDialog={orderDetailDialog}
                setOrderDetailDialog={setOrderDetailDialog}
                setOrderSelected={setOrderSelected}
                orderSelectedStatus={orderSelectedStatus}
                setOrderSelectedStatus={setOrderSelectedStatus}
                formatDate={formatDate}
            />
        </Layout>
    );
};

export default Orders;
