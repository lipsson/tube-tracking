import { useState } from 'react';
import {
  Box,
  Typography,
  Hidden,
  Container,
  Button,
  Grid
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { RefreshTwoTone } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { useTranslation } from 'react-i18next';
import { MainContent, GridWrapper } from '@/common/styles/main-content.styles';

export default function Status500() {
  const { t } = useTranslation();
  const [pending, setPending] = useState(false);
  function handleClick() {
    setPending(true);
  }

  return (
    <>
      <Helmet>
        <title>Status - 500</title>
      </Helmet>
      <MainContent>
        <Grid
          container
          sx={{ height: '100%' }}
          alignItems="stretch"
          spacing={0}
        >
          <Grid
            xs={12}
            md={6}
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">
              <Box textAlign="center">
                <img
                  alt="500"
                  height={260}
                  src="/static/images/status/500.svg"
                />
                <Typography variant="h2" sx={{ my: 2 }}>
                  {t('apiResponse.error.500')}
                </Typography>

                <LoadingButton
                  onClick={handleClick}
                  loading={pending}
                  variant="outlined"
                  color="primary"
                  startIcon={<RefreshTwoTone />}
                >
                  {t('actions.refresh')}
                </LoadingButton>
                <Button href="/overview" variant="contained" sx={{ ml: 1 }}>
                  {t('actions.backToList')}
                </Button>
              </Box>
            </Container>
          </Grid>
          <Hidden mdDown>
            <GridWrapper
              xs={12}
              md={6}
              alignItems="center"
              display="flex"
              justifyContent="center"
              item
            >
              <Container maxWidth="sm">
                <Box textAlign="center">
                  <Button href="/dashboard" size="large" variant="contained">
                    Dashboard
                  </Button>
                </Box>
              </Container>
            </GridWrapper>
          </Hidden>
        </Grid>
      </MainContent>
    </>
  );
};
