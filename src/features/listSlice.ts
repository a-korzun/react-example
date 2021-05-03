import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getList from '../services/api';

export interface State {
  loadingState: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  data: Record<string, string | boolean>[];
  count: number;
  order: 'asc' | 'desc';
  sort: string;
  query: string;
}

const initialState: State = {
  loadingState: 'idle',
  data: [],
  count: 0,
  order: 'desc',
  sort: '',
  query: '',
};

export const fetchList = createAsyncThunk(
  'list/fetch',
  () => getList(),
);

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setSorting(state, action) {
      if (state.sort === action.payload && state.order === 'desc') {
        state.order = 'asc';

        return;
      }

      if (state.sort === action.payload && state.order === 'asc') {
        state.order = 'desc';
        state.sort = '';

        return;
      }

      state.order = 'desc';
      state.sort = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchList.pending, (state) => {
      state.loadingState = 'pending';
    });

    builder.addCase(fetchList.fulfilled, (state, action) => {
      state.loadingState = 'fulfilled';
      state.data = action.payload.entries;
      state.count = action.payload.count;
    });

    builder.addCase(fetchList.rejected, (state) => {
      state.loadingState = 'rejected';
    });
  },
});

export const { setSorting, setQuery } = listSlice.actions;

export default listSlice.reducer;
