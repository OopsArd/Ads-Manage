import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAds = createAsyncThunk('ads/fetchAds', async (id) => {
    let id_place = id;
    const d = {
        advertising_placement_id: id_place
    }
    let dataQuery = JSON.stringify(d);
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://ads-management-backend.onrender.com/advertisingBoard/${id_place}`,
        headers:{
            "Authorization": 'Bearer' + ' ' + 'admin',
        },
        data: dataQuery
    };

    const rs = await axios.request(config);

    console.log("ress fetch: ", rs)
    const data = await rs.data;
    console.log("data fetch: ", data)
    return data;
});


const adsSlice = createSlice({
    name: 'ads',
    initialState: {
        ads: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAds.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAds.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ads = action.payload;
            })
            .addCase(fetchAds.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default adsSlice.reducer