import axios from 'axios';
import {} from 'child_process';
import {
    fetchData,
    resetData,
    setError,
} from 'context/features/weatherInfo/weatherInfoSlice';
import {
    call,
    cancel,
    cancelled,
    delay,
    fork,
    put,
    take,
    takeEvery,
} from 'redux-saga/effects';

export const sagaActions = {
    SYNC: 'SYNC',
    STOP_SYNC: 'STOP_SYNC',
};

type ActionType = { payload: { name: string }; type: string };

const TEN_SECONDS = 10000;

async function callAPI(name: string) {
    return await axios.get(
        `${process.env.REACT_APP_API_URL}?q=${name}&appid=${process.env.REACT_APP_API_KEY}`
    );
}

function* sync(name: string) {
    try {
        while (true) {
            let result = yield call(() => callAPI(name));
            yield put(fetchData(result.data.weather[0]));
            yield delay(TEN_SECONDS);
        }
    } catch (e) {
        yield put(setError(e?.message || 'city not found'));
    } finally {
        if (yield cancelled()) yield put(resetData());
    }
}

function* main({ payload }: ActionType) {
    const syncTask = yield fork(sync, payload.name);

    yield take(sagaActions.STOP_SYNC);
    yield cancel(syncTask);
}

export default function* rootSaga() {
    yield takeEvery(sagaActions.SYNC, main);
}
