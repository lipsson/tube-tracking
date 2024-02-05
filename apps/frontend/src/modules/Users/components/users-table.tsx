import { useMemo, useState } from "react";
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";
import { ChipStatuses } from "@/common/chip-statuses/chip-statuses";
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useTable } from "@/common/tables/use-table";
import { Avatar, Card } from "@mui/material";
import { UsersActionModal } from "./users-actions";
import { Table } from "@/common/tables";
import { ActionsModalState } from "@/common/types/actions-modal-state";
import { NoData } from "@/common/no-data/no-data";
import { Loading } from "@/common/loading/loading";
import { UsersType } from "../types/users.types";
import { checkIfForbidden } from "../utils/check-if-forbidden";

export const UsersTable = ({ data, isLoading }: { data: UsersType[] | undefined, isLoading: boolean }) => {
  const { t } = useTranslation();
  const { sortModel, ...tableData } = useTable({ pageSize: 50, sortModel: ['category', 'asc'] });
  const [actionsModalState, setActionsModalState] = useState<ActionsModalState>({
    displayedModal: 'NONE',
  });

  const hideActionModal = () => {
    setActionsModalState({ displayedModal: 'NONE' });
  };

  const usersColumns = useMemo<GridColumns<UsersType>>(
    () => [
      {
        field: 'name',
        headerName: t('input.name'),
        flex: 1.4,
      },
      {
        field: 'email',
        headerName: t('input.email'),
        align: 'center',
        flex: 1,
      },
      {
        field: 'isAdmin',
        headerName: t('input.isAdmin'),
        align: 'center',
        flex: 1,
        renderCell: ({ row }) =>
          ChipStatuses({
            value: row.isAdmin,
            textSuccess: t('actions.yes'),
            textDecline: t('actions.no'),
          }),
      },
      {
        field: 'avatar',
        headerName: t('input.avatar'),
        align: 'center',
        flex: 1,
        renderCell: ({ row }) => <Avatar variant="rounded" alt={row.name} src={row?.avatar ?? '/assets/images/avatar.png'} />
      },
      {
        field: 'options',
        headerName: t('actions.options'),
        type: 'actions',
        width: 80,
        headerAlign: 'center',
        align: 'center',
        getActions: ({ row }) => checkIfForbidden(row._id) ? [
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
          />,
        ] : [],
      },
    ],
    [t],
  );

  if (!data) {
    return <NoData title={t('sidebar.users')} description={t('actions.noData')} />
  };

  if (isLoading) {
    <Loading />
  }

  return (
    <Card data-testid='table-users'>
      <Table
        {...tableData}
        isLoading={isLoading}
        count={data?.length || 0}
        columns={usersColumns}
        rows={data}
        density="standard"
        isExportToolbarVisible={false}
        noRowsOverlayText={t('actions.noData')}
        disableSelectionOnClick />
      <UsersActionModal state={actionsModalState} onClose={hideActionModal} />
    </Card>
  );
};

