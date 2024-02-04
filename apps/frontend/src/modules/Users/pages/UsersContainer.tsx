import { Grid, Container } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/page-header/page-header';
import { HeaderType } from '@/components/types/header.types';
import { UsersData } from '../components/users-data';

export const UsersContainer = () => {
  const { t } = useTranslation();
  const header: HeaderType = {
    title: t('sidebar.users'),
    helmetText: `${t('sidebar.users')}: ${t('dashboard.list')}`,
    buttonHref: '#',
    buttonText: `${t('actions.add')} ${t('input.newUser')}`,
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
            <UsersData />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
