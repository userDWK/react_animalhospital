import { createSlice } from "@reduxjs/toolkit";

const storageSlice = createSlice({
  name: "storageSlice",
  initialState: { select: {} },
  reducers: {
    setSelect: (state, action) => {
      localStorage.setItem("SELECT_HOSPITAL", JSON.stringify(action.payload));
      state.select = action.payload;
    },
  },
});

export default storageSlice;
export const { setSelect } = storageSlice.actions;
