import { SxProps, Theme } from "@mui/material";

export type BackToListProps = {
    to: string;
    text?: string;
    sx?: SxProps<Theme>;
    className?: string;
};