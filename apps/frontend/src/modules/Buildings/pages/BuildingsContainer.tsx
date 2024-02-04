import { Grid, Container } from '@mui/material';

import { BuildingsData } from '../components/buildings-data';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/page-header/page-header';
import { HeaderType } from '@/components/types/header.types';

export const BuildingContainer = () => {
  const { t } = useTranslation();
  const header: HeaderType = {
    title: t('sidebar.buildings'),
    helmetText: `${t('sidebar.buildings')}: ${t('dashboard.list')}`,
    buttonHref: '#',
    buttonText: `${t('actions.add')} ${t('input.newBuilding')}`,
    disabled: true,
  }
  return (
    <>
      <PageHeader header={header} />
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <BuildingsData />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
