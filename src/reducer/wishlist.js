export const initializeWishlist = (state, { payload }) => {
  const wishlistToSave = payload.wishlist.map(
    (payloadItem) => payloadItem.product
  );
  return { ...state, wishlist: wishlistToSave };
};

export const addToWishlist = (state, { payload }) => {
  console.log([...state.wishlist, payload]);
  return {
    ...state,
    wishlist: [...state.wishlist, payload],
  };
};

export const removeFromWishlist = (state, { payload }) => {
  return {
    ...state,
    wishlist: state.wishlist.filter((wishItem) => wishItem._id !== payload._id),
  };
};
