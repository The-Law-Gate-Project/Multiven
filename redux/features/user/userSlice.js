import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  fname: "",
  email: "",
  phone: "",
  address: "",
  landmark: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setDetails: (state, { fname, email, phone, address, landmark }) => {
      (state.fname = fname),
        (state.email = email),
        (state.phone = phone),
        (state.address = address),
        (state.landmark = landmark);
    },
  },
});

export default userSlice.reducer;
export const { loggedIn, setDetails } = userSlice.actions;
