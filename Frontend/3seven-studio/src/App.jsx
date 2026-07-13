import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Product from "./pages/Product/Product";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />}/>
        <Route path="/shop" element={<Shop />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/product/:slug" element={<Product />}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;