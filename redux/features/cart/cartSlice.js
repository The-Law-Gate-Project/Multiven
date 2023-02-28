import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0, // * this quantity is different from the quantity of each individual food item
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1; // ! this quantity is the quantity of items in the cart
      state.total +=
        (action.payload.baseFoodPrice + action.payload.extrasPrice) *
        action.payload.quantity;
    },
    increase: (state, action) => {
      state.products[action.payload].quantity += 1; // ! this quantity is the individual quantity of the food item
      state.total +=
        state.products[action.payload].baseFoodPrice +
        state.products[action.payload].extrasPrice;
    },
    decrease: (state, action) => {
      if (state.products[action.payload].quantity > 1) {
        state.products[action.payload].quantity -= 1;
        state.total -=
          state.products[action.payload].baseFoodPrice +
          state.products[action.payload].extrasPrice;
      }
    },
    removeItem: (state, action) => {
      // console.log(action.payload);
      state.total -=
        (state.products[parseInt(action.payload.index)].baseFoodPrice +
          state.products[parseInt(action.payload.index)].extrasPrice) *
        state.products[parseInt(action.payload.index)].quantity;

      // ! you have to pass the id of the food item as the payload in this action
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      ); // * this code keeps only the elements which have their ids different from the id passed in the action.payload and deleted the item which is equal to the action.payload
      state.quantity -= 1;
      if (state.quantity === 0) {
        state.total = 0;
      }
    },
    resetCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, resetCart, increase, decrease, removeItem } =
  cartSlice.actions;
