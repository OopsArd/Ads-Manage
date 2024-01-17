import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlaces = createAsyncThunk('places/fetchPlaces', async () => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://ads-management-backend.onrender.com/advertisingPlacement`,
        headers:{
            "Authorization": 'Bearer' + ' ' + 'admin',
        },
        data: ''
    };

    const rs = await axios.request(config);
    const data = await rs.data;
    return data;
});


const placesSlice = createSlice({
    name: 'places',
    initialState: {
        places: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaces.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPlaces.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.places = action.payload;
            })
            .addCase(fetchPlaces.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default placesSlice.reducer