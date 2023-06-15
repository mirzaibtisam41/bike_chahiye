import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    myCreatedBikes: [],
    vendorList: []
}

const UserSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            if (token) state.token = token;
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.myCreatedBikes = [];
            state.vendorList = [];
        },
        setMyUsedBikes: (state, action) => {
            state.myCreatedBikes = action.payload;
        },
        setVendorsList: (state, action) => {
            state.vendorList = action.payload;
        },
    },
});

export const { setUserData, logoutUser, setMyUsedBikes, setVendorsList } = UserSlice.actions;

export default UserSlice.reducer;