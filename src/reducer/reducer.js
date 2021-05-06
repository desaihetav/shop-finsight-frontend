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
    case "ADD_QTY":
      return {
        ...state,
        cartTotalOG: state.cartTotalOG + payload.price.original,
        cartTotalFinal: state.cartTotalFinal + payload.price.final,
        cart: state.cart.map((cartItem) =>
          cartItem.id.isbn10 === payload.id.isbn10
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      };
    case "REMOVE_QTY":
      return payload.quantity > 1
        ? {
            ...state,
            cartTotalOG: state.cartTotalOG - payload.price.original,
            cartTotalFinal: state.cartTotalFinal - payload.price.final,
            cart: state.cart.map((cartItem) =>
              cartItem.id.isbn10 === payload.id.isbn10
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            ),
          }
        : {
            ...state,
            cartTotalOG: state.cartTotalOG - payload.price.original,
            cartTotalFinal: state.cartTotalFinal - payload.price.final,
            cart: state.cart.filter(
              (cartItem) => cartItem.id.isbn10 !== payload.id.isbn10
            ),
          };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, payload],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (wishItem) => wishItem.id.isbn10 !== payload.id.isbn10
        ),
      };
    case "TOGGLE_COD":
      return (state = {
        ...state,
        showCashOnDeliveryOnly: !state.showCashOnDeliveryOnly,
      });

    case "TOGGLE_FAST_DELIVERY":
      return (state = {
        ...state,
        showFastDeliveryOnly: !state.showFastDeliveryOnly,
      });
    case "SORT":
      return {
        ...state,
        sortParameter: payload,
      };
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
  showOutOfStock: false,
  showCashOnDeliveryOnly: false,
  showFastDeliveryOnly: false,
  sortParameter: null,
};
