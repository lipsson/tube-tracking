export class CreateBuildingDto {
    name: string;
    city: string;
    geolocation: [string, string];
    isInUse: boolean;
};