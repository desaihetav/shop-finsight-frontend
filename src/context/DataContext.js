import { useEffect, useContext, createContext, useReducer } from "react";
import { reducerFunc, initialState } from "../reducer/reducer";
import axios from "axios";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://shop-finsight.desaihetav.repl.co/products"
      );
      dispatch({
        type: "INITIALIZE_PRODUCTS",
        payload: response.data.products,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserData = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [user]);

  useEffect(() => {
    state.products.length === 0 && fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        cartTotalOG: state.cartTotalOG,
        cartTotalFinal: state.cartTotalFinal,
        wishlist: state.wishlist,
        showFastDeliveryOnly: state.showFastDeliveryOnly,
        showCashOnDeliveryOnly: state.showCashOnDeliveryOnly,
        sortParameter: state.sortParameter,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
