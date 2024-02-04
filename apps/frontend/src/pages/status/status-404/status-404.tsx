import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  InputAdornment
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';


import { ButtonSearch, MainContent, OutlinedInputWrapper } from '@/common/styles/main-content.styles';
import { useTranslation } from 'react-i18next';


export default function Status404() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src="/assets/status/404.svg" />
            <Typography variant="h2" sx={{ my: 2 }}>
              {t('apiResponse.error.404')}
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInputWrapper
                  type="text"
                  placeholder={`${t('action.searchInfo')}...`}
                  endAdornment={
                    <InputAdornment position="end">
                      <ButtonSearch variant="contained" size="small">
                        {t('action.search')}
                      </ButtonSearch>
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Divider sx={{ my: 4 }}>OR</Divider>
              <Button href="/overview" variant="outlined">
                {t('actions.backToList')}
              </Button>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
};
