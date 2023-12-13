import React from "react";
import { useDispatch } from "react-redux";
import { updateOrder } from "../../actions/order";
import {
    Divider,
    MenuItem,
    Typography,
    Select,
    Step,
    StepLabel,
    Stepper,
    Grid,
    Box,
    Paper,
    InputLabel,
} from "@material-ui/core";
import { FormDialog } from "../../components";
import useStyles from "./styles";

const DetailModal = ({
    orderSelected,
    orderDetailDialog,
    setOrderDetailDialog,
    setOrderSelected,
    orderSelectedStatus,
    setOrderSelectedStatus,
    formatDate,
}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

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

        setOrderDetailDialog(false);
        dispatch(updateOrder(payload));
    };

    if (!orderSelected || !orderDetailDialog) {
        return <></>;
    }

    return (
        <FormDialog
            title={`Order #${orderSelected._id}`}
            createdat={orderSelected.createdAt}
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
                    onClick: () => handleSubmitDetailDialog(orderSelected._id),
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
                                                activeStep={orderSelectedStatus}
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
                                        <Grid container xs={12} sm={12}>
                                            <Grid item xs={3} sm={3}>
                                                <Select
                                                    label="Order status"
                                                    value={orderSelectedStatus}
                                                    onChange={(e) => {
                                                        setOrderSelectedStatus(
                                                            e.target.value
                                                        );
                                                    }}
                                                >
                                                    <MenuItem
                                                        key={0}
                                                        value={0}
                                                        disabled
                                                    >
                                                        {
                                                            orderSelected
                                                                .orderStatus[0]
                                                                .type
                                                        }
                                                    </MenuItem>
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
                    </Grid>
                </Paper>
            </Box>
        </FormDialog>
    );
};

export default DetailModal;
