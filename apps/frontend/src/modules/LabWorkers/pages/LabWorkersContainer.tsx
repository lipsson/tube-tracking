import { Grid, Container } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/page-header/page-header';
import { HeaderType } from '@/components/types/header.types';
import { LabWorkersData } from '../components/lab-workers-data';


export const LabWorkersContainer = () => {
  const { t } = useTranslation();
  const header: HeaderType = {
    title: t('sidebar.labWorkers'),
    helmetText: `${t('sidebar.labWorkers')}: ${t('dashboard.list')}`,
    buttonHref: '#',
    buttonText: `${t('actions.add')} ${t('input.newLabWorker')}`,
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
            <LabWorkersData />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
