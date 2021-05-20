import "./App.css";
import "./index.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useData, useAuth } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Products,
  ProductDetails,
  Cart,
  Wishlist,
  Login,
  Signup,
} from "./pages";
import { Navbar } from "./components";
import { PrivateRoute } from "./api/PrivateRoute";

function App() {
  return (
    <Router>
      {/* <ScrollToTop /> */}
      <Routes>
        {/* <Route path="/products">
          <Products />
        </Route> */}
        <div>
          <Navbar />
          <Routes>
            <PrivateRoute path="/cart" element={<Cart />} />
            <PrivateRoute path="/wishlist" element={<Wishlist />} />
            <Route path="/" element={<Products />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
          </Routes>
        </div>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
