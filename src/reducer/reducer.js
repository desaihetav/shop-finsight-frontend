export const reducerFunc = (state, { type, payload }) => {
  switch (type) {
    case "INITIALIZE_PRODUCTS":
      return { ...state, products: payload };
    case "ADD_TO_CART":
      if (
        !state.cart.find((cartItem) => cartItem.id.isbn10 === payload.id.isbn10)
      ) {
        return {
          ...state,
          cartTotalOG: state.cartTotalOG + payload.price.original,
          cartTotalFinal: state.cartTotalFinal + payload.price.final,
          cart: [...state.cart, { ...payload, quantity: 1 }],
        };
      }
      return state;
    default:
      return state;
  }
};

export const initialState = {
  products: [],
  cart: [],
  cartTotalOG: 0,
  cartTotalFinal: 0,
  wishlist: [],
};
