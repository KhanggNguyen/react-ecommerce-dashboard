import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout, FormDialog, Input } from "../../components";

import {
    Box,
    Toolbar,
    Container,
    Button,
    Table,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    Grid,
    Paper,
    Typography,
    ButtonBase,
    IconButton,
} from "@material-ui/core";
import { Add, Edit, Delete, Visibility, Search } from "@material-ui/icons";
import {
    getAllProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
} from "../../actions/product";
import useStyles from "./styles";

const ProductsPage = () => {
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productPicture, setProductPicture] = useState([]);
    const [productPictures, setProductPictures] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [categoryFilter, setCategoryFilter] = useState("");

    const [open, setOpen] = useState(false);
    const [productDetailDialog, setProductDetailDialog] = useState(false);
    const [productDetailSelected, setProductDetailSelected] = useState(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);

    useEffect(() => {
        if (!product.isFetching) {
            setOpen(false);
        }
    }, [product.isFetching]);

    useEffect(() => {
        console.log(categoryFilter);
        if (categoryFilter) {
            dispatch(getProductsByCategory(categoryFilter));
        } else {
            dispatch(getAllProduct());
        }
    }, [categoryFilter]);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            } else {
                options.push({ value: category._id, name: category.name });
            }
        }

        return options;
    };

    const categoryList = createCategoryList(category.categories);

    const handleProductPictures = (e) => {
        if (e.target.files[0].size < 1 * 1024 * 1024) {
            //setProductPictures([...productPictures, e.target.files[0]]);//multiple image

            setProductPictures([e.target.files[0]]); //single image
        }
    };

    const handleOpen = (productSelected) => {
        if (productSelected) {
            setId(productSelected._id);
            setName(productSelected.name);
            setQuantity(productSelected.quantity);
            setPrice(productSelected.price);
            setDescription(productSelected.description);
            setCategoryId(productSelected.category._id);
            setProductPicture(productSelected.productPictures[0]);
            setProductDetailSelected(productSelected);
        } else {
            setName("");
            setQuantity("");
            setPrice("");
            setDescription("");
            setCategoryId("");
            setProductPicture([]);
            setProductPictures([]);
            setProductDetailSelected(null);
        }

        setOpen(true);
    };

    const handleClose = () => {
        setProductDetailSelected(null);
        setOpen(false);
    };

    const showProductDetailDialog = (product) => {
        setProductDetailSelected(product);
        setProductDetailDialog(true);
    };

    const closeProductDetailDialog = () => {
        setProductDetailDialog(false);
    };

    const showDeleteProductDialog = (product) => {
        setProductDetailSelected(product);
        setDeleteProductDialog(true);
    };

    const closeDeleteProductDialog = (product) => {
        setDeleteProductDialog(false);
    };

    const handleSubmitDialog = () => {
        const form = new FormData();

        form.append("_id", id);
        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryId);
        if (productPictures.length > 0) {
            for (let picture of productPictures) {
                console.log(picture);
                form.append("productPicture", picture);
            }
        }

        if (productDetailSelected) {
            dispatch(updateProduct(form)).then(() => setOpen(false));
        } else {
            dispatch(addProduct(form)).then(() => setOpen(false));
        }
    };

    const handleDeleteSubmit = () => {
        if (!productDetailSelected) {
            setDeleteProductDialog(false);
            return;
        }

        dispatch(deleteProduct(productDetailSelected._id));

        setDeleteProductDialog(false);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    }
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - product.products.length) : 0;

    const renderProducts = () => {
        return (
            <Paper className={classes.tablePaper}>
                <Table size="small" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell variant="head" align="center">
                                #
                            </TableCell>
                            <TableCell variant="head" align="center">
                                Name
                            </TableCell>
                            <TableCell variant="head" align="center">
                                Price
                            </TableCell>
                            <TableCell variant="head" align="center">
                                Quantity
                            </TableCell>
                            <TableCell variant="head" align="center">
                                Category
                            </TableCell>
                            <TableCell variant="head" align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.products?.length > 0
                            ? product.products.map((product, index) => {
                                  return (
                                      <TableRow key={product._id}>
                                          <TableCell
                                              variant="body"
                                              align="center"
                                              style={{width: "5%"}}
                                          >
                                              {index + 1}
                                          </TableCell>
                                          <TableCell
                                              variant="body"
                                              align="center"
                                              className={classes.titleCell}
                                              style={{width: "40%"}}
                                          >
                                              {product.name}
                                          </TableCell>
                                          <TableCell variant="body" align="center" style={{width: "10%"}}>
                                              {product.price}
                                          </TableCell>
                                          <TableCell variant="body" align="center" style={{width: "10%"}}>
                                              {product.quantity}
                                          </TableCell>
                                          <TableCell variant="body" align="center" style={{width: "20%"}}>
                                              {product.category.name}
                                          </TableCell>
                                          <TableCell variant="body" align="center" style={{width: "15%"}}>
                                              <IconButton
                                                  onClick={() =>
                                                      showProductDetailDialog(
                                                          product
                                                      )
                                                  }
                                              >
                                                  <Visibility />
                                              </IconButton>
                                              <IconButton
                                                  onClick={() => {
                                                      handleOpen(product);
                                                  }}
                                              >
                                                  <Edit />
                                              </IconButton>
                                              <IconButton
                                                  onClick={() =>
                                                      showDeleteProductDialog(
                                                          product
                                                      )
                                                  }
                                              >
                                                  <Delete />
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

    const renderProductDetailDialog = () => {
        if (!productDetailSelected) {
            return;
        }

        return (
            <FormDialog
                title="Product detail"
                open={productDetailDialog}
                onClose={closeProductDetailDialog}
                buttons={[
                    {
                        label: "Close",
                        variant: "contained",
                        color: "primary",
                        onClick: closeProductDetailDialog,
                    },
                ]}
                fullWidth
                maxWidth="md"
                className={classes.detailDialog}
            >
                <div style={{ flexGrow: 1 }}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img
                                        className={classes.img}
                                        alt="complex"
                                        src={
                                            productDetailSelected
                                                .productPictures?.length > 0 &&
                                            productDetailSelected
                                                .productPictures[0].img
                                        }
                                    />
                                </ButtonBase>
                            </Grid>
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
                                            {productDetailSelected.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                            className={classes.description}
                                        >
                                            {productDetailSelected.description}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {`Quantity : ${productDetailSelected.quantity}`}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {`${productDetailSelected.category.name}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        {productDetailSelected.price}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </FormDialog>
        );
    };

    const renderAddProductDialog = () => {
        return (
            <FormDialog
                title="Create New Product"
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
                            label="Name"
                            value={name}
                            placeholder={`Product Name`}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Input
                            type="text"
                            label="Quantity"
                            value={quantity}
                            placeholder={`Product Quantity`}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Input
                            type="text"
                            label="Price"
                            value={price}
                            placeholder={`Product Price`}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Input
                            type="select"
                            value={categoryId}
                            handleChange={(e) => setCategoryId(e.target.value)}
                            options={categoryList}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Input
                            type="text"
                            label="Description"
                            value={description}
                            placeholder={`Product Description`}
                            onChange={(e) => setDescription(e.target.value)}
                            className={classes.formDescription}
                            multiline
                            minRows={4}
                            maxRows={10}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {productPicture.img ? (
                            <ButtonBase className={classes.image}>
                                <img
                                    className={classes.img}
                                    alt="complex"
                                    src={productPicture.img}
                                />
                            </ButtonBase>
                        ) : null}
                    </Grid>
                </Grid>

                <input
                    type="file"
                    name="productPicture"
                    accept="image/png, image/jpeg"
                    onChange={handleProductPictures}
                />
            </FormDialog>
        );
    };

    const renderDeleteProductDialog = () => {
        if (!productDetailSelected) {
            return;
        }

        return (
            <FormDialog
                title="Confirm delete product ?"
                open={deleteProductDialog}
                onClose={() => setDeleteProductDialog(false)}
                buttons={[
                    {
                        label: "No",
                        variant: "contained",
                        color: "primary",
                        onClick: closeDeleteProductDialog,
                    },
                    {
                        label: "Yes",
                        variant: "contained",
                        color: "secondary",
                        onClick: handleDeleteSubmit,
                    },
                ]}
                fullWidth
                maxWidth="md"
                size="lg"
            >
                <span>{productDetailSelected.name}</span>
            </FormDialog>
        );
    };

    return (
        <Layout title={`Products`}>
            <Box component="main" className={classes.box}>
                <Toolbar />
                <Container maxWidth="lg" style={{ margin: "4px 0" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Button
                                align="left"
                                onClick={() => handleOpen()}
                                variant="outlined"
                                color="primary"
                                style={{ margin: "4px 4px" }}
                            >
                                <Add />
                                Add
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                type="select"
                                label="Category filter"
                                value={categoryFilter}
                                handleChange={(e) =>
                                    setCategoryFilter(e.target.value)
                                }
                                options={categoryList}
                            />
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth="lg" style={{ margin: "4px 0" }}>
                    <Grid item xs={12} className={classes.grid}>
                        {renderProducts()}
                    </Grid>
                </Container>
            </Box>
            {renderProductDetailDialog()}
            {renderAddProductDialog()}
            {renderDeleteProductDialog()}
        </Layout>
    );
};

export default ProductsPage;
