import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiCall from '../../utilities/Apicall';

interface   ProductState {
  productType: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  productType: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const customProduct = createAsyncThunk(
  'product',
  async () => {
    try {
      return await apiCall('GET', '/product', null,);
    } catch (error: any) {
      return (error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    logout: (state) => {
      state.productType = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(customProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productType = action.payload;
        console.log('state.productType',state.productType)
      })
      .addCase(customProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { logout } = productSlice.actions;
export default productSlice.reducer;
