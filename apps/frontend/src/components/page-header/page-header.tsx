import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import { Helmet } from 'react-helmet-async';
import { PageTitleWrapper } from '../page-title-wrapper/page-title-wrapper';
import { HeaderType } from '../types/header.types';
import { BackToList } from '@/common/back-to-list/back-to-list';

export const PageHeader = ({ header }: { header: HeaderType }) => {
    const { helmetText, title, subtitle, buttonHref, buttonText, disabled = false } = header;

    return (
        <>
            <Helmet>
                <title>{helmetText}</title>
            </Helmet>
            <PageTitleWrapper>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={3}>
                        <BackToList text="actions.backToList" to='/' />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography data-testid='page-header-title' variant="h3" align='center' component="h3" gutterBottom>
                            {title}
                        </Typography>
                        {subtitle && <Typography variant="subtitle2">{subtitle}</Typography>}
                    </Grid>
                    {buttonHref && buttonText &&
                        <Grid textAlign='right' item xs={3}>
                            <Button
                                disabled={disabled}
                                href={buttonHref}
                                sx={{ mt: { xs: 2, md: 0 } }}
                                variant="contained"
                                startIcon={<AddTwoToneIcon
                                    fontSize="small" />}
                            >
                                {buttonText}
                            </Button>
                        </Grid>}
                </Grid>
            </PageTitleWrapper>
        </>
    )
}
