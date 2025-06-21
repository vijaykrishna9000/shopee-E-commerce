import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const findItemIndex = (state, action) =>
  state.list.findIndex((wishItem) => wishItem.productId === action.payload.productId);

export const fetchWishItemsData = createAsyncThunk('wishList/fetchWishItems', async () => {
  const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  return savedWishlist;
});

const slice = createSlice({
  name: 'wishList',
  initialState: {
    loading: false,
    list: [],
    error: '',
  },
  reducers: {
    addWishItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex === -1) {
        state.list.push({ ...action.payload, quantity: 1 });
        localStorage.setItem('wishlist', JSON.stringify(state.list));
        toast.success('Added to wishlist!');
      } else {
        toast.info('Item already in wishlist!');
      }
    },
    removeWishItem(state, action) {
      const existingItemIndex = findItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state.list.splice(existingItemIndex, 1);
        localStorage.setItem('wishlist', JSON.stringify(state.list));
        toast.success('Removed from wishlist!');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishItemsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishItemsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchWishItemsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong!';
      });
  },
});

const getWishItems = ({ products, wishItems }) => {
  return wishItems.list
    .map(({ productId, quantity }) => {
      const wishProduct = products.list.find((product) => product.id === productId);
      return wishProduct ? { ...wishProduct, quantity } : null;
    })
    .filter(Boolean);
};

export const getAllWishItems = createSelector(getWishItems, (wishItems) => wishItems);
export const getWishLoadingState = (state) => state.wishItems.loading;
export const getWishError = (state) => state.wishItems.error;

export const { addWishItem, removeWishItem } = slice.actions;
export default slice.reducer;