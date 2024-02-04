import { AddUsersType } from "@/modules/Users/types/users.types";

export type ActionsModalState =
    | {
        displayedModal: 'ADD';
        newUser: AddUsersType,
    }
    | {
        displayedModal: 'EDIT';
        uid: string
    }
    | {
        displayedModal: 'DELETE';
        uid: string
    }
    | { displayedModal: 'NONE' };