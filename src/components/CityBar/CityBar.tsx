import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { addCity, selectCities } from 'context/features/cities/citiesSlice';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CityBar() {
    const cities = useSelector(selectCities);
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const ref = useRef<HTMLInputElement | null>(null);

    const handleClickAdd = () => {
        const value = ref?.current?.value;
        if (value) {
            if (cities.includes(value)) {
                setError('to miasto juz jest na liscie');
            } else {
                dispatch(addCity({ name: value }));
                setError('');
            }
        }
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={9}>
                <TextField
                    error={!!error}
                    fullWidth
                    id="standard-error-helper-text"
                    label="Miasto"
                    defaultValue=""
                    helperText={!!error ? error : ''}
                    variant="outlined"
                    inputRef={ref}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleClickAdd}
                >
                    Dodaj miasto
                </Button>
            </Grid>
        </Grid>
    );
}

export default CityBar;
