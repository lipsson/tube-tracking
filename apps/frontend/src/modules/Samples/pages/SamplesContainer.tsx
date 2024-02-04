import { Grid, Container } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/page-header/page-header';
import { HeaderType } from '@/components/types/header.types';
import { SamplesData } from '../components/samples-data';

export const SamplesContainer = () => {
  const { t } = useTranslation();
  const header: HeaderType = {
    title: t('sidebar.samples'),
    helmetText: `${t('sidebar.samples')}: ${t('dashboard.list')}`,
    buttonHref: '#',
    buttonText: `${t('actions.add')} ${t('input.newSample')}`,
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
            <SamplesData />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
