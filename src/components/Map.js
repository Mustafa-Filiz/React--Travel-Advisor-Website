import { LocationOnRounded } from '@mui/icons-material';
import { Paper, Rating, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import GoogleMapReact from 'google-map-react';
import React from 'react';
import defaultImage from '../img/defaultImage.jpg';

const useStyles = makeStyles((theme) => ({
    mapContainer: {
        height: '85vh',
        width: '100%',
    },
    paper: {
        width: 100,
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        padding: 5,
    },
    typography: {},
    cardImg:{
        width: 100,
        height: 100,
        cursor: "pointer"
    }
}));

function Map({ places, coords, setBounds, setCoords, setChildClicked }) {
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
                onChange={(e) => {
                    setCoords({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={child => setChildClicked(child)}
            >
                {places.length &&
                    places.map((place, index) => (
                        <Box
                            lat={place.latitude}
                            lng={place.longitude}
                            key={index}
                        >
                            <LocationOnRounded color="error" fontSize="large" />
                            <Paper className={classes.paper}>
                                <Typography className={classes.typography}>
                                    {place.name}
                                </Typography>
                                <img className={classes.cardImg} src={place.photo ? place.photo.images.large.url : defaultImage} alt="" />
                                <Rating value={Number(place.rating)} readOnly size="small" />
                            </Paper>
                        </Box>
                    ))}
            </GoogleMapReact>
        </Box>
    );
}

export default Map;
