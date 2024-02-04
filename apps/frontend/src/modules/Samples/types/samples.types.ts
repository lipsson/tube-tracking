export type AddOrEditSamplesType = {
    name: string;
    patientId: string;
    buildingId: string;
    archiveBuildingIds: Array<string>;
    labWorkers: Array<string>;
    status: number;
}

export type SamplesType = AddOrEditSamplesType & {
    _id: string;
    updatedAt: string;
};