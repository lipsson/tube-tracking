import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell, StyledTableRow, EmptyTableRow } from '@/modules/Samples/components/styles/dashboard-table.styles';
import { ExpectedExtenderType, Props } from '@/modules/Samples/components/types/dashboard-table.types';


export const DashboardTable = <T extends ExpectedExtenderType>(props: Props<T>) => {
    const { rows, columns, title, total, color, getLink, icon, linkToTable } = props;
    const theme = useTheme();
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <Grid
            container
            borderColor={theme.palette.primary.main}
            flexDirection="column"
            flexGrow={1}
            sx={{ height: '100%', boxShadow: '0px 0px 15px 0px #eee' }}
        >
            <Grid
                container
                px={2}
                py={1}
                item
                sx={{
                    color,
                    borderBottom: '2px solid',
                    cursor: 'pointer',
                }}
                onClick={() => navigate(linkToTable || '')}
            >
                {icon && <Typography sx={{ color, fontFamily: 'FontAwesome' }}>{icon}</Typography>}
                &nbsp;
                {title}
                <Box marginLeft="auto">
                    {t('dashboard.total')} {total}
                </Box>
            </Grid>
            <Paper sx={{ width: '100%', overflow: 'hidden', padding: 0 }}>
                <TableContainer sx={{ maxHeight: 600, overflowX: 'hidden' }}>
                    <Table stickyHeader aria-label="sticky dashboard table">
                        <TableHead>
                            <TableRow>
                                {Object.keys(columns).map((key) => (
                                    <StyledTableCell
                                        sx={{
                                            p: 1,
                                            lineHeight: 'initial',
                                            overflow: 'hidden',
                                            height: 60,
                                            minWidth: 75,
                                            whiteSpace: 'pre-wrap',
                                        }}
                                        key={key}
                                        align={columns[key as keyof typeof columns]?.align || 'left'}
                                    >
                                        {columns[key as keyof typeof columns]?.header(key)}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length ? (
                                rows.map((row) => (
                                    <StyledTableRow sx={{ height: 60 }} key={row.name} onClick={() => getLink ? navigate(getLink(row)) : '/'}>
                                        {Object.keys(columns).map((key) => (
                                            <StyledTableCell
                                                sx={{ p: 1 }}
                                                key={key}
                                                align={columns[key as keyof typeof columns]?.align || 'left'}
                                            >
                                                {columns[key as keyof typeof columns]?.row(row)}
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                ))
                            ) : (
                                <EmptyTableRow>
                                    <StyledTableCell colSpan={Object.keys(columns).length}>{t('dashboard.noResult')}</StyledTableCell>
                                </EmptyTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
};
