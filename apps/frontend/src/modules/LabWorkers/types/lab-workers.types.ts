export type AddOrEditLabWorkersType = {
    firstName: string;
    surname: string;
    buildingId: string;
    avatar?: string;
}

export type LabWorkersType = AddOrEditLabWorkersType & {
    _id: string;
    updatedAt: string;
};