import { createSlice } from "@reduxjs/toolkit";

function getLocalStorageTheme() {
  let theme;

  if (typeof window !== "undefined") {
    theme = localStorage.getItem("theme");

    if (!theme)
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }

  return theme;
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: getLocalStorageTheme(),
  },
  reducers: {
    setTheme(state, action) {
      const { payload } = action;

      state.theme = payload;

      return state;
    },
  },
});

export const themeSliceActions = themeSlice.actions;
export default themeSlice.reducer;
