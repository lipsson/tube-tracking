/* eslint-disable @typescript-eslint/ban-ts-comment,no-console */
import { plPL, enUS, GridRowClassNameParams, GridRowParams, GridSelectionModel, DataGrid } from '@mui/x-data-grid';
import { GridRowId, GridValidRowModel } from '@mui/x-data-grid/models/gridRows';
import { DataGridProps } from '@mui/x-data-grid/models/props/DataGridProps';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { ClickAwayListener } from '@mui/material';
import { useCurrentLanguage } from '@/common/hooks/use-current-language';
import { TableNoRowsOverlay } from './components/table-no-rows-overlay/table-no-rows-overlay';

type Props<R> = {
  isExportToolbarVisible: boolean;
  isLoading: boolean;
  count: number;
  noRowsOverlayText?: string;
  getRowClassName?: (params: GridRowClassNameParams) => string;
  getRowId?: (row: R) => string;
  onRowClick?: (params: GridRowParams) => void;
  disableSelectionOnClick?: boolean;
  sortingMode?: 'server' | 'client';
  autoHeight?: boolean;
  height?: string;
  filtersHeight?: number;
  hideFooterPagination?: boolean;
  selectionFromComponent?: GridSelectionModel;
  setSelectionFromComponent?: Dispatch<SetStateAction<GridSelectionModel>>;
};

type Id = { _id: string } | { id: string };

export const Table = <R extends GridValidRowModel & Id>(props: DataGridProps<R> & Props<R>) => {
  const {
    isExportToolbarVisible,
    noRowsOverlayText,
    getRowId,
    page,
    count,
    isLoading,
    disableSelectionOnClick,
    autoHeight,
    height,
    filtersHeight,
    hideFooterPagination,
    selectionFromComponent,
    ...rest
  } = props;

  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const currentLanguage = useCurrentLanguage();

  const ref = useRef<HTMLDivElement>(null);
  const locale =
    currentLanguage === 'pl'
      ? plPL.components.MuiDataGrid.defaultProps.localeText
      : enUS.components.MuiDataGrid.defaultProps.localeText;

  const handleClickAway = () => {
    setSelectionModel([]);
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
        document.querySelector('.MuiDataGrid-virtualScroller')!.scrollTop = Math.max(0, tableIndex) * 60;
      }
    }
  }, [props.rows, ref, selectionModel]);

  return (
    <div
      style={{
        display: 'flex',
        height: autoHeight ? '100%' : height || `calc(100vh - 250px)`,
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <DataGrid
            {...rest}
            ref={ref}
            loading={isLoading}
            page={(page || 1) - 1}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            getRowId={(row) => getRowId?.(row) || row.uid || row._id}
            paginationMode="server"
            sortingMode={rest.sortingMode ?? 'server'}
            filterMode="server"
            headerHeight={45}
            rowHeight={40}
            rowCount={count}
            components={{
              ColumnSortedDescendingIcon: ExpandMoreIcon,
              ColumnSortedAscendingIcon: ExpandLessIcon,
              NoRowsOverlay: TableNoRowsOverlay,
            }}
            componentsProps={{
              noRowsOverlay: { text: noRowsOverlayText },
              toolbar: { exportCSV: isExportToolbarVisible },
            }}
            autoHeight={autoHeight}
            disableColumnMenu
            disableSelectionOnClick={disableSelectionOnClick || false}
            selectionModel={selectionModel}
            pagination
            hideFooterPagination={hideFooterPagination}
            editMode="row"
            rowsPerPageOptions={[50, 75, 100]}
            localeText={locale}
            sx={{ zIndex: 0 }}
            hideFooterSelectedRowCount
            // https://mui.com/x/react-data-grid/virtualization/#disable-virtualization
            disableVirtualization={false}
          />
        </ClickAwayListener>
      </div>
    </div>
  );
};
