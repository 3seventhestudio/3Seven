import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Product from "./pages/Product/Product";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

import About from "./pages/About/About";
import Journal from "./pages/Journal/Journal";
import Collections from "./pages/Collections/Collections";
import Contact from "./pages/Contact/Contact";

import OrderSuccess from "./pages/Orders/OrderSuccess/OrderSuccess";
import MyOrders from "./pages/Orders/MyOrders/MyOrders";
import OrderDetails from "./pages/Orders/OrderDetails/OrderDetails";

import AccountDashboard from "./pages/Account/Dashboard/Dashboard";
import Profile from "./pages/Account/Profile/Profile";
import ManageAddresses from "./pages/Account/ManageAddresses/ManageAddresses";
import ChangePassword from "./pages/Account/ChangePassword/ChangePassword";

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
                <Route path="/collections" element={<Collections />} />
                <Route path="/about" element={<About />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/contact" element={<Contact />} />
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