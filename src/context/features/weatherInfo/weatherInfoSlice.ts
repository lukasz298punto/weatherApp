import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'context/store';

type WeatherInfoState = {
    description: string;
    icon: string;
    id: number;
    main: string;
    error: string;
};

const initialState: WeatherInfoState = {
    description: '',
    icon: '',
    id: 0,
    main: '',
    error: '',
};

export const weatherInfoSlice = createSlice({
    name: 'weatherInfo',
    initialState,
    reducers: {
        fetchData: (
            state,
            action: PayloadAction<Omit<WeatherInfoState, 'error'>>
        ) => {
            const { description, icon, id, main } = action.payload;
            state.description = description;
            state.icon = icon;
            state.id = id;
            state.main = main;
            state.error = '';
        },
        resetData: (state) => {
            state.description = '';
            state.icon = '';
            state.id = 0;
            state.main = '';
            state.error = '';
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { fetchData, resetData, setError } = weatherInfoSlice.actions;

export const selectWeatherInfo = (state: RootState) => state.weatherInfo;

export default weatherInfoSlice.reducer;
