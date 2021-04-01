import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Products, Cart, Wishlist } from "./pages";

function App() {
  return (
    <Router>
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
      </Switch>
    </Router>
  );
}

export default App;
