import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addReport = createAsyncThunk('reports/addReport', async (value) => {
    
    let dataQuery = JSON.stringify(value);
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://ads-management-backend.onrender.com/reportviolations/add`,
        headers:{
            "Authorization": 'Bearer' + ' ' + 'admin',
        },
        data: dataQuery
    };

    const rs = await axios.request(config);
    const data = await rs.data;
    return data;
});
export const fetchReports = createAsyncThunk('reports/fetchReports', async () => {
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://ads-management-backend.onrender.com/reportviolations`,
        headers:{
            "Authorization": 'Bearer' + ' ' + 'admin',
        },
        data: ''
    };

    const rs = await axios.request(config);
    const data = await rs.data;
    return data;
});


const reportsSlice = createSlice({
    name: 'reports',
    initialState: {
        reports: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReports.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReports.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reports = action.payload;
            })
            .addCase(fetchReports.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default reportsSlice.reducer