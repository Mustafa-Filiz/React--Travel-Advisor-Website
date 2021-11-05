import {
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { createRef, useEffect, useState } from 'react';
import PlaceDetails from './PlaceDetails';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 25,
    },
    formControl: {
        margin: 10,
        minWidth: 120,
        marginBottom: 30,
    },
    loading: {
        width: '100%',
        height: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        height: '75vh',
        overflow: 'auto',
    },
}));

function List({ type, setType, isLoading, childClicked, places }) {
    const [elRefs, setElRefs] = useState([])
    const classes = useStyles();
    useEffect(() => {
        setElRefs((refs) => {
            return Array(places.length).fill().map((_, index) => refs[index] || createRef())
        })
    }, [places])
    return (
        <Box className={classes.container}>
            {isLoading ? (
                <Box className={classes.loading}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="placeType">Type:</InputLabel>
                        <Select
                            id="placeType"
                            variant="standard"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places &&
                            places.map((place, index) => {
                                return (
                                    <Grid item xs={12} key={index} ref={elRefs[index]} >
                                        <PlaceDetails place={place} placeRef={elRefs[index]} selected={Number(childClicked) === index} />
                                    </Grid>
                                );
                            })}
                    </Grid>
                </Box>
            )}
        </Box>
    );
}

export default List;
