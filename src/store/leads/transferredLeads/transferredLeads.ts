import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { domain } from 'shared/constants';
import { TransferredLeadsState, FetchTransferredLeadsParams, FetchTransferredLeadsResponse } from './types';

const initialState: TransferredLeadsState = {
  leads: [],
  count: 0,
  loading: false,
  error: null,
  refetch: false,
  totalBudget: 0,
};

// Создаем асинхронный thunk для получения переданных лидов
export const fetchTransferredLeads = createAsyncThunk<FetchTransferredLeadsResponse, FetchTransferredLeadsParams>(
  'transferredLeads/fetchTransferredLeads',
  async params => {
    const response = await axios.get(`${domain}/api/leads/transferred-leads`, {
      withCredentials: true,
      params,
    });
    return response.data;
  },
);

// Создаем слайс
const transferredLeadsSlice = createSlice({
  name: 'transferredLeads',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTransferredLeads.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransferredLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload.leads;
        state.count = action.payload.count;
        state.totalBudget = action.payload.totalBudget;
      })
      .addCase(fetchTransferredLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке лидов';
      });
  },
});

// Экспортируем редюсер
export default transferredLeadsSlice.reducer;
