export type AddUsersType = {
    name: string;
    email: string;
    isAdmin: boolean;
    avatar?: string;
};

export type UsersType = AddUsersType & {
    _id: string;
    updatedAt: string;
};