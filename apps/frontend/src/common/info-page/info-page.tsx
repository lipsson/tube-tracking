import { Box, Card, CardHeader, Divider, Grid, Typography } from '@mui/material'
import { FC } from 'react'

export const InfoPage: FC<{
    title: string, infoData: {
        title: string;
        desc: JSX.Element | string;
    }[]
}> = ({ title, infoData }) => {
    return (
        <Card sx={{ minHeight: 220 }}>
            <CardHeader title={title} />
            <Divider />
            <Box p={2}>
                <Grid container spacing={0}>
                    {infoData.map((info) => (
                        <Grid key={info.title} item xs={12} sm={4}>
                            <Box p={3} display="flex" alignItems="center">
                                <Box>
                                    <Typography variant="h6" gutterBottom sx={{ fontSize: 12 }}>
                                        {`${info.title}:`}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 700 }} flexWrap={'wrap'} gutterBottom>
                                        {info.desc}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Card>
    )
}
