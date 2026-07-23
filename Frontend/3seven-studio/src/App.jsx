import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Product from "./pages/Product/Product";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

import OrderSuccess from "./pages/orders/OrderSuccess/OrderSuccess";
import MyOrders from "./pages/orders/MyOrders/MyOrders";
import OrderDetails from "./pages/orders/OrderDetails/OrderDetails";

import AccountDashboard from "./pages/account/Dashboard/Dashboard";
import Profile from "./pages/account/Profile/Profile";
import ManageAddresses from "./pages/account/ManageAddresses/ManageAddresses";
import ChangePassword from "./pages/account/ChangePassword/ChangePassword";

import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard/Dashboard";
import ProductList from "./pages/admin/Products/ProductList"
import ProductCreate from "./pages/admin/Products/ProductCreate"
import ProductEdit from "./pages/admin/Products/ProductEdit"
import CategoryList from "./pages/admin/categories/CategoryList";
import CategoryCreate from "./pages/admin/categories/CategoryCreate";
import CategoryEdit from "./pages/admin/categories/CategoryEdit";
import InventoryList from "./pages/admin/inventory/InventoryList";
import OrderList from "./pages/admin/orders/OrderList";
import OrderDetail from "./pages/admin/orders/OrderDetail";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Customer Routes */}

                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:slug" element={<Product />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/orders/success/:orderNumber" element={<OrderSuccess />} />
                <Route path="/orders/:orderNumber" element={<OrderDetails />} />
                <Route path="/account" element={<AccountDashboard />} />
                <Route path="/account/profile" element={<Profile />} />
                <Route path="/account/addresses" element={<ManageAddresses />} />
                <Route path="/account/change-password" element={<ChangePassword />} />

                {/* Admin Routes */}

                <Route path="/admin" element={<AdminLayout />} >
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/create" element={<ProductCreate />} />
                    <Route path="products/:productId/edit" element={<ProductEdit />} />
                    <Route path="categories" element={<CategoryList />} />
                    <Route path="categories/create" element={<CategoryCreate />} />
                    <Route path="categories/:id/edit" element={<CategoryEdit />} />
                    <Route path="inventory" element={<InventoryList />} />
                    <Route path="orders" element={<OrderList />} />
                    <Route path="orders/:id" element={<OrderDetail />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;