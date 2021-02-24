import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Alert from '@material-ui/lab/Alert';
import { removeCity, selectCities } from 'context/features/cities/citiesSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    handleListItemClick: (city: string | null) => void;
    selectedCity: string | null;
};

function CitiesList({ handleListItemClick, selectedCity }: Props) {
    const cities = useSelector(selectCities);
    const dispatch = useDispatch();

    const handleClickRemove = (city: string) => {
        if (city === selectedCity) {
            handleListItemClick(null);
        }
        dispatch(removeCity({ name: city }));
    };

    return (
        <List>
            {cities.length > 0 ? (
                cities.map((city) => (
                    <ListItem
                        button
                        selected={selectedCity === city}
                        onClick={() => handleListItemClick(city)}
                        key={city}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <LocationCityIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={city} />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                onClick={() => handleClickRemove(city)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))
            ) : (
                <Alert severity="info">Pusta lista dodaj nowe miasta</Alert>
            )}
        </List>
    );
}

export default CitiesList;
