import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CitiesList from 'components/CitiesList';
import CityBar from 'components/CityBar';
import WeatherSection from 'components/WeatherSection';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(1),
    },
    card: {
        marginTop: theme.spacing(2),
    },
}));

function Root() {
    const classes = useStyles();
    const [selectedCity, setSelectedCity] = React.useState<string | null>(null);

    const handleListItemClick = (city: string | null) => {
        setSelectedCity((prev) => (prev !== city ? city : null));
    };

    return (
        <div className="App">
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Weather app
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                        <WeatherSection name={selectedCity} />
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <CityBar />
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <CitiesList
                            handleListItemClick={handleListItemClick}
                            selectedCity={selectedCity}
                        />
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default Root;
