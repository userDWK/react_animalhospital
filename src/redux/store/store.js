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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    hospitalData: storageSlice.reducer,
=======
    selectData: storageSlice.reducer,
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
    selectData: storageSlice.reducer,
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
    selectData: storageSlice.reducer,
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
  },
});

export default store;
