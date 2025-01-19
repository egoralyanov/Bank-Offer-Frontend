import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { BankOffer } from '../api/Api';

interface BankOfferState {
    data: BankOffer | null;
    newOfferId: number | null;
    loading: boolean;
    error: boolean;
}

const initialState: BankOfferState = {
    data: null,
    newOfferId: null,
    loading: true,
    error: false
};

export const fetchOffer = createAsyncThunk(
    'offer/fetchOffer',
    async (sectionId: string, { rejectWithValue }) => {
        try {
            const response = await api.offers.offersRead(sectionId);
            return response.data
        } catch {
            return rejectWithValue('Не удалось получить секцию по id')
        }
    }
);

export const updateOffer = createAsyncThunk(
    'offer/updateOffer',
    async ({ sectionId, updatedSection }: { sectionId: string; updatedSection: BankOffer }, { rejectWithValue }) => {
        try {
            const response = await api.offers.offersUpdate(sectionId, { ...updatedSection });
            return response.data
        } catch {
            return rejectWithValue('Не удалось обновить секцию')
        }
    }
);

export const updateOfferImage = createAsyncThunk(
    'offer/updateOfferImage',
    async ({ sectionId, imageFile }: { sectionId: string; imageFile: File }, { rejectWithValue }) => {
        try {
            const response = await api.offers.OffersCreateImage(sectionId, { image: imageFile });
            return response.data
        } catch {
            return rejectWithValue('Не удалось обновить изображение секции')
        }
    }
);

export const createOffer = createAsyncThunk(
    'offer/createOffer',
    async (newSection: BankOffer, { rejectWithValue }) => {
        try {
            const response = await api.offers.offersCreate(newSection);
            return response.data
        } catch {
            return rejectWithValue('Не удалось создать секцию')
        }
    }
);

const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOffer.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchOffer.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = false
                state.loading = false
            })
            .addCase(fetchOffer.rejected, (state) => {
                state.error = true
                state.loading = false
            })

            .addCase(updateOffer.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = false
            })
            .addCase(updateOffer.rejected, (state) => {
                state.error = true
            })

            .addCase(updateOfferImage.fulfilled, (state) => {
                state.error = false
            })
            .addCase(updateOfferImage.rejected, (state) => {
                state.error = true
            })

            .addCase(createOffer.fulfilled, (state, action) => {
                const data = action.payload;
                state.newOfferId = Number(data.pk);
                state.error = false
            })
            .addCase(createOffer.rejected, (state) => {
                state.error = true
            })
    }
});

export default offerSlice.reducer;
