export type AddOrEditBuildingType = {
    name: string;
    city: string;
    geolocation: [string | number, string | number];
    isInUse: boolean;
}

export type BuildingType = AddOrEditBuildingType & {
    _id: string;
    updatedAt?: string;
};