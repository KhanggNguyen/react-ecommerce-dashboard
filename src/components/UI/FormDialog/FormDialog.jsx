import React from "react";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    Grid,
} from "@material-ui/core";

const FormDialog = (props) => {

    const formatDate = (date) => {
        return new Intl.DateTimeFormat("fr-FR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(Date.parse(date));
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} {...props}>
            <DialogTitle>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h6">{props.title}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="body2" style={{color: "gray"}}>
                            {props.createdAt && formatDate(props.createdAt)}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions>
                {props.buttons ? (
                    props.buttons.map((btn, index) => (
                        <Button
                            key={index}
                            onClick={btn.onClick}
                            color={btn.color}
                            variant={btn.variant}
                        >
                            {btn.label}
                        </Button>
                    ))
                ) : (
                    <>
                        <Button variant="contained" onClick={props.onClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={props.onSubmit}>
                            Save
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default FormDialog;
