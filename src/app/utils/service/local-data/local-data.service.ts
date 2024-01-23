import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  private readonly dataBase: string = 'my.db';

  constructor(private sqlite: SQLite, private db: Promise<SQLiteObject>) {
    this.db = this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });
  }

  public findAll(table: string) {
    return this.db
      .then((transaction: SQLiteObject) => {
        return transaction.executeSql(`select * from ${table}`);
      })
      .catch(error => {
        throw 'Transaction ERROR: ' + error.message;
      });
  }

  public findOne(table: string, where: any = []) {
    let whereString = '';
    if (where.length > 0) {
      whereString =
        ' WHERE ' +
        Object.keys(where)
          .map(value => `${value} = ?`)
          .join(' and ');
    }

    return this.db
      .then((transaction: SQLiteObject) => {
        const sql: string = `select * from ${table} ${whereString}`;
        console.log({ sql });
        return transaction.executeSql(sql);
      })
      .catch(error => {
        throw 'Transaction ERROR: ' + error.message;
      });
  }

  public createTableIfNoExist(table: string, columns: string[]): void {
    const columnsJoin: string = columns.join(', ');
    this.db
    .then((transaction: SQLiteObject) => {
      const sql: string = `CREATE TABLE IF NOT EXISTS ${table} (${columnsJoin})`;
      console.log({ sql });
      return transaction.executeSql(sql);
    })
    .catch(error => {
      throw 'Transaction ERROR: ' + error.message;
    });
  }
}
