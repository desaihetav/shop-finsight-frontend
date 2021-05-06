import "./App.css";
import "./index.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useData } from "./context/DataContext";
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
import { useAuth } from "./context";

function App() {
  const { products, dispatch } = useData();
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        // "https://shop-finsight-default-rtdb.firebaseio.com/products.json"
        "https://shop-finsight.desaihetav.repl.co/products"
      );
      dispatch({
        type: "INITIALIZE_PRODUCTS",
        payload: response.data.products,
      });

      const responseCart = await axios.get(
        `https://shop-finsight.desaihetav.repl.co/cart/${user._id}`
      );
      console.log(responseCart.data.cart);
      dispatch({
        type: "INITIALIZE_CART",
        payload: responseCart.data.cart,
      });

      const responseWishlist = await axios.get(
        `https://shop-finsight.desaihetav.repl.co/wishlist/${user._id}`
      );
      console.log(responseWishlist.data.wishlist);

      dispatch({
        type: "INITIALIZE_WISHLIST",
        payload: responseWishlist.data.wishlist,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    products.length === 0 && fetchData();
  }, []);

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
