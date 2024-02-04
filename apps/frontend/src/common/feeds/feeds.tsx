import {
    Box,
    Typography,
    Card,
    CardHeader,
    Divider,
    Avatar,
    Grid,
} from '@mui/material';
import { FC } from 'react';

export const Feeds: FC<{
    title: string, feeds: {
        name: string;
        avatar: string;
    }[]
}> = ({ title, feeds }) => {

    return (
        <Card sx={{ minHeight: 220 }}>
            <CardHeader title={title} />
            <Divider />
            <Box p={2}>
                <Grid container spacing={0}>
                    {feeds.map((feed) => (
                        <Grid key={feed.name} item xs={12} sm={4} m={2}>
                            <Box p={3} display="flex" alignItems="center">
                                <Avatar src={feed.avatar} />
                                <Box pl={2}>
                                    <Typography variant="h4" gutterBottom>
                                        {feed.name}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Card>
    );
}

