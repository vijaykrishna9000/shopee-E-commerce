import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProductsData = createAsyncThunk('product/fetchProductItems', async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);
    return response.json();
  } catch (err) {
    throw err;
  }
});

const slice = createSlice({
  name: 'product',
  initialState: {
    loading: false,
    list: [],
    error: '',
    searchQuery: '',
    modal: { isOpen: false, productId: null },
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    openProductModal(state, action) {
      state.modal = { isOpen: true, productId: action.payload.productId };
    },
    closeProductModal(state) {
      state.modal = { isOpen: false, productId: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = '';
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong!';
      });
  },
});

export const getAllProducts = (state) => {
  const { list, searchQuery } = state.products;
  if (!searchQuery) return list;
  return list.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
export const getProductLoadingState = (state) => state.products.loading;
export const getProductError = (state) => state.products.error;
export const getProductModal = (state) => state.products.modal;

export const { setSearchQuery, openProductModal, closeProductModal } = slice.actions;
export default slice.reducer;