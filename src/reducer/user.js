export const logout = (state) => {
  return {
    ...state,
    cart: [],
    cartTotalOG: 0,
    cartTotalFinal: 0,
    wishlist: [],
  };
};
