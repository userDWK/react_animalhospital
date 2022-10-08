import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messageSlice",
  initialState: { message: {} },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export default messageSlice;
export const { setMessage } = messageSlice.actions;
