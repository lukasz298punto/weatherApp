import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { selectWeatherInfo } from 'context/features/weatherInfo/weatherInfoSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sagaActions } from 'saga';

type Props = { name: string | null };

function WeatherSection({ name }: Props) {
    const dispatch = useDispatch();
    const weatherInfo = useSelector(selectWeatherInfo);

    useEffect(() => {
        dispatch({ type: sagaActions.STOP_SYNC });
        if (name) {
            dispatch({ type: sagaActions.SYNC, payload: { name } });
        }
    }, [name, dispatch]);

    if (!name) {
        return (
            <Alert severity="info">Zaznacz miasto aby zobaczyć pogode</Alert>
        );
    }

    if (weatherInfo?.error) {
        return (
            <Alert severity="error">
                Brak informacji o pogodzie dla danego maista
            </Alert>
        );
    }

    if (!weatherInfo?.icon && !weatherInfo?.main && !weatherInfo?.description) {
        return <CircularProgress color="secondary" />;
    }

    return (
        <>
            <Typography color="textSecondary" gutterBottom>
                Pogoda dla {name}
            </Typography>
            <Typography variant="h5" component="h2"></Typography>
            <Typography color="textSecondary">
                {weatherInfo?.icon && (
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherInfo?.icon}@2x.png`}
                        alt="pogoda"
                    />
                )}
            </Typography>
            <Typography variant="body2" component="p">
                <strong>Description: </strong>
                {weatherInfo?.description}
            </Typography>
            <Typography variant="body2" component="p">
                <strong>Main: </strong>
                {weatherInfo?.main}
            </Typography>
        </>
    );
}

export default WeatherSection;
