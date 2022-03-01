import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/auth";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    Snackbar,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { LockOutlined } from "@material-ui/icons";
import useStyles from "./styles";

const RegisterForm = () => {
    const auth = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const user = {
            email: data.get("email"),
            password: data.get("password"),
            lastName: data.get("lastName"),
            firstName: data.get("firstName"),
        };

        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPassword(user.password);

        if (user.email && user.password && user.lastName && user.firstName) {
            dispatch(signup(user));
            auth.error && handleClick();
        }
    };

    return (
        <Container component="main" maxWidth="xs" className={classes.content}>
            <div className={classes.toolbar} />
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h4">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={firstName}
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                onChange={(e) => {
                                    setFirstName(e.currentTarget.value);
                                }}
                                error={firstName === ""}
                                helperText={
                                    firstName === ""
                                        ? "First name can not be empty."
                                        : " "
                                }
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={lastName}
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                onChange={(e) => {
                                    setLastName(e.currentTarget.value);
                                }}
                                error={lastName === ""}
                                helperText={
                                    lastName === ""
                                        ? "Last name can not be empty."
                                        : " "
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => {
                                    setEmail(e.currentTarget.value);
                                }}
                                error={
                                    email === "" ||
                                    (email && !/^\S+@\S+\.\S+$/.test(email))
                                }
                                helperText={
                                    (email === "" &&
                                        "Email can not be empty.") ||
                                    (email &&
                                        !/^\S+@\S+\.\S+$/.test(email) &&
                                        "Email is not valid.")
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={password}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e) => {
                                    setPassword(e.currentTarget.value);
                                }}
                                error={
                                    password === "" ||
                                    (password && password.length < 6)
                                }
                                helperText={
                                    (password === "" &&
                                        "Password can not be empty.") ||
                                    (password &&
                                        password.length < 6 &&
                                        "Minimum 6 characters.")
                                }
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        className={classes.button}
                    >
                        Sign Up
                    </Button>
                    <Snackbar
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                    >
                        <Alert
                            onClose={handleClose}
                            severity="error"
                            sx={{ width: "100%" }}
                        >
                            {auth.error && auth.message && auth.message.length
                                ? auth.message
                                : ""}
                        </Alert>
                    </Snackbar>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <span>Already have an account?</span> 
                            <Link href="/admin/login" variant="body2">
                                {" Sign in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterForm;
