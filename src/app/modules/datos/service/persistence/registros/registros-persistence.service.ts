import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicPersistenceService {
  private dbName: string = 'dynamicDB';
  private key: string = 'records';
  private dbVersion: number = 1;
  private db: IDBDatabase | null = null;
  private searchField: string = '';

  constructor() {
    const mapeoExcel = localStorage.getItem('mapeo_excel');
    if (!mapeoExcel) {
      throw new Error('No se encontró el mapeo de Excel en localStorage');
    }
    this.initDB();
  }

  private initDB(): void {
    const mapeoExcel: any = JSON.parse(
      localStorage.getItem('mapeo_excel') || '{}'
    );
    const busqueda = mapeoExcel?.data?.mapeo?.find(
      (mapeo: any) => mapeo.esBusqueda
    );

    if (!busqueda?.columnaExcel) {
      throw new Error('No se encontró el campo de búsqueda en el mapeo');
    }

    this.searchField = busqueda.columnaExcel;

    const request = indexedDB.open(this.dbName, this.dbVersion);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;

      const store = db.createObjectStore(
        this.key,
        this.searchField
          ? { keyPath: this.searchField }
          : { autoIncrement: true }
      );

      if (this.searchField) {
        store.createIndex('by-search-field', this.searchField, {
          unique: false
        });
      }
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
    };

    request.onerror = (event: any) => {
      console.error('Error opening indexedDB', event.target.error);
    };
  }

  private waitForDB(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.db) {
        resolve();
      } else {
        const interval = setInterval(() => {
          if (this.db) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      }
    });
  }

  public async addRecords(records: any[]): Promise<void> {
    try {
      await this.waitForDB();
      if (this.db) {
        const transaction = this.db.transaction([this.key], 'readwrite');
        const store = transaction.objectStore(this.key);

        records.forEach(record => {
          const recordWithSearchField = {
            ...record,
            [this.searchField]: record[this.searchField]
          };
          store.add(recordWithSearchField);
        });
      } else {
        console.error('IndexedDB is not initialized.');
      }
    } catch (error) {
      console.error('Error saving data to IndexedDB:', error);
      throw error;
    }
  }

  public async searchByField(value: string): Promise<any[]> {
    try {
      await this.waitForDB();
      if (this.db) {
        const transaction = this.db.transaction([this.key], 'readonly');
        const store = transaction.objectStore(this.key);
        const index = store.index('by-search-field');
        const request = index.getAll(value);

        return new Promise<any[]>((resolve, reject) => {
          request.onsuccess = (event: any) => {
            resolve(event.target.result);
          };

          request.onerror = (event: any) => {
            console.error('Error in search:', event.target.error);
            reject(event.target.error);
          };
        });
      } else {
        console.error('IndexedDB is not initialized.');
        return [];
      }
    } catch (error) {
      console.error('Error in searchByField:', error);
      throw error;
    }
  }

  public async clearRecords(): Promise<void> {
    try {
      await this.waitForDB();
      if (this.db) {
        const transaction = this.db.transaction([this.key], 'readwrite');
        const store = transaction.objectStore(this.key);
        store.clear();
      } else {
        console.error('IndexedDB is not initialized.');
      }
    } catch (error) {
      console.error('Error clearing records from IndexedDB:', error);
      throw error;
    }
  }
}
