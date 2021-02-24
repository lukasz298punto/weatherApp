import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import citiesReducer from 'context/features/cities/citiesSlice';
import weatherInfoReducer from 'context/features/weatherInfo/weatherInfoSlice';
import createSagaMiddleware from 'redux-saga';
import saga from 'saga';

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
    reducer: {
        cities: citiesReducer,
        weatherInfo: weatherInfoReducer,
    },
    middleware,
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
