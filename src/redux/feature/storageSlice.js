import { createSlice } from "@reduxjs/toolkit";

const storageSlice = createSlice({
  name: "storageSlice",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  initialState: { select: {}, hospitals: [] },
=======
  initialState: { select: {} },
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
  initialState: { select: {} },
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
  initialState: { select: {} },
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
  reducers: {
    setSelect: (state, action) => {
      localStorage.setItem("SELECT_HOSPITAL", JSON.stringify(action.payload));
      state.select = action.payload;
    },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    setHospitalsInfo: (state, action) => {
      let index1 = true;
      let index2 = true;
      let guIdx = -1;
      // sessionStorage.setItem("HOSPITALS", JSON.stringify(action.payload));

      if (!state.hospitals) {
        state.hospitals = [
          {
            [action.payload.gugun]: [
              { [action.payload.area]: [action.payload] },
            ],
          },
        ];
      } else {
        let index1 = true;
        let index2 = true;

        // state.hospitals =

        const stat = state.hospitals?.map((gugun, idx) => {
          console.log(state.hospitals.map((a) => console.log(a)));
          if (index1 && Object.keys(gugun)[0] === action.payload.gugun) {
            if (index1) {
              let key = "";
              const data = [];
              const arr = Object.values(gugun).map((area) => {
                if (index2 && Object.keys(area[0])[0] === action.payload.area) {
                  index2 = false;
                  key = Object.keys(area[0])[0].toString();
                  data = [...Object.values(area[0])[0], action.payload];
                }
                return area;
              });
              index1 = false;
              return index2 ? [...arr, { [key]: data }] : [...arr];
            }
            return gugun;
          }
        });
        state.hospitals =
          index1 && index2
            ? [
                ...stat,
                {
                  [action.payload.gugun]: [
                    { [action.payload.area]: [action.payload] },
                  ],
                },
              ]
            : [...stat];

        // if (index1) {
        //   state.hospitals = [
        //     ...state.hospitals,
        //     {
        //       [action.payload.gugun]: [
        //         { [action.payload.area]: action.payload },
        //       ],
        //     },
        //   ];
        // } else {
        //   if (index2) {
        //     state.hospitals[guIdx][0] = [
        //       { [action.payload.area]: action.payload },
        //       ...state.hospitals[guIdx][0],
        //     ];
        //   }
        // }
      }
    },
=======
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
  },
});

export default storageSlice;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export const { setSelect, setHospitalsInfo } = storageSlice.actions;
=======
export const { setSelect } = storageSlice.actions;
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
export const { setSelect } = storageSlice.actions;
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
=======
export const { setSelect } = storageSlice.actions;
>>>>>>> 12d508227df1d36c1a944e5b8412fdd3db036a61
