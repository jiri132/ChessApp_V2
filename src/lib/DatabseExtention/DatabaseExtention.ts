import Database from "@tauri-apps/plugin-sql";
import type { TableParams } from "./DatabaseExtention.TableParams.interface";

class ExtendedDatabase { 
    url : string;
    can_connect : boolean = false; 
    
    constructor(_url : string) {
        this.url = _url;
        this.can_connect = this.ConnectionGuard();
    }
    
    ConnectionGuard() : boolean {
        Database.load(this.url)
            .then((db) => {
                return true;
            }
        )
        return false;
    }

    SelectTable<T>(tableName: string, variable?: string): Promise<T[]> {
        const url = this.url;
        const selectStatement = variable ? `SELECT ${variable}` : 'SELECT *';
    
        return new Promise<T[]>((resolve, reject) => {
            Database.load(url)
                .then((db: Database) => {
                    db.select<T[]>(`${selectStatement} FROM ${tableName}`)
                        .then((result: T[]) => {
                            resolve(result);
                        })
                        .catch((error: any) => {
                            reject(error);
                        });
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    RemoveTable(tableName: string, column?: number, row?: number): void {
        Database.load(this.url)
          .then((db: Database) => {
            let executeStatement : string = `DROP TABLE ${tableName}`;
            if (column !== undefined && row !== undefined) {
              // If column and row are provided, add appropriate conditions to the execute statement
              executeStatement += ` WHERE column = ${column} AND row = ${row}`;
            }
            db.execute(executeStatement);
          })
          .catch((error: any) => {
            console.error("An error occurred while removing the table:", error);
          });
    }
    
    private mapParamsToStrings(params: TableParams): { columns: string; values: string } {
        const columns = Object.keys(params).join(", ");
        const values = Object.values(params)
          .map((column) => {
            let value = column.type;
            if (column.notNull) {
              value += " NOT NULL";
            }
            if (column.defaultValue !== undefined) {
              value += ` DEFAULT '${column.defaultValue}'`;
            }
            if (column.unique) {
              value += " UNIQUE";
            }
            if (column.primaryKey) {
              value += " PRIMARY KEY";
            }
            if (column.autoIncrement) {
              value += " AUTO_INCREMENT";
            }
            if (column.checkCondition) {
              value += ` CHECK (${column.checkCondition})`;
            }
            if (column.foreignKey) {
              const { table, column: refColumn } = column.foreignKey;
              value += ` REFERENCES ${table} (${refColumn})`;
            }
            return value;
          })
          .join(", ");
    
        return { columns, values };
    }
    
    AppendTable(tableName: string, params: TableParams): void {
        const { columns, values } = this.mapParamsToStrings(params);
    
        Database.load(this.url)
          .then((db: Database) => {
            const executeStatement = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
            db.execute(executeStatement);
          })
          .catch((error: any) => {
            console.error("An error occurred while appending to the table:", error);
          });
    }
    
    CreateTable(tableName: string, params: TableParams): void {
        const { columns } = this.mapParamsToStrings(params);
    
        Database.load(this.url)
          .then((db: Database) => {
            const executeStatement = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;
            db.execute(executeStatement);
          })
          .catch((error: any) => {
            console.error("An error occurred while creating the table:", error);
          });
    }
    
    UpdateTable(tableName: string, params: TableParams): void {
        const setStatements = this.mapParamsToStrings(params);
    
        Database.load(this.url)
          .then((db: Database) => {
            const executeStatement = `UPDATE ${tableName} SET ${setStatements}`;
            db.execute(executeStatement);
          })
          .catch((error: any) => {
            console.error("An error occurred while updating the table:", error);
          });
    }
}

export default ExtendedDatabase;
