import React, { useState } from "react";
import { Link } from "react-router-dom";

//MaterialUI
import {
    AppBar,
    Drawer,
    Toolbar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Typography,
    Badge,
} from "@material-ui/core";
import {
    ChevronLeft,
    Dashboard,
    ShoppingCart,
    People,
    List as ListIcon,
    Menu,
    Notifications,
} from "@material-ui/icons";
import { styled } from "@material-ui/styles";

import useStyles from "./styles";

const drawerWidth = 240;

const AppBarStyled = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerStyled = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const Sidebar = ({ title }) => {
    const [open, setOpen] = useState(true);

    const classes = useStyles();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <AppBarStyled style={{ position: "absolute" }} open={open}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        className={`${classes.iconButton} ${
                            open && classes.displayIconButton
                        }`}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <Notifications />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBarStyled>
            <DrawerStyled variant="permanent" open={open}>
                <Toolbar className={classes.toggleDrawerButton}>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeft />
                    </IconButton>
                </Toolbar>
                <Divider />
                <div>
                    <List>
                        <ListItem button component={Link} to="/admin/">
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/admin/customers/"
                        >
                            <ListItemIcon>
                                <People />
                            </ListItemIcon>
                            <ListItemText primary="Customers" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/categories/">
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/products/">
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/orders/">
                            <ListItemIcon>
                                <ShoppingCart />
                            </ListItemIcon>
                            <ListItemText primary="Orders" />
                        </ListItem>
                    </List>
                </div>
            </DrawerStyled>
        </>
    );
};

export default Sidebar;
