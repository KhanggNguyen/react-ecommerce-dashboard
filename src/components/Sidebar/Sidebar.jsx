import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
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
    Menu,
    MenuItem,
    Typography,
    Badge,
    Box,
    Tooltip,
    Avatar,
} from "@material-ui/core";
import {
    ChevronLeft,
    Dashboard,
    ShoppingCart,
    People,
    List as ListIcon,
    Menu as MenuIcon,
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
            width: theme.spacing(11),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(10),
            },
        }),
    },
}));

const Sidebar = ({ title }) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(true);

    const [anchorElementUser, setAnchorElementUser] = useState(null);

    const classes = useStyles();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleOpenUserMenu = (e) => {
        setAnchorElementUser(e.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElementUser(null);
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        dispatch(logout());
    };

    const renderLoggedInMenu = () => {
        return (
            <>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar
                                alt="User"
                                src="/static/images/avatar/2.jpg"
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElementUser}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        getContentAnchorEl={null}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElementUser)}
                        onClose={handleCloseUserMenu}
                        PaperProps={{
                            style: {
                                display: "flex",
                                alignItems: "center",
                                justifyItems: "center",
                                maxWidth: "300px",
                                width: "100%",
                                padding: "10px 0"
                            },
                        }}
                        MenuListProps={{
                            style:{
                                margin: "0 5px",
                                width: "100%",
                            }
                          }}
                    >
                        <Box className={classes.userMenuContainer}>
                            <Avatar
                                alt="User"
                                src="/static/images/avatar/2.jpg"
                            />
                            <Box
                                component="span"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    className={classes.username}
                                >{`${auth.currentUser.firstName}`}</Typography>
                            </Box>

                            <MenuItem
                                key="logout"
                                onClick={handleLogout}
                                className={classes.logoutButton}
                            >
                                <Typography variant="body2">Logout</Typography>
                            </MenuItem>
                        </Box>
                    </Menu>
                </Box>
            </>
        );
    };

    return (
        <>
            <AppBarStyled className={classes.navbar} open={open}>
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
                        <MenuIcon />
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
                    {auth.authenticated && renderLoggedInMenu()}
                </Toolbar>
            </AppBarStyled>
            <DrawerStyled variant="permanent" open={open}>
                <Toolbar className={classes.toggleDrawerButton}>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeft />
                    </IconButton>
                </Toolbar>
                <Divider />
                <Box className={classes.sidebarItems}>
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
                        <ListItem
                            button
                            component={Link}
                            to="/admin/categories/"
                        >
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
                </Box>
            </DrawerStyled>
        </>
    );
};

export default Sidebar;
