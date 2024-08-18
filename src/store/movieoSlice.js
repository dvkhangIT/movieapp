import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  imageURL: "",
};
export const movieoSlice = createSlice({
  name: "movieo",
  initialState,
  reducers: {
    setBannerData: (state, acion) => {
      state.bannerData = acion.payload;
    },
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
  },
});
export const { setBannerData, setImageURL } = movieoSlice.actions;
export default movieoSlice.reducer;
