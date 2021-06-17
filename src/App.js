import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Products,
  ProductDetails,
  Cart,
  Genre,
  Wishlist,
  Login,
  Signup,
  Home,
} from "./pages";
import { Navbar, Footer } from "./components";
import { PrivateRoute } from "./api/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <PrivateRoute path="/cart" element={<Cart />} />
            <PrivateRoute path="/wishlist" element={<Wishlist />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/genre/:slug" element={<Genre />} />
          </Routes>
          <Footer />
        </div>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
