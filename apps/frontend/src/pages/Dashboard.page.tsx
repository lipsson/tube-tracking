import { Grid } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { GridHeaderStyle } from './styles/Dashboard.styles';
import { SamplesPage } from './Samples.page';


export const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <Grid data-testid='dashb-no-auth' container sx={{ overflowY: 'auto', height: '100%', m: 0, width: '100%' }} flexDirection="column">
      <Grid container flexDirection="row">
        <Grid container flexBasis="100%" flexDirection="column" flexGrow={1}>
          <GridHeaderStyle>{`${t('sidebar.samples')}:`}</GridHeaderStyle>

          <Grid
            px={2}
            marginTop={2}
            marginBottom={6}
            container
            flexDirection="row"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid
              data-testid="samples"
              item
              flexBasis="50%"
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
