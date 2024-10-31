import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { domain } from 'shared/constants';
import { ReceivedLeadsState, FetchReceivedLeadsParams, FetchReceivedLeadsResponse } from './types';
import { addNotify } from 'store/notify/notifySlice';
import { useAppSelector } from 'shared/hooks/useAppSelector';

const initialState: ReceivedLeadsState = {
  leads: [],
  modal: {
    statusModal: {
      id: null,
      isOpen: false,
    },
  },
  count: 0,
  loading: false,
  error: null,
  refetch: false,
};

// Создаем асинхронный thunk для получения переданных лидов
export const fetchReceivedLeads = createAsyncThunk<FetchReceivedLeadsResponse, FetchReceivedLeadsParams>(
  'receivedLeads/fetchReceivedLeads',
  async params => {
    const response = await axios.get(`${domain}/api/leads/received-leads`, {
      withCredentials: true,
      params,
    });
    return response.data;
  },
);

export const changeLeadStatus = createAsyncThunk<void, { id: string; status: number }>(
  'receivedLeads/changeLeadStatus',
  async ({ id, status }, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const locale = state.locale.common;
    try {
      const response = await axios.patch(
        `${domain}/api/leads/change-status/${id}`,
        {
          status,
        },
        {
          withCredentials: true,
        },
      );

      // Отправляем уведомление о успешном выполнении
      dispatch(fetchReceivedLeads({}));
      dispatch(
        addNotify({
          text: locale.operationSuccess,
          type: 'success',
        }),
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      // Отправляем уведомление об ошибке
      dispatch(
        addNotify({
          text: locale.error,
          type: 'error',
        }),
      );

      return rejectWithValue((err.response?.data as string) || 'An error occurred');
    }
  },
);

export const downloadReceivedLeadsExcel = createAsyncThunk<void, FetchReceivedLeadsParams>(
  'receivedLeads/downloadExcel',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${domain}/api/leads/received-leads`, {
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
const receivedLeadsSlice = createSlice({
  name: 'receivedLeads',
  initialState,
  reducers: {
    changeStatusModal(state, action) {
      state.modal.statusModal.isOpen = !state.modal.statusModal.isOpen;
      state.modal.statusModal.id = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchReceivedLeads.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceivedLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload.leads;
        state.count = action.payload.count;
      })
      .addCase(fetchReceivedLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке лидов';
      });
  },
});

// Экспортируем редюсер
export const { changeStatusModal } = receivedLeadsSlice.actions;
export default receivedLeadsSlice.reducer;
