import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { deleteCookie, setCookie } from "cookies-next"
import http from "../../libs/http"
import { Cookies } from "react-cookie"

const backendURL = "http://localhost:3000"

const initialState = {
    loading: false,
    userInfo: null,
    userToken: null,
    isAuthenticated: null,
    error: null,
}

export const registerUser = createAsyncThunk(
    "auth/signup",
    async (payload, thunkAPI) => {
        const { username, email, password } = payload
        try {
            await http.post(`${backendURL}/auth/signup`, {
                username,
                email,
                password,
            })
            return { success: true }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data.message || error.message
            )
        }
    }
)

export const authenticateUser = createAsyncThunk(
    'auth/verify',
    async (_, { rejectWithValue }) => {
        try {
            const cookies = new Cookies();
            const accessToken = cookies.get('userToken');

            if (!accessToken) {
                return rejectWithValue(false);
            }
            const response = await http.get(`${backendURL}/auth/verify`);

            return { ...response.data, accessToken };
        } catch (e) {
            
            return rejectWithValue('');
        }
    }
);

export const userLogin = createAsyncThunk(
    "auth/login",
    async (payload, thunkAPI) => {
        const { email, password } = payload
        try {
            const response = await http.post(`${backendURL}/auth/login`, {
                email,
                password,
            })
            const { token, user } = response.data.data;
            const cookies = new Cookies()
            cookies.set("userToken", token, {
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
                sameSite: "Strict",
            })

            return { user, token }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data.message || error.message
            )
        }
    }
)

export const userLogout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const cookies = new Cookies()
            cookies.remove("userToken", { path: "/" })
            return {}
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data.message || error.message
            )
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(userLogin.pending, (state) => {
                state.loading = true
                state.error = null
                state.isAuthenticated = false
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userInfo = payload.user
                state.userToken = payload.token
                state.isAuthenticated = true
            })
            .addCase(userLogin.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
                state.isAuthenticated = false
            })
            .addCase(userLogout.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.loading = false
                state.userInfo = null
                state.userToken = null
                state.isAuthenticated = false
            })
            .addCase(userLogout.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
            .addCase(authenticateUser.fulfilled, (state) => {
          
            
                state.loading = false
                state.isAuthenticated = true
            })
            .addCase(authenticateUser.rejected, (state) => {
                state.loading = false
                state.token = null
                state.isAuthenticated = false
            })
    },
})

export default authSlice.reducer
