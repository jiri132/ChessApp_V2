import type { MySQLColumnType } from "../Types/DatabaseExtension.MySQLColumn.type";

export interface TableParams {
    [columnName: string]: ColumnDefinition;
}
export interface InputParams {
    [columnName: string]:  string | number;
}

interface ColumnDefinition {
    type: MySQLColumnType;
    unique?: boolean;
    primaryKey?: boolean;
    autoIncrement?: boolean;
    notNull?: boolean;
    defaultValue?: any;
    checkCondition?: string;
    foreignKey?: ForeignKeyDefinition;
}
  
interface ForeignKeyDefinition {
    table: string;
    column: string;
}

