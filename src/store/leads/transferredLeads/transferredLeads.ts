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

export const downloadTransferredLeadsExcel = createAsyncThunk<void, FetchTransferredLeadsParams>(
  'transferredLeads/downloadExcel',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${domain}/api/leads/transferred-leads`, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        withCredentials: true,
        params,
      });

      const blob = new Blob([response.data]);
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leads.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      return rejectWithValue(error);
    }
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
