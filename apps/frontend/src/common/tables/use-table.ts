import { GridFilterModel } from '@mui/x-data-grid/models/gridFilterModel';
import { GridSortDirection, GridSortModel } from '@mui/x-data-grid/models/gridSortModel';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type UseTableDefaults = {
  page: number;
  pageSize: number;
  sortModel: [string, GridSortDirection];
  filterModel: GridFilterModel;
};

export const useTable = (defaults: Partial<UseTableDefaults> = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, onPageChange] = useState<number>(
    Number(searchParams.get('page')) ? Number(searchParams.get('page')) - 1 : defaults.page || 0,
  );
  const [pageSize, onPageSizeChange] = useState(Number(searchParams.get('pageSize')) || defaults.pageSize || 50);
  const [sortModel, onSortChange] = useState<[string, GridSortDirection] | undefined>(defaults.sortModel);
  const [filterModel, onFilterModelChange] = useState<GridFilterModel | undefined>(defaults.filterModel);

  const onSortModelChange = (model: GridSortModel) => {
    const currentSort = model[0];

    if (!currentSort) {
      onSortChange(undefined);
      return;
    }
    onSortChange([currentSort.field, currentSort.sort]);
  };

  const handlePageChange = (pageNumber: number) => {
    if (!pageNumber) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', (pageNumber + 1)?.toString());
    }
    setSearchParams(searchParams, { replace: true });
    onPageChange(pageNumber);
  };

  const handlePageSizeChange = (pageSizeNumber: number) => {
    if (pageSizeNumber === 50) {
      searchParams.delete('pageSize');
    } else {
      searchParams.set('pageSize', pageSizeNumber?.toString());
    }

    setSearchParams(searchParams, { replace: true });
    onPageSizeChange(pageSizeNumber);
  };

  return {
    filterModel,
    onFilterModelChange,
    sortModel,
    onSortModelChange,
    pageSize,
    page: page + 1,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
  };
};
