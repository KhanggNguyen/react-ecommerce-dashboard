import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    toggleDrawerButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 1px"
    },
    toolbar: {
        paddingRight: "24px"
    },
    iconButton: {
        marginRight: "36px"
    },
    displayIconButton: {
        display: "none"
    }
}));
