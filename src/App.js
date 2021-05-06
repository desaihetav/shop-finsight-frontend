import "./App.css";
import "./index.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useData } from "./context/DataContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Products, ProductDetails, Cart, Wishlist } from "./pages";
import { Navbar } from "./components";

function App() {
  const { products, dispatch } = useData();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        // "https://shop-finsight-default-rtdb.firebaseio.com/products.json"
        "https://shop-finsight.desaihetav.repl.co/products"
      );
      dispatch({ type: "INITIALIZE_PRODUCTS", payload: response.data.products });
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
      <Navbar />
      <Switch>
        {/* <Route exact path="/products">
          <Products />
        </Route> */}
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/wishlist">
          <Wishlist />
        </Route>
        <Route exact path="/">
          <Products />
        </Route>
        <Route exact path="/product/:productId">
          <ProductDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
