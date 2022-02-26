import {
    Box,
    IconButton,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { Edit, Visibility } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/user";
import { FormDialog, Input, Layout } from "../../components";

import useStyles from "./styles";

const Customers = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector((state) => state.user);

    const [open, setOpen] = useState(false);
    const [userSelected, setUserSelected] = useState(null);
    const [detailDialog, setDetailDialog] = useState(false);

    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName]= useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleOpen = (_user) => {
        if(_user){
            setId(_user._id);
            setFirstName(_user.firstName);
            setLastName(_user.lastName);
            setEmail(_user.email);
            setUserSelected(_user);
        }else{
            emptyUserState();
        }

        setOpen(true);
    };

    const handleClose = () => {
        setUserSelected(null);
        setOpen(false);
    };

    const showDetailDialog = (_user) => {
        setUserSelected(_user);
        setDetailDialog(true);
    };

    const closeDetailDialog = () => {
        setUserSelected(null);
        setDetailDialog(false);
    };

    const handleSubmitDialog = () => {
        const form = new FormData();

        form.append("_id", id);
        form.append("firstName", firstName);
        form.append("lastName", lastName);
        form.append("email", email);
        form.append("password", password);
        
        let _user = {}
        for(var pair of form.entries()){
            _user[pair[0]] = pair[1];
        }
        if (userSelected) {
            dispatch(updateUser(_user)).then(() => setOpen(false));
        } else {
            //dispatch(addProduct(form)).then(() => setOpen(false));
            console.log("add user");
        }

        setUserSelected(null);
        emptyUserState();
    };

    const emptyUserState = () => {
        setId("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }

    const renderCustomers = () => {
        return (
            <Paper className={classes.tablePaper}>
                <Table size="medium" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Created</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.users?.length > 0
                            ? user.users.map((_user, index) => {
                                  return (
                                      <TableRow key={_user._id}>
                                          <TableCell align="center" style={{width: "5%"}}>
                                              {index + 1}
                                          </TableCell>
                                          <TableCell
                                              align="center"
                                              className={classes.titleCell}
                                              style={{width: "20%"}}
                                          >
                                              {`${_user.firstName} ${_user.lastName}`}
                                          </TableCell>
                                          <TableCell
                                              align="left"
                                              style={{width: "40%"}}    
                                          >
                                              {_user.email}
                                          </TableCell>
                                          <TableCell align="center" style={{width: "20%"}}>
                                              {new Intl.DateTimeFormat(
                                                  "fr-FR",
                                                  {
                                                      year: "numeric",
                                                      month: "2-digit",
                                                      day: "2-digit",
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                      second: "2-digit",
                                                  }
                                              ).format(
                                                  Date.parse(_user.createdAt)
                                              )}
                                          </TableCell>
                                          <TableCell align="center" style={{width: "15%"}}>
                                              <IconButton
                                                  onClick={() =>
                                                      showDetailDialog(_user)
                                                  }
                                              >
                                                  <Visibility />
                                              </IconButton>
                                              <IconButton
                                                  onClick={() => {
                                                      handleOpen(_user);
                                                  }}
                                              >
                                                  <Edit />
                                              </IconButton>
                                          </TableCell>
                                      </TableRow>
                                  );
                              })
                            : null}
                    </TableBody>
                </Table>
            </Paper>
        );
    };

    const renderAddUserDialog = () => {
        return (
            <FormDialog
                title="Create New User"
                size="lg"
                open={open}
                onClose={handleClose}
                onSubmit={handleSubmitDialog}
                fullWidth
                maxWidth="md"
                className={classes.formCreate}
            >
                <Grid container style={{ margin: "5px 0" }}>
                    <Grid item xs={12} sm={12}>
                        <Input
                            type="text"
                            label="First Name"
                            value={firstName}
                            placeholder={`John`}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Input
                            type="text"
                            label="Last Name"
                            value={lastName}
                            placeholder={`Doe`}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Input
                            type="text"
                            label="Email"
                            value={email}
                            placeholder={`john.doe@gmail.com`}
                            onChange={ (e) => setEmail(e.target.value)}
                            disabled={true}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Input
                            type="password"
                            label="Password"
                            value={password}
                            placeholder={`**********`}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Grid>
                </Grid>
            </FormDialog>
        );
    };

    const renderUserDetailDialog = () => {
        if (!userSelected) {
            return;
        }

        return (
            <FormDialog
                title="Order detail"
                open={detailDialog}
                onClose={closeDetailDialog}
                buttons={[
                    {
                        label: "Close",
                        variant: "contained",
                        color: "primary",
                        onClick: closeDetailDialog,
                    },
                ]}
                fullWidth
                maxWidth="md"
                className={classes.detailDialog}
            >
                <Box>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm container>
                                <Grid
                                    item
                                    xs
                                    container
                                    direction="column"
                                    spacing={2}
                                >
                                    <Grid item xs>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                        >
                                            {`Name : ${userSelected.firstName} ${userSelected.lastName}` }
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                        >
                                            {`Email : ${userSelected.email} `} 
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </FormDialog>
        );
    };

    return (
        <Layout title={`Customers`}>
            <Box component="main" className={classes.box}>
                <Toolbar />

                <Container maxWidth="lg" style={{ margin: "4px 0" }}>
                    <Grid item xs={12} className={classes.grid}>
                        {renderCustomers()}
                    </Grid>
                </Container>
            </Box>
            {renderUserDetailDialog()}
            {renderAddUserDialog()}
        </Layout>
    );
};

export default Customers;
