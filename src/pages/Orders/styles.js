import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    box: {
        width: "100%"
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        minWidth: "80%",
    },
    formCreate: {
        '& *' : {
            margin: "2px 0px"
        }
    },
    detailDialog: {
        minWidth: "1000px"
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
        '& input': {
            height: 200
        }
    },
    titleCell: {
        width: "100px",
    },
    descriptionCell: {
        width: "400px",
        
    },
    grid: {
        margin: 0
    },
    tablePaper: {
        width: "100%",
        margin: '10px 0',
        padding: '10px',
        display: "flex",
        flexDirection: "column",
    },
    table: {
        minWidth: "100%"
    },
}));
