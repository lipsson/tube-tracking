import { useMemo, useState } from "react";
import { BuildingType } from "../types/buildings.types"
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";
import { ChipStatuses } from "@/common/chip-statuses/chip-statuses";
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useTable } from "@/common/tables/use-table";
import { Card } from "@mui/material";
import { BuildingActionModal } from "./buildings-actions";
import { Table } from "@/common/tables";
import { ActionsModalState } from "@/common/types/actions-modal-state";
import { NoData } from "@/common/no-data/no-data";
import { Loading } from "@/common/loading/loading";

export const BuildingsTable = ({ data, isLoading }: { data: BuildingType[] | undefined, isLoading: boolean }) => {
  const { t } = useTranslation();
  const { sortModel, ...tableData } = useTable({ pageSize: 50, sortModel: ['category', 'asc'] });
  const [actionsModalState, setActionsModalState] = useState<ActionsModalState>({
    displayedModal: 'NONE',
  });

  const hideActionModal = () => {
    setActionsModalState({ displayedModal: 'NONE' });
  };

  const buildingsColumns = useMemo<GridColumns<BuildingType>>(
    () => [
      {
        field: 'name',
        headerName: t('input.name'),
        flex: 1.4,
      },
      {
        field: 'city',
        headerName: t('input.city'),
        flex: 1,
      },
      {
        field: 'local',
        headerName: t('input.local'),
        flex: 1,
        renderCell: ({ row }) => (
          row.geolocation.toString()
        ),
      },
      {
        field: 'isInUse',
        headerName: `${t('input.isInUse')}?`,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        renderCell: ({ row }) =>
          ChipStatuses({
            value: row.isInUse,
            textSuccess: t('input.active'),
            textDecline: t('input.inactive'),
          }),
      },
      {
        field: 'options',
        headerName: t('actions.options'),
        type: 'actions',
        width: 80,
        headerAlign: 'center',
        align: 'center',
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={`${row._id}-edit`}
            icon={<EditIcon color="info" fontSize="small" />}
            label={t('actions.edit')}
            onClick={
              () =>
                setActionsModalState({
                  displayedModal: 'EDIT',
                  uid: row._id,
                })
            }
            placeholder={`${t('actions.edit')} ${row._id}`}
            showInMenu
          />,
          <GridActionsCellItem
            key={`${row._id}-delete`}
            icon={<DeleteIcon color="error" fontSize="small" />}
            label={t('actions.delete')}
            onClick={
              () =>
                setActionsModalState({
                  displayedModal: 'DELETE',
                  uid: row._id,
                })
              // eslint-disable-next-line react/jsx-curly-newline
            }
            placeholder={`${t('actions.delete')} ${row._id}`}
            showInMenu
          />,
        ],
      },
    ],
    [t],
  );

  if (!data) {
    return <NoData title={t('sidebar.buildings')} description={t('actions.noData')} />
  };

  if (isLoading) {
    <Loading />
  }

  return (
    <Card>
      <Table
        {...tableData}
        isLoading={isLoading}
        count={data?.length || 0}
        columns={buildingsColumns}
        rows={data}
        density="standard"
        isExportToolbarVisible={false}
        noRowsOverlayText={t('actions.noData')}
        disableSelectionOnClick />
      <BuildingActionModal state={actionsModalState} onClose={hideActionModal} />
    </Card>
  );
};

