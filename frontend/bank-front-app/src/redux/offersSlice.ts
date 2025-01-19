import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { BankOffer } from '../api/Api';

interface BankOffersStateData {
    offers: BankOffer[];
    draftApplicationID: number;
    applicationSectionsCounter: number;
}

interface BankOffersState {
    data: BankOffersStateData;
    loading: boolean;
    error: boolean;
}

const initialState: BankOffersState = {
    data: { offers: [], draftApplicationID: 0, applicationSectionsCounter: 0 },
    loading: true,
    error: false
};

export const fetchOffers = createAsyncThunk(
    'offers/fetchOffers',
    async (searchValue: string | undefined, { rejectWithValue }) => {
        try {
            const response = await api.offers.offersList({ offer_name: searchValue });
            return response.data
        } catch {
            return rejectWithValue('Не удалось получить список услуг')
        }
    }
);

export const addOfferToDraft = createAsyncThunk(
    'offers/addOfferToDraft',
    async (sectionId: number, { rejectWithValue }) => {
        try {
            const response = await api.applications.applicationsCreate({section_id: sectionId});
            return response.data
        } catch {
            return rejectWithValue('Не удалось добавить услугу к заявке-черновику')
        }
    }
);

export const deleteOffer = createAsyncThunk(
    'offers/deleteOffer',
    async (sectionId: string, { rejectWithValue }) => {
        try {
            const response = await api.offers.offersDelete(sectionId);
            return response.data
        } catch {
            return rejectWithValue('Не удалось удалить услугу')
        }
    }
);

const offersSlice = createSlice({
    name: 'offers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOffers.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchOffers.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.offers = data.offers;
                state.data.applicationSectionsCounter = data.application_offers_counter;
                state.data.draftApplicationID = data.draft_application_id;

                state.error = false
                state.loading = false
            })
            .addCase(fetchOffers.rejected, (state) => {
                state.error = true
                state.loading = false
            })

            .addCase(addOfferToDraft.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.applicationSectionsCounter = data.number_of_offers;
                state.data.draftApplicationID = data.draft_application_id;
            })
            .addCase(addOfferToDraft.rejected, (state) => {
                state.error = true
            })

            .addCase(deleteOffer.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.offers = data;
                state.error = false
            })
            .addCase(deleteOffer.rejected, (state) => {
                state.error = true
            })
    }
});

export default offersSlice.reducer;
