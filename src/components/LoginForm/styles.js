import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: "#FFF",
        borderRadius: "15px",
    },
    container: {},
    button:{
        borderRadius: "10px",
        color: "white",
        padding: "10px",
        margin: "5px 0",
        outline: "none",
        fontFamily: `"Poppins", sans-serif`, 
        fontSize: "1rem",
        textAlign: "center",
        width: "100%",
        backgroundColor: "#00aefd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: "#00aefe",
        }
    }
}));
