import { Injectable } from '@angular/core';
import { IPaciente } from 'src/app/modules/formgenerator/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class PatientsPersistenceService {
  private dbName: string = 'patientDB';
  private key: string = 'patients';
  private dbVersion: number = 1;
  private db: IDBDatabase | null = null;

  constructor() {
    this.initDB();
  }

  private initDB(): void {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      db.createObjectStore(this.key, {
        keyPath: 'documento_numero',
        autoIncrement: false
      });
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

  public async addPatients(data: IPaciente[]): Promise<void> {
    try {
      this.initDB();
      await this.waitForDB();
      if (this.db) {
        const transaction = this.db.transaction([this.key], 'readwrite');
        const store = transaction.objectStore(this.key);
        data.forEach(patient => {
          store.add(patient);
        });
      } else {
        console.error('IndexedDB is not initialized.');
      }
    } catch (error) {
      console.error('Error saving data to IndexedDB:', error);
      throw error;
    }
  }

  public async clearPatients(): Promise<void> {
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
      console.error('Error clearing patients from IndexedDB:', error);
      throw error;
    }
  }
  public async getAll(): Promise<IPaciente[]> {
    try {
      await this.waitForDB();
      if (this.db) {
        const transaction = this.db.transaction([this.key], 'readonly');
        const store = transaction.objectStore(this.key);
        const request = store.getAll();
        return new Promise<IPaciente[]>((resolve, reject) => {
          request.onsuccess = (event: any) => {
            resolve(event.target.result);
          };
          request.onerror = (event: any) => {
            reject(event.target.error);
          };
        });
      } else {
        console.error('IndexedDB is not initialized.');
        return [];
      }
    } catch (error) {
      console.error('Error getting patients from IndexedDB:', error);
      throw error;
    }
  }
}
