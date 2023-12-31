import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadData } from './thunks';

export interface AppState {
  isDataLoaded: boolean;
  elements: Array<string>;
  selected: Array<string>;
}

export const initialState: AppState = {
  isDataLoaded: false,
  elements: [],
  selected: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDataLoaded(state, action: PayloadAction<boolean>): void {
      state.isDataLoaded = action.payload;
    },
    setSelected(state, action: PayloadAction<string[]>): void {
      state.selected = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      loadData.fulfilled,
      (state, action: PayloadAction<Array<string>>) => {
        state.isDataLoaded = true;
        state.elements = action.payload;
      }
    );
  },
});

export const { setDataLoaded, setSelected } = appSlice.actions;

export const appReducer = appSlice.reducer;
