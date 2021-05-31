import {
  initializeProducts,
  toggleCOD,
  toggleFastDelivery,
  sort,
} from "./products";

import {
  initializeWishlist,
  addToWishlist,
  removeFromWishlist,
} from "./wishlist";

import { initializeCart, addToCart, addQty, removeQty } from "./cart";

import { logout } from "./user";

const reducer = {
  INITIALIZE_PRODUCTS: initializeProducts,
  INITIALIZE_CART: initializeCart,
  INITIALIZE_WISHLIST: initializeWishlist,
  ADD_TO_CART: addToCart,
  ADD_QTY: addQty,
  REMOVE_QTY: removeQty,
  ADD_TO_WISHLIST: addToWishlist,
  REMOVE_FROM_WISHLIST: removeFromWishlist,
  TOGGLE_COD: toggleCOD,
  TOGGLE_FAST_DELIVERY: toggleFastDelivery,
  SORT: sort,
  LOGOUT: logout,
};

export const reducerFunc = (state, action) => {
  return reducer[action.type](state, action);
};

export const initialState = {
  products: [],
  cart: [],
  cartTotalOG: 0,
  cartTotalFinal: 0,
  wishlist: [],
  showOutOfStock: false,
  showCashOnDeliveryOnly: false,
  showFastDeliveryOnly: false,
  sortParameter: null,
};
