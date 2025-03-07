import { PatientsPersistenceService } from './../../../modules/datos/service/persistence/patients/patients-persistence.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(
    private readonly patientsPersistenceService: PatientsPersistenceService
  ) {}

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

  public addManyRecords(recods: any[]) {
    localStorage.setItem(this.getKey(), JSON.stringify(recods));
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
        throw 'Error retrieving records from localStorage';
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
        throw 'Error retrieving records from localStorage';
      }
    });
  }

  public async findAll(): Promise<any[]> {
    const key = this.getKey();
    if (key === 'patients') {
      return this.patientsPersistenceService.getAll();
    } else {
      return new Promise((resolve, reject) => {
        const data = localStorage.getItem(key);
        if (data) {
          const records = JSON.parse(data);
          resolve(records);
        } else {
          resolve([]);
        }
      });
    }
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

      const index = data.findIndex(
        (r: any) => r[searchColumn] === record[searchColumn]
      );

      if (index > -1) {
        data[index] = record;
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
    const table = localStorage.getItem(this.table);

    if (table) {
      const data = JSON.parse(table);
      localStorage.setItem(this.table, JSON.stringify(data.splice(id, 1)));
    }
  }

  public truncateTable(tableName: string): void {
    localStorage.removeItem(tableName);
  }

  public deleteAll(): void {
    localStorage.removeItem(this.table);
  }
}
