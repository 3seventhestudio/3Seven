import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoutes";

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
import Wishlist from "./pages/Wishlist/Wishlist";

import OrderSuccess from "./pages/Orders/OrderSuccess/OrderSuccess";
import MyOrders from "./pages/Orders/MyOrders/MyOrders";
import OrderDetails from "./pages/Orders/OrderDetails/OrderDetails";

import AccountDashboard from "./pages/Account/Dashboard/Dashboard";
import Profile from "./pages/Account/Profile/Profile";
import ManageAddresses from "./pages/Account/ManageAddresses/ManageAddresses";
import ChangePassword from "./pages/Account/ChangePassword/ChangePassword";


// Admin Layout
import AdminLayout from "./layouts/AdminLayout/AdminLayout";

// Admin Dashboard
import AdminDashboard from "./pages/admin/Dashboard/Dashboard";


// Admin Products
import ProductList from "./pages/admin/Products/ProductList";
import ProductCreate from "./pages/admin/Products/ProductCreate";
import ProductEdit from "./pages/admin/Products/ProductEdit";


// Admin Categories
import CategoryList from "./pages/admin/categories/CategoryList";
import CategoryCreate from "./pages/admin/categories/CategoryCreate";
import CategoryEdit from "./pages/admin/categories/CategoryEdit";


// Admin Inventory
import InventoryList from "./pages/admin/inventory/InventoryList";


// Admin Orders
import OrderList from "./pages/admin/orders/OrderList";
import OrderDetail from "./pages/admin/orders/OrderDetail";


// Admin Customers
import CustomerList from "./pages/admin/customers/CustomerList";
import CustomerDetail from "./pages/admin/customers/CustomerDetail";


// Admin Coupons
import CouponList from "./pages/admin/coupons/CouponList";
import CouponCreate from "./pages/admin/coupons/CouponCreate";
import CouponEdit from "./pages/admin/coupons/CouponEdit";


// Admin CMS
import CMSDashboard from "./pages/admin/cms/CMSDashboard";
import BannerList from "./pages/admin/cms/BannerList";
import BannerCreate from "./pages/admin/cms/BannerCreate";
import BannerEdit from "./pages/admin/cms/BannerEdit";
import PageList from "./pages/admin/cms/PageList";
import PageCreate from "./pages/admin/cms/PageCreate";
import FAQList from "./pages/admin/cms/FAQList";
import SiteSettings from "./pages/admin/cms/SiteSettings";


function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* Customer Routes */}

                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:slug" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/about" element={<About />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/orders/success/:orderNumber" element={<OrderSuccess />} />
                <Route path="/orders/:orderNumber" element={<OrderDetails />} />
                <Route path="/account" element={<AccountDashboard />} />
                <Route path="/account/profile" element={<Profile />} />

                <Route path="/account/addresses" element={<ManageAddresses />} />

                <Route path="/account/change-password" element={<ChangePassword />} />



                {/* Admin Routes */}

                <Route path="/admin" element={<AdminRoute> <AdminLayout /> </AdminRoute>} >

                    <Route index element={<AdminDashboard />} />

                    {/* Products */}
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/create" element={<ProductCreate />} />
                    <Route path="products/:productId/edit" element={<ProductEdit />} />


                    {/* Categories */}
                    <Route path="categories" element={<CategoryList />} />
                    <Route path="categories/create" element={<CategoryCreate />} />
                    <Route path="categories/:id/edit" element={<CategoryEdit />} />


                    {/* Inventory */}
                    <Route path="inventory" element={<InventoryList />} />


                    {/* Orders */}
                    <Route path="orders" element={<OrderList />} />
                    <Route path="orders/:id" element={<OrderDetail />} />


                    {/* Customers */}
                    <Route path="customers" element={<CustomerList />} />
                    <Route path="customers/:id" element={<CustomerDetail />} />



                    {/* Coupons */}
                    <Route path="coupons" element={<CouponList />} />
                    <Route path="coupons/create" element={<CouponCreate />} />
                    <Route path="coupons/:couponId/edit" element={<CouponEdit />} />



                    {/* CMS */}
                    <Route path="cms" element={<CMSDashboard />} />
                    <Route path="cms/banners" element={<BannerList />} />
                    <Route path="cms/banners/create" element={<BannerCreate />} />
                    <Route path="cms/banners/:bannerId/edit" element={<BannerEdit />} />
                    <Route path="cms/pages" element={<PageList />} />
                    <Route path="cms/pages/create" element={<PageCreate />} />
                    <Route path="cms/faqs" element={<FAQList />} />
                    <Route path="cms/settings" element={<SiteSettings />} />

                </Route>


            </Routes>

        </BrowserRouter>

    );

}


export default App;