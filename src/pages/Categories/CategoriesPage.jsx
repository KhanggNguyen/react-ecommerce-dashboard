import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout, FormDialog, Input } from "../../components";
import {
    addCategory,
    updateCategory,
    deleteCategory,
} from "../../actions/category";

import {
    ChevronRight,
    ExpandMore,
    Add,
    Edit,
    Delete,
} from "@material-ui/icons";
import {
    Link,
    Container,
    Grid,
    Box,
    Toolbar,
    Button,
    Typography,
    Divider,
} from "@material-ui/core";

import { TreeItem, TreeView } from "@material-ui/lab";

const CategoriesPage = () => {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");
    const [parentId, setParentId] = useState("");
    const [image, setImage] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState({});
    const [updateCategoryDialog, setUpdateCategoryDialog] = useState(false);
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);

    const handleImage = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        const categoryList = createCategoryList(category.categories);
        setCategories(categoryList);
    }, [category.isFetching]);

    const handleClose = () => {
        setName("");
        setParentId("");
        setImage("");
        setOpen(false);
    };

    const handleSubmit = () => {
        const form = new FormData();

        if (name === "") {
            setOpen(false);
            return;
        }

        form.append("name", name);
        parentId && form.append("parentId", parentId);
        image && form.append("image", image);

        dispatch(addCategory(form));

        setName("");
        setParentId("");
        setImage("");
        setOpen(false);
    };

    const handleUpdateSubmit = () => {
        const form = new FormData();

        if (name === "") {
            setUpdateCategoryDialog(false);
            return;
        }

        form.append("_id", selectedNode.value);
        form.append("name", name);
        parentId && form.append("parentId", parentId);
        image && form.append("image", image);

        dispatch(updateCategory(form));

        setName("");
        setParentId("");
        setImage("");
        setUpdateCategoryDialog(false);
    };

    const handleDeleteSubmit = () => {
        if (!selectedNode) {
            setDeleteCategoryDialog(false);
            return;
        }
        dispatch(deleteCategory(selectedNode.value));

        setDeleteCategoryDialog(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleUpdateOpen = () => {
        if (!selectedNode) {
            setUpdateCategoryDialog(false);
            return;
        }
        setName(selectedNode.name);
        setParentId(selectedNode.parentId);
        setUpdateCategoryDialog(true);
    };

    const handleDeleteOpen = () => {
        setName(selectedNode.name);
        setParentId(selectedNode.parentId);
        setDeleteCategoryDialog(true);
    };

    const renderCategories = (categories) => {
        let categoryList = [];
        for (let cat of categories) {
            categoryList.push({
                label: cat.name,
                value: cat._id,
                children:
                    cat.children?.length > 0 && renderCategories(cat.children),
            });
        }

        return categoryList;
    };

    const renderTree = (categories) => {
        return Array.isArray(categories)
            ? categories.map((cat) => (
                  <TreeItem key={cat._id} nodeId={cat._id} label={cat.name}>
                      {cat.children?.length > 0
                          ? renderTree(cat.children)
                          : null}
                  </TreeItem>
              ))
            : null;
    };

    const createCategoryList = (categories, options = []) => {
        for (let cat of categories) {
            options.push({
                value: cat._id,
                name: cat.name,
                parentId: cat.parentId,
                type: cat.type,
            });

            if (cat.children?.length > 0) {
                createCategoryList(cat.children, options);
            }
        }

        return options;
    };

    const addCategoryFormDialog = () => {
        return (
            <FormDialog
                title="Add New Category"
                open={open}
                onClose={handleClose}
                onSubmit={handleSubmit}
                size="lg"
            >
                <Input
                    type="text"
                    value={name}
                    placeholder="Category Name"
                    label="Category Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    type="select"
                    label="Category Parent"
                    value={parentId}
                    handleChange={(e) => setParentId(e.target.value)}
                    placeholder="Category Parent"
                    options={categories}
                />
            </FormDialog>
        );
    };

    const updateCategoryFormDialog = () => {
        return (
            <FormDialog
                title={`Update Categories`}
                open={updateCategoryDialog}
                onClose={() => setUpdateCategoryDialog(false)}
                onSubmit={handleUpdateSubmit}
                size="lg"
            >
                <Grid container spacing={2}>
                    <Grid container item xs={12} sm={12}>
                        <Input
                            type="text"
                            value={name}
                            placeholder={`Category Name`}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid container item xs={12} sm={12}>
                        <Input
                            type="select"
                            label="Category Parent"
                            value={parentId}
                            handleChange={(e) => setParentId(e.target.value)}
                            placeholder="Category Parent"
                            options={categories}
                        />
                    </Grid>
                </Grid>
            </FormDialog>
        );
    };

    const deleteCategoryFormDialog = () => {
        return (
            <FormDialog
                title="Confirm delete category"
                open={deleteCategoryDialog}
                onClose={() => setDeleteCategoryDialog(false)}
                buttons={[
                    {
                        label: "No",
                        variant: "contained",
                        color: "primary",
                        onClick: () => {
                            setDeleteCategoryDialog(false);
                        },
                    },
                    {
                        label: "Yes",
                        variant: "contained",
                        color: "secondary",
                        onClick: handleDeleteSubmit,
                    },
                ]}
                size="lg"
            >
                <span>{selectedNode.name}</span>
            </FormDialog>
        );
    };
    const categoryList = createCategoryList(category.categories);
    return (
        <Layout title={`Categories`}>
            <Box component="main">
                <Toolbar />
                <Container maxWidth="lg" style={{ margin: "4px 0" }}>
                    <Button
                        onClick={handleOpen}
                        variant="outlined"
                        color="primary"
                        style={{ margin: "4px 4px" }}
                    >
                        <Add />
                        Add
                    </Button>
                    <Button
                        onClick={handleUpdateOpen}
                        variant="outlined"
                        color="primary"
                        style={{ margin: "4px 4px" }}
                    >
                        <Edit />
                        Update
                    </Button>
                    <Button
                        onClick={handleDeleteOpen}
                        variant="outlined"
                        color="primary"
                        style={{ margin: "4px 4px" }}
                    >
                        <Delete />
                        Delete
                    </Button>
                </Container>
                <Container maxWidth="lg" style={{ margin: "4px 0" }}>
                    <Grid item xs={12}>
                        <TreeView
                            defaultCollapseIcon={<ExpandMore />}
                            defaultExpandIcon={<ChevronRight />}
                            onNodeSelect={(event, nodeIds) => {
                                categories.map((item, index) => {
                                    item.value === nodeIds &&
                                        setSelectedNode(item);
                                });
                            }}
                        >
                            {renderTree(category.categories)}
                        </TreeView>
                    </Grid>
                </Container>
            </Box>
            {addCategoryFormDialog()}
            {updateCategoryFormDialog()}
            {deleteCategoryFormDialog()}
        </Layout>
    );
};

export default CategoriesPage;
