import { StatusEnum } from "../types/statuses.types";

export class UpdateSampleDto {
    name: string;
    patientId: string;
    buildingId: string;
    archiveBuildingIds: Array<string>;
    labWorkers: Array<string>;
    status: StatusEnum;
};