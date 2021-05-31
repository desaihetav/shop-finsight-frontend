export const initializeCart = (state, { payload }) => {
  const cartToSave = payload.cart.map((payloadItem) => ({
    ...payloadItem.product,
    quantity: payloadItem.quantity,
  }));
  return { ...state, cart: cartToSave };
};

export const addToCart = (state, { payload }) => {
  if (!state.cart.find((cartItem) => cartItem._id === payload._id)) {
    return {
      ...state,
      cartTotalOG: state.cartTotalOG + payload.price,
      cartTotalFinal:
        state.cartTotalFinal + (payload.price * (100 - payload.discount)) / 100,
      cart: [...state.cart, { ...payload, quantity: 1 }],
    };
  }
  return state;
};

export const addQty = (state, { payload }) => {
  return {
    ...state,
    cartTotalOG: state.cartTotalOG + payload.price,
    cartTotalFinal:
      state.cartTotalFinal + (payload.price * (100 - payload.discount)) / 100,
    cart: state.cart.map((cartItem) =>
      cartItem._id === payload._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    ),
  };
};

export const removeQty = (state, { payload }) => {
  return {
    ...state,
    cartTotalOG: state.cartTotalOG - payload.price,
    cartTotalFinal:
      state.cartTotalFinal - (payload.price * (100 - payload.discount)) / 100,
    cart:
      payload.quantity > 1
        ? decrementQuantity(state, payload)
        : removeItem(state, payload),
  };
};

const decrementQuantity = (state, payload) => {
  state.cart.map((cartItem) =>
    cartItem._id === payload._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeItem = (state, payload) => {
  state.cart.filter((cartItem) => cartItem._id !== payload._id);
};
