import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";

export const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.grey[100],
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const EmptyTableRow = styled(TableRow)(() => ({
    display: 'table-row',
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));