import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private table: string = '';

  public setTable(tableName: string): void {
    this.table = tableName;
    this.initializeDatabase();
  }

  private initializeDatabase(): void {
    // En el caso de localStorage, no es necesario una inicialización
  }

  private getKey(): string {
    if (!this.table) {
      throw new Error('Table not initialized');
    }

    return `${this.table}`;
  }

  public addRecord(record: any): number {
    const key = this.getKey();
    let data: any[] = [];

    const existingData = localStorage.getItem(key);
    if (existingData) {
      data = JSON.parse(existingData);
    }
    data.push(record);

    localStorage.setItem(key, JSON.stringify(data));
    return data.length - 1;
  }

  public getRecordById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const key = this.getKey();
      const data = localStorage.getItem(key);

      if (data) {
        const records = JSON.parse(data);
        const record = records.find((r: any) => r.id === id);

        if (record) {
          resolve(record);
        } else {
          reject('Record not found');
        }
      } else {
        reject('Error retrieving records from localStorage');
        throw('Error retrieving records from localStorage');
      }
    });
  }

  public getRecordsByColumnValue(
    columnName: string,
    columnValue: any
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const key = this.getKey();
      const data = localStorage.getItem(key);

      if (data) {
        const records = JSON.parse(data);
        const filteredRecords = records.filter(
          (r: any) => r[columnName] === columnValue
        );
        resolve(filteredRecords);
      } else {
        reject('Error retrieving records from localStorage');
        throw('Error retrieving records from localStorage');
      }
    });
  }

  public findAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const key = this.getKey();
      const data = localStorage.getItem(key);

      if (data) {
        const records = JSON.parse(data);
        resolve(records);
      } else {
        reject('Error retrieving records from localStorage');
        throw('Error retrieving records from localStorage');
      }
    });
  }

  public async findOne(params?: {
    id?: number;
    where?: any;
    last?: boolean;
  }): Promise<any> {
    const data = await this.findAll();
    let id = 0;

    if (params?.id) {
      id = params.id;
    }
    if (params?.last) {
      id = data.length - 1;
    }
    return data[id];
  }

  public updateRecord(id: number, updatedData: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const key = this.getKey();
      console.log({ key });
      const data = localStorage.getItem(key);

      if (data) {
        const records = JSON.parse(data);

        if (records[id] !== undefined) {
          records[id] = updatedData;
          localStorage.setItem(key, JSON.stringify(records));
          resolve(records[id]);
        } else {
          reject('Record not found');
        }
      } else {
        reject('Error updating record in localStorage');
      }
    });
  }

  public createOrUpdate(record: any, searchColumn: string): number {
    const key = this.getKey();
    let data: any[] = [];

    const existingData = localStorage.getItem(key);
    if (existingData) {
      data = JSON.parse(existingData);

      const existingRecord = data.find(
        (r: any) => r[searchColumn] === record[searchColumn]
      );

      if (existingRecord) {
        Object.assign(existingRecord, record);
      } else {
        data.push(record);
      }
    } else {
      data.push(record);
    }

    localStorage.setItem(key, JSON.stringify(data));
    return data.length - 1;
  }

  public delete(id: number): void {
    const data = JSON.parse(localStorage.getItem(this.table) || '');
    localStorage.setItem(this.table, JSON.stringify(data.splice(id, 1)));
  }
}
