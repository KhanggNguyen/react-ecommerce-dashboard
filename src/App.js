import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from './actions/category';
import { getAllProduct } from "./actions/product";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Login, Register } from "./components";
import { Dashboard, Categories, Products, Customers, Orders } from "./pages";


const PrivateOutlet = ({ authenticated }) => {
    return authenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};



const App = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect( () => {
        if(auth.authenticated){
            dispatch(getAllCategory());
            dispatch(getAllProduct());
        }
    }, [auth.authenticated]);

    return (
        <>
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/admin/login"
                    element={
                        auth.authenticated ? <Navigate to="/" /> : <Login />
                    }
                />
                <Route
                    path="/admin/register"
                    element={
                        auth.authenticated ? <Navigate to="/" /> : <Register />
                    }
                />

                {/* Private Routes */}
                <Route
                    element={
                        <PrivateOutlet
                            authenticated={auth.currentUser && auth.token}
                        />
                    }
                >
                    <Route path="/" element={<Navigate to="/admin/" />} />
                    <Route path="/admin/" element={<Dashboard />} />
                    <Route path="/admin/categories/" element={<Categories />} />
                    <Route path="/admin/products/" element={<Products />} />
                    <Route path="/admin/customers/" element={<Customers />} />
                    <Route path="/admin/orders/" element={<Orders />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
