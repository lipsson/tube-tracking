export type AddOrEditBuildingType = {
    name: string;
    city: string;
    geolocation: [string, string];
    isInUse: boolean;
}

export type BuildingType = AddOrEditBuildingType & {
    _id: string;
    updatedAt: string;
};