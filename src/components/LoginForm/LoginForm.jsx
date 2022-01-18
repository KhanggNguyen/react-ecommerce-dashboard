import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../actions/auth';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    CircularProgress,
} from "@material-ui/core";

import { LockOutlined } from "@material-ui/icons";

import useStyles from "./styles";

const LoginForm = () => {
    const { isFetching, error, message } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const userInput = {
            email: data.get("email"),
            password: data.get("password"),
        };
        // eslint-disable-next-line no-console
        console.log(userInput);

        if (userInput.email && userInput.password) {
            dispatch(login(userInput));
        }
    };
    return (
        <>  
            <Container
                component="main"
                maxWidth="xs"
                className={classes.content}
            >
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
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href='/admin/register/' variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            {isFetching ? <CircularProgress size="small" /> : null}
        </>
    );
};

export default LoginForm;