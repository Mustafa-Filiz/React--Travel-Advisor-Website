import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import Header from './components/Header';
import Map from './components/Map';
import List from './components/List';
import { useEffect, useState } from 'react';
import { getPlacesData } from './api/TravelAdvisorApi';

function App() {
    const [type, setType] = useState('restaurants');
    const [isLoading, setIsLoading] = useState(false);
    const [places, setPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);
    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState(null);

    useEffect(() => {
        if (bounds) {
            setIsLoading(true);
            getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
                setPlaces(
                    data.filter((place) => place.name && place.num_reviews > 0)
                );
                setIsLoading(false);
            });
        }
    }, [type, setPlaces, bounds]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setCoords({ lat: latitude, lng: longitude });
            }
        );
    }, []);

    return (
        <Box className="App">
            <Header />
            <Grid container sx={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        type={type}
                        setType={setType}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        places={places}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        places={places}
                        coords={coords}
                        setBounds={setBounds}
                        setCoords={setCoords}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default App;
