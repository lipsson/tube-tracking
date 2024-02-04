import { useMemo, useState } from "react";
import { SamplesType } from "../types/samples.types"
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";
import { ChipStatuses } from "@/common/chip-statuses/chip-statuses";
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useTable } from "@/common/tables/use-table";
import { Card } from "@mui/material";
import { SamplesActionModal } from "./samples-actions";
import { Table } from "@/common/tables";
import { ActionsModalState } from "@/common/types/actions-modal-state";
import { NoData } from "@/common/no-data/no-data";
import { Loading } from "@/common/loading/loading";
import { StatusArray } from "../utils/status-array";
import { LinkToAction } from "@/common/link-to-action/link-to-action";
import { useLocation } from "react-router-dom";
import { BuildingType } from "@/modules/Buildings/types/buildings.types";
import { LabWorkersType } from "@/modules/LabWorkers/types/lab-workers.types";
import { useAuthState } from "@/auth";
export const SamplesTable = ({ data, buildingsList, labWorkers, isLoading }:
  {
    data: SamplesType[] | undefined,
    buildingsList: BuildingType[],
    labWorkers: LabWorkersType[],
    isLoading: boolean
  }) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const { user } = useAuthState();

  const { sortModel, ...tableData } = useTable({ pageSize: 50, sortModel: ['category', 'asc'] });
  const [actionsModalState, setActionsModalState] = useState<ActionsModalState>({
    displayedModal: 'NONE',
  });

  const hideActionModal = () => {
    setActionsModalState({ displayedModal: 'NONE' });
  };

  const samplesColumns = useMemo<GridColumns<SamplesType>>(
    () => [
      {
        field: 'name',
        headerName: t('input.name'),
        flex: 1.2,
      },
      {
        field: 'patientId',
        headerName: t('input.patientId'),
        align: 'center',
        flex: 0.5,
      },
      {
        field: 'buildingId',
        headerName: t('input.nameBuilding'),
        flex: 1,
        renderCell: ({ row }) => (
          buildingsList?.find(find => find._id === row.buildingId)?.name || `${t('ations.noData')}`
        )
      },
      {
        field: 'archiveBuildingIds',
        headerName: t('input.archivalBuildings'),
        flex: 1,
        renderCell: ({ row }) => {
          const buildings = buildingsList?.filter(filter => row.archiveBuildingIds.includes(filter._id)) || [];
          return buildings.map((b, i) => `${b.name}${i !== buildings.length - 1 ? ', ' : ''}`)
        }
      },
      {
        field: 'labWorkers',
        headerName: t('input.labWorkers'),
        flex: 1,
        renderCell: ({ row }) => {
          const workers = labWorkers?.filter(filter => row.labWorkers.includes(filter._id)) || [];
          return workers.map((lw, i) => `${lw.firstName.substring(0, 1)}. ${lw.surname}${i !== workers.length - 1 ? ', ' : ''}`)
        },
      },
      {
        field: 'status',
        headerName: t('input.status'),
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        renderCell: ({ row }) =>
          ChipStatuses({
            value: StatusArray[row.status] || 'draft',
            textSuccess: `${t(`status.${StatusArray[row.status] || 'draft'}`)}`,
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
          user !== null ? <LinkToAction
            key="details"
            linkTo={`/samples/${row._id}`}
            dataTestId={`sample-details-actions-${row._id}`}
            search={search}
          /> : <div />,
          <GridActionsCellItem
            key={`${row._id}-edit`}
            icon={<EditIcon color='info' fontSize="small" />}
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
    return <NoData title={t('sidebar.samples')} description={t('actions.noData')} />
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
        columns={samplesColumns}
        rows={data}
        density="standard"
        isExportToolbarVisible={false}
        noRowsOverlayText={t('actions.noData')}
      />
      <SamplesActionModal state={actionsModalState} onClose={hideActionModal} />
    </Card>
  );
};

