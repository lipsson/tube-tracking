import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { DataGrid, plPL, enUS, GridRowClassNameParams, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import { GridRowId, GridValidRowModel } from '@mui/x-data-grid/models/gridRows';
import { DataGridProps } from '@mui/x-data-grid/models/props/DataGridProps';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ClickAwayListener } from '@mui/material';
import { useCurrentLanguage } from 'common/hooks/use-current-language';
import { TableNoRowsOverlay } from './components/table-no-rows-overlay/table-no-rows-overlay';
import { TableToolbar } from './components/table-toolbar/table-toolbar';

type Props<R> = {
  isLoading?: boolean;
  noRowsOverlayText?: string;
  getRowClassName?: (params: GridRowClassNameParams) => string;
  getRowId?: (row: R) => string;
  onRowClick?: (params: GridRowParams) => void;
  selectionFromComponent?: GridSelectionModel;
  setSelectionFromComponent?: Dispatch<SetStateAction<GridSelectionModel>>;
  pagination?: boolean;
};

type Id = { uid: string } | { id: string };

export const SimpleTable = <R extends GridValidRowModel & Id>(props: DataGridProps<R> & Props<R>) => {
  const {
    noRowsOverlayText,
    getRowId,
    isLoading,
    disableSelectionOnClick,
    selectionFromComponent,
    setSelectionFromComponent,
    pagination,
    ...rest
  } = props;

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const handleSelection = (newSelection: GridRowId[]) => {
    setSelectionModel(newSelection);
    setSelectionFromComponent?.(newSelection);
  };

  const currentLanguage = useCurrentLanguage();

  const locale =
    currentLanguage === 'pl'
      ? plPL.components.MuiDataGrid.defaultProps.localeText
      : enUS.components.MuiDataGrid.defaultProps.localeText;

  const ref = useRef<HTMLDivElement>(null);

  const handleClickAway = () => {
    handleSelection([]);
  };

  useEffect(() => {
    if (selectionFromComponent) {
      setSelectionModel(selectionFromComponent);
    }
  }, [selectionFromComponent]);

  useEffect(() => {
    if (selectionModel && selectionModel[0] && ref.current) {
      const tableIndex = props.rows.findIndex((row) => [row.id, row.uid].includes(selectionModel[0]));

      if (tableIndex > 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector('.MuiDataGrid-virtualScroller')!.scrollTop = Math.max(0, tableIndex) * 60;
      }
    }
  }, [props.rows, ref, selectionModel]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <DataGrid
            {...rest}
            ref={ref}
            loading={isLoading}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            getRowId={(row) => getRowId?.(row) || row.uid || row.id}
            paginationMode="client"
            sortingMode="client"
            filterMode="client"
            headerHeight={65}
            rowHeight={60}
            components={{
              ColumnSortedDescendingIcon: ExpandMoreIcon,
              ColumnSortedAscendingIcon: ExpandLessIcon,
              NoRowsOverlay: TableNoRowsOverlay,
              Toolbar: TableToolbar,
            }}
            componentsProps={{
              noRowsOverlay: { text: noRowsOverlayText },
            }}
            disableSelectionOnClick={disableSelectionOnClick || false}
            selectionModel={selectionModel}
            editMode="row"
            onSelectionModelChange={handleSelection}
            localeText={locale}
            sx={{ zIndex: 0 }}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            autoHeight
            disableColumnMenu
            hideFooterPagination={!pagination}
            hideFooterSelectedRowCount
            {...(pagination && {
              pageSize,
              onPageSizeChange: (newPage) => setPageSize(newPage),
              rowsPerPageOptions: [10, 25, 50],
              initialState: {
                pagination: {
                  pageSize: 10,
                },
              },
            })}
          />
        </ClickAwayListener>
      </div>
    </div>
  );
};
