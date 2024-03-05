import { ReactNode } from "react";

export interface RouteConfig {
    id: string;
    title: string;
    sort: number;
    path: string;
    element: ReactNode;
    isIndex?: boolean;
    hidden?: boolean;
}