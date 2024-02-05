import { useMemo, useState } from "react";
import { LabWorkersType } from "../types/lab-workers.types"
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useTable } from "@/common/tables/use-table";
import { Card } from "@mui/material";
import { LabWorkersActionModal } from "./lab-workers-actions";
import { Table } from "@/common/tables";
import { ActionsModalState } from "@/common/types/actions-modal-state";
import { NoData } from "@/common/no-data/no-data";
import { Loading } from "@/common/loading/loading";
import { BuildingType } from "@/modules/Buildings/types/buildings.types";

export const LabWorkersTable = ({ data, buildingsList, isLoading }: { data: LabWorkersType[] | undefined, buildingsList: BuildingType[], isLoading: boolean }) => {
  const { t } = useTranslation();
  const { sortModel, ...tableData } = useTable({ pageSize: 50, sortModel: ['category', 'asc'] });
  const [actionsModalState, setActionsModalState] = useState<ActionsModalState>({
    displayedModal: 'NONE',
  });

  const hideActionModal = () => {
    setActionsModalState({ displayedModal: 'NONE' });
  };

  const labWorkersColumns = useMemo<GridColumns<LabWorkersType>>(
    () => [
      {
        field: 'firstName',
        headerName: t('input.name'),
        flex: 1.4,
      },
      {
        field: 'surname',
        headerName: t('input.city'),
        flex: 1,
      },
      {
        field: 'buildingId',
        headerName: t('input.building'),
        flex: 1,
        renderCell: ({ row }) => (
          buildingsList?.find((find) => find._id === row.buildingId)?.name
        ),
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
    <Card data-testid='table-labWorkers'>
      <Table
        {...tableData}
        isLoading={isLoading}
        count={data?.length || 0}
        columns={labWorkersColumns}
        rows={data}
        density="standard"
        isExportToolbarVisible={false}
        noRowsOverlayText={t('actions.noData')}
        disableSelectionOnClick />
      <LabWorkersActionModal state={actionsModalState} onClose={hideActionModal} />
    </Card>
  );
};

