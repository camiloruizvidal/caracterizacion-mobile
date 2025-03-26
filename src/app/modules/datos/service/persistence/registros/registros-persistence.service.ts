import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicPersistenceService {
  private dbName: string = 'dynamicDB';
  private key: string = 'records';
  private dbVersion: number = 1;
  private db: IDBDatabase | null = null;
  private searchField: string = ''; // Este será el campo de búsqueda dinámico

  constructor() {
    this.initDB();
  }

  // Inicializa la base de datos
  private initDB(): void {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;

      // Si no existe, crea un store para registros
      const store = db.createObjectStore(this.key, { autoIncrement: true });
      if (this.searchField) {
        // Crear un índice para el campo de búsqueda
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

  // Espera que la base de datos se haya inicializado
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

  // Configura el campo de búsqueda dinámico
  public async setSearchField(field: string): Promise<void> {
    this.searchField = field;
    this.dbVersion++; // Incrementamos la versión de la DB para realizar cambios
    await this.initDB();
  }

  // Agregar registros con un campo dinámico de búsqueda
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

  // Buscar registros por el campo de búsqueda dinámico
  public async searchByField(value: string): Promise<any[]> {
    try {
      await this.waitForDB();
      if (this.db) {
        const transaction = this.db.transaction([this.key], 'readonly');
        const store = transaction.objectStore(this.key);
        const index = store.index('by-search-field');
        const request = index.getAll(value); // Usamos getAll para obtener todos los registros que coinciden

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

  // Limpiar todos los registros de la base de datos
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
