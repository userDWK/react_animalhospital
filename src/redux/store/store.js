import { configureStore } from "@reduxjs/toolkit";
import interestSlice from "../feature/interestSlice";
import messageSlice from "../feature/messageSlice";
import storageSlice from "../feature/storageSlice";
import userSlice from "../feature/userSlice";

const store = configureStore({
  reducer: {
    userData: userSlice.reducer,
    interestData: interestSlice.reducer,
    messageData: messageSlice.reducer,
    selectData: storageSlice.reducer,
  },
});

export default store;
