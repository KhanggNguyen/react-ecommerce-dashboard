import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    muiCard: {
        display: "flex",
        //backgroundColor: "#17a2b8",
        backgroundColor: props => props.backgroundColor,
        maxWidth: "300px",
    },
    boxCard: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        color: "white"
    },
    cardContent:{
        flex: "1 0 auto",
    },
    cardActions:{
        //backgroundColor: "#149cb1",
        backgroundColor: props => props.actionsColor,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    link:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "none",
        }
    }
}));
