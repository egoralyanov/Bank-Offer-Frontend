import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { DetailedBankOffer, BankApplication } from '../api/Api';

interface ApplicationStateData {
    offers: DetailedBankOffer[];
    applicaiton: BankApplication | null;
}

interface ApplicationState {
    data: ApplicationStateData;
    loading: boolean;
    error: boolean;
}

const initialState: ApplicationState = {
    data: { offers: [], applicaiton: null },
    loading: true,
    error: false
};

export const fetchApplication = createAsyncThunk(
    'application/fetchApplication',
    async (applicationId: string, { rejectWithValue }) => {
        try {
            const response = await api.applications.applicationsRead(applicationId);
            return response.data
        } catch {
            return rejectWithValue('Не удалось получить заявку по id')
        }
    }
);

export const submitComment = createAsyncThunk(
    'application/submitComment',
    async ({ applicationId, sectionId, comment }: { applicationId: string; sectionId: string; comment: string }, { rejectWithValue }) => {
        try {
            const response = await api.applications.applicationsOfferUpdate(applicationId, sectionId, { comment });
            return response.data
        } catch {
            return rejectWithValue('Не удалось получить увеличить приоритет секции')
        }
    }
);

export const removeOffer = createAsyncThunk(
    'application/removeOffer',
    async ({ applicationId, sectionId }: { applicationId: string; sectionId: string }, { rejectWithValue }) => {
        try {
            const response = await api.applications.applicationsOfferDelete(applicationId, sectionId);
            return response.data
        } catch {
            return rejectWithValue('Не удалось удалить секцию из заявки')
        }
    }
);

export const changeFullName = createAsyncThunk(
    'application/changeFullName',
    async ({ applicationId, updatedApplication }: { applicationId: string; updatedApplication: BankApplication }, { rejectWithValue }) => {
        try {
            const response = await api.applications.applicationsUpdate(applicationId, updatedApplication);
            return response.data
        } catch {
            return rejectWithValue('Не удалось изменить ФИО в заявке')
        }
    }
);

export const deleteApplication = createAsyncThunk(
    'application/deleteApplication',
    async (applicationId: string, { rejectWithValue }) => {
        try {
            const response = await api.applications.applicationsDelete(applicationId);
            return response.data
        } catch {
            return rejectWithValue('Не удалось удалить заявку')
        }
    }
);

export const submitApplication = createAsyncThunk(
    'application/submitApplication',
    async (applicationId: string, { rejectWithValue }) => {
        try {
            const response = await api.applications.applicationsSubmitUpdate(applicationId);
            return response.data
        } catch {
            return rejectWithValue('Не удалось сформировать заявку')
        }
    }
);

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchApplication.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchApplication.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.offers = data.offers;
                state.data.applicaiton = data.application;

                state.error = false
                state.loading = false
            })
            .addCase(fetchApplication.rejected, (state) => {
                state.error = true
                state.loading = false
            })

            .addCase(submitComment.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.offers = data.offers;
            })
            .addCase(submitComment.rejected, (state) => {
                state.error = true
            })

            .addCase(removeOffer.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.offers = data.offers;
            })
            .addCase(removeOffer.rejected, (state) => {
                state.error = true
            })

            .addCase(changeFullName.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.applicaiton = data;
            })
            .addCase(changeFullName.rejected, (state) => {
                state.error = true
            })

            .addCase(deleteApplication.fulfilled, (state) => {
                state.data.offers = [];
                state.data.applicaiton = null;
            })
            .addCase(deleteApplication.rejected, (state) => {
                state.error = true
            })

            .addCase(submitApplication.fulfilled, (state) => {
                state.data.offers = [];
                state.data.applicaiton = null;
            })
            .addCase(submitApplication.rejected, (state) => {
                state.error = true
            })
    }
});

export default applicationSlice.reducer;
