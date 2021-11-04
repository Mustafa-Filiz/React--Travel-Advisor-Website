import { LocationOnRounded } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import GoogleMapReact from 'google-map-react';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    mapContainer: {
        height: '85vh',
        width: '100%',
    },
}));

function Map({ places, coords }) {
    const classes = useStyles();
    return (
        <Box className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={coords}
                defaultZoom={12}
                center={coords}
            >
                {places.length &&
                    places.map((place, index) => (
                        <Box
                            lat={place.latitude}
                            lng={place.longitude}
                            key={index}
                        >
                            <LocationOnRounded color="error" fontSize="large" />
                        </Box>
                    ))}
            </GoogleMapReact>
        </Box>
    );
}

export default Map;
