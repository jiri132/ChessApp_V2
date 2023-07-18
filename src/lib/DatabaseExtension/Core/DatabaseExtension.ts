import Database from "@tauri-apps/plugin-sql";
import type { TableParams, InputParams } from "./Interfaces/DatabaseExtension.TableParams.interface";
import type { Condition } from "./Interfaces/DatabaseExtension.Condition.interface";

class ExtendedDatabase { 
    url : string;
    selected_db : string;
    can_connect : Promise<boolean>; 
    

    constructor(_url : string, _db : string) {
        this.url = _url + _db;
        this.selected_db = _db;

        this.can_connect = this.ConnectionGuard();
    }
    
    async ConnectionGuard(): Promise<boolean> {
      try {
        const db = await Database.load(this.url);
        return true;
      } catch (error) {
        return false;
      }
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

    
    //#region Just some mapping functions
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
    private mappingToColVals(columns : string, values : string, between? : string) : string {
        const cols : string[] = columns.split(",");
        const vals : string[] = values.split(",");

        const combinedData: string[] = [];

        for (let i = 0; i < cols.length; i++) {
            if (between !== undefined )  {
                combinedData.push(`${cols[i]} ${between} ${vals[i]}`);
            }else {
            combinedData.push(`${cols[i]} ${vals[i]}`);

            }
        }

        const result: string = combinedData.join(",");

        return result;
    } 
    //#endregion


     /**
     * **Removing a Table or Data**
     *
     * A function used to remove data  or tables from the connected database form `url`
     *
     * This has been made as an layer on top of the easy to use tauri::database::api 
     * 
     * @example
     * ```ts
     * const db = new extendedDatabase("url","selected_db");
     * db.RemoveTable("exampleTable", column?: <location>, row?: <location>);
     * ```
     */
     RemoveTable(tableName: string, column?: number, row?: number): void {
      Database.load(this.url)
        .then((db: Database) => {
          let executeStatement : string = `DROP TABLE IF EXISTS ${tableName}`;
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

     /**
     * **Appending to Table**
     *
     * A function used to append data to the connected database form `url`
     *
     * This has been made as an layer on top of the easy to use tauri::database::api 
     * 
     * @example
     * ```ts
     * const db = new extendedDatabase("url","selected_db");
     * db.AppendTable("exampleTable", {columnName: "value", ...});
     * ```
     */
    AppendTable(tableName: string, params: InputParams): void {
        const columnNames = Object.keys(params).join(", ");
        const valueSets = Object.entries(params)
            .map(([column, value]) => {
                const formattedValue = typeof value === "string" ? `'${value}'` : value;
                return `${formattedValue}`;
            }
        ).join(", ");

        Database.load(this.url)
            .then((db: Database) => {
                    const executeStatement = `INSERT INTO ${tableName} (${columnNames}) VALUES (${valueSets})`;
                    console.log(executeStatement);
                    db.execute(executeStatement);
                }
            ).catch((error: any) => {
                console.error("An error occurred while appending to the table:", error);
            }
        );
    }
    

     /**
     * **Creating Table**
     *
     * A function used to create a brand new table to the connected database form `url`
     *
     * This has been made as an layer on top of the easy to use tauri::database::api 
     * 
     * @example
     * ```ts
     * const db = new extendedDatabase("url","selected_db");
     * db.CreateTable("exampleTable", {columnName: {type: <mysql type>}, ...})
     * ```
     */
    CreateTable(tableName: string, params: TableParams): void {
        const { columns,values } = this.mapParamsToStrings(params);
        const columnString = this.mappingToColVals(columns,values);

        Database.load(this.url)
          .then((db: Database) => {
            const executeStatement = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnString})`;
            db.execute(executeStatement);

            console.log("Succeeded in executing command: " + executeStatement);
        })
          .catch((error: any) => {
            console.error("An error occurred while creating the table:", error);
          });
    }

     /**
     * **Updating on Table**
     *
     * A function used to update an record with new values to the connected database form `url`
     *
     * This has been made as an layer on top of the easy to use tauri::database::api 
     * 
     * @example
     * ```ts
     * const db = new extendedDatabase("url","selected_db");
     * db.UpdateTable("exampleTable", {columnName: <string | number>, ...}, id)
     * ```
     */
    UpdateTable(tableName: string, params: InputParams, id : number): void {
        const paramStrings : string = Object.entries(params).map(([name, value]) => {
            if (typeof value === "string") {
                return `${name} = '${value}'`;
            } else {
                return `${name} = ${value}`;
            }
        }).join(", ")

        Database.load(this.url)
          .then((db: Database) => {
            const executeStatement = `UPDATE ${tableName} SET ${paramStrings} WHERE id = ${id}`;
            console.log(executeStatement)
            db.execute(executeStatement);
          })
          .catch((error: any) => {
            console.error("An error occurred while updating the table:", error);
          });
    }


    /**
     * **Login to account**
     *
     * A function used to look up if you're details are correctly put in as how the connected database form `url` has it.
     *
     * This has been made as an layer on top of the easy to use tauri::database::api 
     * 
     * @example
     * ```ts
     * const db = new extendedDatabase("url","selected_db");
     * db.Login("exampleTable", [{column: <columnName>, value: <string | number>, operator: <ComparisonOperator>}, ...])
     * ```
     */
    Login(tableName: string, conditions?: Condition[]): Promise<boolean> {
      const url = this.url;
      const selectStatement = conditions ? this.generateSelectStatementWithConditions(tableName,conditions) : 'SELECT 1';
  
      return new Promise<boolean>((resolve, reject) => {
        Database.load(url)
          .then((db: Database) => {
            db.select(selectStatement)
              .then((result : unknown) => {
                resolve(result.length > 0);
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
  
    private generateSelectStatementWithConditions(tableName :string,conditions: Condition[]): string {
      const conditionStatements = conditions.map((condition) => {
        const formattedValue = typeof condition.value === 'string' ? `'${condition.value}'` : condition.value;
        return `${condition.column} ${condition.operator} ${formattedValue}`;
      });
  
      return `SELECT 1 FROM ${tableName} WHERE ${conditionStatements.join(' AND ')}`;
    }

}

export default ExtendedDatabase;
