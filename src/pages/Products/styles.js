import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    box: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        minWidth: "80%",
    },
    formCreate: {
        "& *": {
            margin: "2px 0px",
        },
    },
    detailDialog: {
        minWidth: "1000px",
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },
    description: {
        width: "80%",
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 5,
    },
    formDescription: {
        "& input": {
            height: 200,
        },
    },
    grid: {
        margin: 0,
    },
    tablePaper: {
        width: "100%",
        margin: "10px 0",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
    },
}));
