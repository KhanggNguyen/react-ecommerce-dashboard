import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    box: {
        width: "100%",
    },
    grid: {
        height: "500px",
        margin: "10px 20px",
        backgroundColor: "white",
    },
    cardsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        "& > div": {
            margin: "5px",
            minWidth: "33%",
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
            "& > div": {
                margin: "5px",
                minWidth: "100%",
            },
        }
    },
}));
