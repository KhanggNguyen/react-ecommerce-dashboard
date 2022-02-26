import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    navbar: {
        color: "#495057",
        position: "absolute",
        backgroundColor: "white",
    },
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
    },
    sidebarItems:{
        margin: "0 15px",
        "& a": {
            borderRadius: "4px",
            "&:hover":{
                backgroundColor: "#e0f3ff",
                "& span":{
                    color: "#3f6ad8"
                }
            }
        },
        "& span": {
            color: "#495057",
            fontSize: "14px",
            textAlign: "left",
            display: "inline",
            
        },
    },
    username: {
        fontWeight: 700,
        fontSize: 14,
        textAlign: "left",
        color: "#000"
    },
    userMenuContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },
    logoutButton: {
        borderRadius: "10px",
        color: "#fff",
        backgroundColor: "#444054",
        "&:hover": {
            backgroundColor: "#000",
        }
    }
}));
