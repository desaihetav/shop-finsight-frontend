import { reducerFunc } from "./reducer";

describe("testing add to cart", () => {
  it("should add to cart", () => {
    const initialState = {
      cart: [],
      cartTotalOG: 0,
      cartTotalFinal: 0,
    };
    const item1 = {
      _id: "1234",
      name: "The Psychology of Money",
      price: 500,
      discount: 10,
    };
    let action = {
      type: "ADD_TO_CART",
      payload: item1,
    };

    const state = reducerFunc(initialState, action);
    expect(state).toEqual({
      cart: [
        {
          _id: "1234",
          name: "The Psychology of Money",
          price: 500,
          discount: 10,
          quantity: 1,
        },
      ],
      cartTotalOG: 500,
      cartTotalFinal: 450,
    });

    const item2 = {
      _id: "1235",
      name: "Rich Dad Poor Dad",
      price: 700,
      discount: 10,
    };
    action = {
      type: "ADD_TO_CART",
      payload: item2,
    };

    const state2 = reducerFunc(state, action);
    expect(state2).toEqual({
      cart: [
        {
          _id: "1234",
          name: "The Psychology of Money",
          price: 500,
          discount: 10,
          quantity: 1,
        },
        {
          _id: "1235",
          name: "Rich Dad Poor Dad",
          price: 700,
          discount: 10,
          quantity: 1,
        },
      ],
      cartTotalOG: 1200,
      cartTotalFinal: 1080,
    });
  });

  it("should remove from cart", () => {
    const initialState = {
      cart: [
        {
          _id: "1234",
          name: "The Psychology of Money",
          price: 500,
          discount: 10,
          quantity: 1,
        },
        {
          _id: "1235",
          name: "Rich Dad Poor Dad",
          price: 700,
          discount: 10,
          quantity: 1,
        },
      ],
      cartTotalOG: 1200,
      cartTotalFinal: 1080,
    };
    const product = {
      _id: "1235",
      name: "Rich Dad Poor Dad",
      price: 700,
      discount: 10,
      quantity: 1,
    };
    const action = {
      type: "REMOVE_QTY",
      payload: product,
    };

    const state = reducerFunc(initialState, action);

    expect(state).toEqual({
      cart: [
        {
          _id: "1234",
          name: "The Psychology of Money",
          price: 500,
          discount: 10,
          quantity: 1,
        },
      ],
      cartTotalOG: 500,
      cartTotalFinal: 450,
    });
  });

  it("should add quantity of item in cart", () => {
    const initialState = {
      cart: [
        {
          _id: "1234",
          name: "The Psychology of Money",
          price: 500,
          discount: 10,
          quantity: 1,
        },
      ],
      cartTotalOG: 500,
      cartTotalFinal: 450,
    };
    const product = {
      _id: "1234",
      name: "The Psychology of Money",
      price: 500,
      discount: 10,
      quantity: 1,
    };
    const action = {
      type: "ADD_QTY",
      payload: product,
    };

    const state = reducerFunc(initialState, action);

    expect(state).toEqual({
      cart: [
        {
          _id: "1234",
          name: "The Psychology of Money",
          price: 500,
          discount: 10,
          quantity: 2,
        },
      ],
      cartTotalOG: 1000,
      cartTotalFinal: 900,
    });
  });

  it("should reduce quantity of item in cart", () => {
    const initialState = {
      cart: [
        {
          _id: "1234",
          name: "The Psychology of Money",
          price: 500,
          discount: 10,
          quantity: 2,
        },
      ],
      cartTotalOG: 1000,
      cartTotalFinal: 900,
    };
    const product = {
      _id: "1234",
      name: "The Psychology of Money",
      price: 500,
      discount: 10,
      quantity: 2,
    };
    const action = {
      type: "REMOVE_QTY",
      payload: product,
    };

    const state = reducerFunc(initialState, action);

    expect(state).toEqual({
      cart: [
        {
          _id: "1234",
          name: "The Psychology of Money",
          price: 500,
          discount: 10,
          quantity: 1,
        },
      ],
      cartTotalOG: 500,
      cartTotalFinal: 450,
    });
  });
});

// describe("testing remove from cart reducer", () => {
//   it("should add to cart when a value is added", () => {
//     let action = {
//       type: "REMOVE_FROM_CART",
//       payload: {
//         item: {
//           id: "1234",
//           name: "Joota",
//           price: 5000,
//         },
//       },
//     };
//     const initialState = {
//       items: [
//         {
//           id: "1234",
//           name: "Joota",
//           price: 5000,
//         },
//         {
//           id: "1235",
//           name: "Chashma",
//           price: 4000,
//         },
//       ],
//       totalPrice: 9000,
//       totalQuantity: 2,
//     };
//     const state = reducerFunc(initialState, action);
//     expect(state).toEqual({
//       items: [
//         {
//           id: "1235",
//           name: "Chashma",
//           price: 4000,
//         },
//       ],
//       totalPrice: 4000,
//       totalQuantity: 1,
//     });
//   });
// });

// describe("testing increase quantity reducer", () => {
//   it("should add to cart when a value is added", () => {
//     let action = {
//       type: "INCREASE_QUANTITY",
//       payload: {
//         item: {
//           id: "1234",
//           name: "Joota",
//           price: 5000,
//         },
//       },
//     };
//     const initialState = {
//       items: [
//         {
//           id: "1234",
//           name: "Joota",
//           price: 5000,
//           quantity: 1,
//         },
//       ],
//       totalPrice: 5000,
//       totalQuantity: 1,
//     };
//     const state = reducerFunc(initialState, action);
//     expect(state).toEqual({
//       items: [
//         {
//           id: "1234",
//           name: "Joota",
//           price: 5000,
//           quantity: 2,
//         },
//       ],
//       totalPrice: 10000,
//       totalQuantity: 1,
//     });
//   });
// });

// describe("testing decrease quantity reducer", () => {
//   it("should add to cart when a value is added", () => {
//     let action = {
//       type: "DECREASE_QUANTITY",
//       payload: {
//         item: {
//           id: "1234",
//           name: "Joota",
//           price: 5000,
//         },
//       },
//     };
//     const initialState = {
//       items: [
//         {
//           id: "1234",
//           name: "Joota",
//           price: 5000,
//           quantity: 2,
//         },
//       ],
//       totalPrice: 10000,
//       totalQuantity: 1,
//     };
//     const state = reducerFunc(initialState, action);
//     expect(state).toEqual({
//       items: [
//         {
//           id: "1234",
//           name: "Joota",
//           price: 5000,
//           quantity: 1,
//         },
//       ],
//       totalPrice: 5000,
//       totalQuantity: 1,
//     });
//   });
// });
