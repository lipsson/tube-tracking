import { Grid, Container } from '@mui/material';

import { SampleDetalisData } from '../components/sample-details-data';

export default function SamplesDetails() {
    return (
        <Container maxWidth="lg" sx={{ my: 2 }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
            >
                <Grid item xs={12}>
                    <SampleDetalisData />
                </Grid>
            </Grid>
        </Container>
    );
};
