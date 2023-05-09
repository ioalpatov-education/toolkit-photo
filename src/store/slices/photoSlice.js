import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photoList: [],
};

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      const photo = action.payload;
      state.photoList = [...state.photoList, ...photo];
    },
  },
});

export const { addPhoto } = photoSlice.actions;

export default photoSlice.reducer;
