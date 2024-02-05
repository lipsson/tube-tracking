import { StatusEnum } from "../types/statuses.types";

export class CreateSampleDto {
    name: string;
    patientId: string;
    buildingId: string;
    archiveBuildingIds: Array<string>;
    labWorkers: Array<string>;
    status: StatusEnum;
};