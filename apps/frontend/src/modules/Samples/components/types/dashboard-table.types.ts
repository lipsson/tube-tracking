import { ReactNode } from "react";

export type ExpectedExtenderType = Record<string, any>;
export type Props<T extends ExpectedExtenderType> = {
    total: number;
    title: string;
    color: string;
    getLink?: (row: T) => string;
    rows: T[];
    icon?: string;
    linkToTable?: string;
    columns: {
        [Key in keyof T]?: {
            header: (column: Key) => ReactNode;
            row: (row: T) => ReactNode;
            align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
        };
    };
};