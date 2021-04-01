export const reducerFunc = (state, { type, payload }) => {
  switch (type) {
    case "INITIALIZE_PRODUCTS":
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const initialState = {
  products: [],
  cart: [],
  cartTotal: 0,
  wishlist: [],
};
