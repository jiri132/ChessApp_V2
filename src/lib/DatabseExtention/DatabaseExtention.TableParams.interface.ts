import type { MySQLColumnType } from "./DatabaseExtention.MySQLColumn.type";

export interface TableParams {
    [columnName: string]: MySQLColumnType;
}

