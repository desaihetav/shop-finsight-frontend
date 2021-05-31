export const initializeProducts = (state, { payload }) => {
  return { ...state, products: payload.allProducts };
};

export const toggleCOD = (state) => {
  return {
    ...state,
    showCashOnDeliveryOnly: !state.showCashOnDeliveryOnly,
  };
};

export const toggleFastDelivery = (state) => {
  return {
    ...state,
    showFastDeliveryOnly: !state.showFastDeliveryOnly,
  };
};

export const sort = (state, { payload }) => {
  return {
    ...state,
    sortParameter: payload,
  };
};
