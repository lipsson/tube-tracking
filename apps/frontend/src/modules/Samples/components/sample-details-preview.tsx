import { Box, Button, Grid, Typography } from '@mui/material';
import { SamplesType } from '../types/samples.types';
import { NoData } from '@/common/no-data/no-data';
import { Loading } from '@/common/loading/loading';
import { useTranslation } from 'react-i18next';
import { LabWorkersType } from '@/modules/LabWorkers/types/lab-workers.types';
import { BuildingType } from '@/modules/Buildings/types/buildings.types';
import { TimelineSample } from '@/common/timeline/timeline';
import { Feeds } from '@/common/feeds/feeds';
import { InfoPage } from '@/common/info-page/info-page';
import { ChipStatuses } from '@/common/chip-statuses/chip-statuses';
import { StatusArray } from '../utils/status-array';
import { BackToList } from '@/common/back-to-list/back-to-list';


export const SampleDetalisPreview = ({ data, buildingsList, labWorkers, isLoading, action }: {
  data: SamplesType | undefined,
  buildingsList: BuildingType[],
  labWorkers: LabWorkersType[],
  isLoading: boolean,
  action: (action: "EDIT" | "DELETE" | "NONE") => void
}) => {
  const { t } = useTranslation();

  if (!data) {
    return <NoData title={t('sidebar.samples')} description={t('actions.noData')} />
  };

  if (isLoading) {
    <Loading />
  }

  const handleDelete = () => {
    action('DELETE')
  }

  const handleEdit = () => {
    action('EDIT')
  }

  const currentBuildings = data.archiveBuildingIds.concat(data.buildingId) || [];
  const dataArray = buildingsList.filter(building => currentBuildings.includes(building._id)).map(name => name.name);

  const labWorkersArray = labWorkers.filter(worker => data.labWorkers.includes(worker._id)).map(lab => ({ name: `${lab.firstName} ${lab.surname}`, avatar: lab.avatar || '/assets/images/scientist.png' }));

  const infoArray = [
    {
      title: t('input.patientId'),
      desc: data.patientId,
    },
    {
      title: t('input.status'),
      desc: ChipStatuses({
        value: StatusArray[data.status] || 'draft',
        textSuccess: `${t(`status.${StatusArray[data.status] || 'draft'}`)}`,
      }),
    },
    {
      title: t('input.updateAt'),
      desc: data.updatedAt || t('actions.noData')
    }
  ];

  return (
    <Grid container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      p={2}
      spacing={2}
      data-testid='sample-details-samples'
    >
      <Grid item xs={3}>
        <BackToList text="actions.backToList" to='/samples' sx={{ mb: 3 }} />
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={3} textAlign="right">
        <Button sx={{ mx: 1 }} variant="contained" onClick={handleEdit}>{t('actions.edit')}</Button>
        <Button sx={{ mx: 1 }} variant="contained" onClick={handleDelete}>{t('actions.delete')}</Button>
      </Grid>
      <Grid item xs={12}><Typography variant='h3' align='center' data-testid='title-sample-details'>{`${data.name} - id: ${data._id}`}</Typography></Grid>
      <Grid item xs={12}>
        <TimelineSample title={t('input.path')} dataArray={dataArray} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ m: 2 }}>
          <Feeds title={t('input.labWorkers')} feeds={labWorkersArray} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ m: 2 }}>
          <InfoPage infoData={infoArray} title={t('input.otherData')} />
        </Box>
      </Grid>
    </Grid>


  );
}

