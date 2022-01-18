import React from "react";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";

const FormDialog = (props) => {
    return (
        <Dialog open={props.open} onClose={props.onClose} {...props}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions>
                {props.buttons ? (
                    props.buttons.map((btn, index) => (
                        <Button key={index} onClick={btn.onClick} color={btn.color} variant={btn.variant}>
                            {btn.label}
                        </Button>
                    ))
                ) : (
                    <>
                        <Button
                            variant="contained"
                            onClick={props.onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            
                            onClick={props.onSubmit}
                        >
                            Save
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default FormDialog;
