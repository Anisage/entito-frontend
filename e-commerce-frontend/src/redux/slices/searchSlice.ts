import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  visualSearch,
  type VisualSearchResponse,
} from "../../api/searchClient";

// Mirrors the productsSlice conventions: thunk + state shape + selectors,
// no internal action creators beyond resetters.

export interface SearchState {
  response: VisualSearchResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  response: null,
  loading: false,
  error: null,
};

/**
 * Map an axios error coming back from `/search/visual` into a
 * user-facing string. Mirrors the status-code branches the
 * `VisualSearchView` returns: 400 (bad image), 413 (oversize),
 * 502 (Cloudinary unavailable), 503 (Replicate / pgvector unavailable).
 */
const errorMessageFromAxios = (err: any): string => {
  const status = err?.response?.status;
  const backendMsg = err?.response?.data?.detail || err?.response?.data?.error;
  if (status === 413) return "Image is too large — keep it under 8 MB.";
  if (status === 400)
    return backendMsg || "That image couldn't be processed. Try another one.";
  if (status === 503)
    return "Visual search is temporarily unavailable. Please try again in a moment.";
  if (status === 502)
    return "Couldn't upload that image. Check your connection and retry.";
  return backendMsg || "Something went wrong. Please try again.";
};

export const runVisualSearch = createAsyncThunk<
  VisualSearchResponse,
  { file: File; limit?: number },
  { rejectValue: string }
>("search/visual", async ({ file, limit }, { rejectWithValue, signal }) => {
  try {
    return await visualSearch(file, { limit, signal });
  } catch (err: any) {
    return rejectWithValue(errorMessageFromAxios(err));
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearVisualSearch(state) {
      state.response = null;
      state.error = null;
      state.loading = false;
    },
    setSearchError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runVisualSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.response = null;
      })
      .addCase(runVisualSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(runVisualSearch.rejected, (state, action) => {
        state.loading = false;
        // `rejectWithValue` payload first; fall back to thunk error message.
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Something went wrong. Please try again.";
      });
  },
});

export const { clearVisualSearch, setSearchError } = searchSlice.actions;

export const selectVisualSearchResponse = (state: { search: SearchState }) =>
  state.search.response;
export const selectVisualSearchLoading = (state: { search: SearchState }) =>
  state.search.loading;
export const selectVisualSearchError = (state: { search: SearchState }) =>
  state.search.error;
export const selectVisualSearchResults = (state: { search: SearchState }) =>
  state.search.response?.results ?? [];

export default searchSlice.reducer;
