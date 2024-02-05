import { Grid } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { GridHeaderStyle } from './styles/Dashboard.styles';
import { BuildingsPage } from './Buildings.page';
import { LabWorkersPage } from './LabWorkers.page';
import { SamplesPage } from './Samples.page';


export const DashboardUserPage = () => {
  const { t } = useTranslation();

  return (
    <Grid data-testid='dashb-admin' container sx={{ overflowY: 'auto', height: '100%', m: 0, width: '100%' }} flexDirection="column">
      <Grid container flexDirection="row">
        <Grid container flexBasis="100%" flexDirection="column" flexGrow={1}>
          <GridHeaderStyle>{`${t('dashboard.dashboard')}:`}</GridHeaderStyle>

          <Grid
            px={2}
            marginTop={2}
            marginBottom={3}
            container
            flexDirection="row"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid
              data-testid="dashboard-buildings"
              flexGrow={1}
              flexBasis="50%"
              item
              mt={2}
              borderRadius={2}
              sx={{ minWidth: 515 }}
            >
              <BuildingsPage />
            </Grid>
            <Grid
              data-testid="dashboard-lab-workers"
              item
              flexBasis="50%"
              flexGrow={1}
              mt={2}
              borderRadius={2}
              sx={{ minWidth: 515 }}
            >
              <LabWorkersPage />
            </Grid>
            <Grid
              data-testid="dashboard-samples"
              item
              flexBasis="100%"
              flexGrow={1}
              mt={2}
              borderRadius={2}
              sx={{ minWidth: 515 }}
            >
              <SamplesPage />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
