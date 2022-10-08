import { createSlice } from "@reduxjs/toolkit";

const interestSlice = createSlice({
  name: "interestSlice",
  initialState: { hospitals: {} },
  reducers: {
    setHospitals: (state, action) => {
      state.hospitals = { ...state.hospitals, ...action.payload };
    },
  },
});

export default interestSlice;
export const { setHospitals } = interestSlice.actions;
