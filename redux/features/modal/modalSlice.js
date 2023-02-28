import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  vendorCartIsOpen: false,
  createFoodIsOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      if (action.payload == "vendorCart") {
        state.vendorCartIsOpen = true;
      } else if (action.payload == "createFood") {
        state.createFoodIsOpen = true;
      } else state.isOpen = true; //! this default case is for the food item modal
    },
    closeModal: (state, action) => {
      if (action.payload == "vendorCart") {
        state.vendorCartIsOpen = false;
      } else if (action.payload == "createFood") {
        state.createFoodIsOpen = false;
      } else state.isOpen = false; //! this default case if for the food item modal
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
