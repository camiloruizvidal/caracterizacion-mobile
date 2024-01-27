import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private table: string | null = null;

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

  public addRecord(record: any): void {
    const key = this.getKey();
    let data: any[] = [];

    // Obtiene los datos existentes (si los hay) y agrega el nuevo registro
    const existingData = localStorage.getItem(key);
    if (existingData) {
      data = JSON.parse(existingData);
    }
    data.push(record);

    // Guarda los datos actualizados en localStorage
    localStorage.setItem(key, JSON.stringify(data));
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
      }
    });
  }
  
  public findByKey

  public updateRecord(id: number, updatedData: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const key = this.getKey();
      const data = localStorage.getItem(key);

      if (data) {
        const records = JSON.parse(data);
        const index = records.findIndex((r: any) => r.id === id);

        if (index !== -1) {
          records[index] = { ...records[index], ...updatedData };
          localStorage.setItem(key, JSON.stringify(records));
          resolve();
        } else {
          reject('Record not found');
        }
      } else {
        reject('Error updating record in localStorage');
      }
    });
  }

  public createOrUpdate(record: any, searchColumn: string): void {
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
  }
}
