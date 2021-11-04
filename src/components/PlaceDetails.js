import { LocationOnRounded, Phone } from '@mui/icons-material';
import {
    Card,
    CardContent,
    CardMedia,
    Rating,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import defaultImage from '../img/defaultImage.jpg';

function PlaceDetails({ place }) {
    return (
        <Card elevation={8}>
            <CardMedia
                sx={{ height: 350 }}
                image={
                    place.photo ? place.photo.images.large.url : defaultImage
                }
                title={place?.name}
            />
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {place?.name}
                </Typography>
                <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    my={2}
                >
                    <Rating readOnly value={Number(place?.rating)} />
                    <Typography>
                        {place.num_reviews}{' '}
                        {place.num_reviews > 1 ? 'reviews' : 'review'}
                    </Typography>
                </Box>
                {place.address && (
                    <Typography
                        gutterBottom
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            marginBottom: 10,
                        }}
                    >
                        <LocationOnRounded />
                        {place.address}
                    </Typography>
                )}
                {place.phone && (
                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                    >
						<Phone />
						{place.phone}
					</Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default PlaceDetails;
