import { useEffect, useContext, createContext, useReducer } from "react";
import { reducerFunc, initialState } from "../reducer/reducer";
import axios from "axios";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const { user, token } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://shop-finsight.desaihetav.repl.co/products"
      );
      dispatch({
        type: "INITIALIZE_PRODUCTS",
        payload: {
          allProducts: response.data.products,
        },
      });

      const genresResponse = await axios.get(
        "https://shop-finsight.desaihetav.repl.co/genres"
      );
      dispatch({
        type: "INITIALIZE_GENRES",
        payload: {
          genres: genresResponse.data.genres,
        },
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
        payload: {
          cart: responseCart.data.cart,
        },
      });

      const responseWishlist = await axios.get(
        `https://shop-finsight.desaihetav.repl.co/wishlist/${user._id}`
      );
      console.log(responseWishlist.data.wishlist);

      dispatch({
        type: "INITIALIZE_WISHLIST",
        payload: {
          wishlist: responseWishlist.data.wishlist,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("fetching user data");
    token && fetchUserData();
  }, [user, token]);

  useEffect(() => {
    state.products.length === 0 && fetchData();
    state.products.length === 0 && console.log("fetching products");
  }, []);

  return (
    <DataContext.Provider
      value={{
        products: state.products,
        genres: state.genres,
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
