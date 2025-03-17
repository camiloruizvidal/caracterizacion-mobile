import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    try {
      await this._storage?.set(key, value);
    } catch (error) {
      console.error('Error al guardar en storage:', error);
      throw error;
    }
  }

  public async get(key: string) {
    try {
      return await this._storage?.get(key);
    } catch (error) {
      console.error('Error al obtener de storage:', error);
      return null;
    }
  }

  public async remove(key: string) {
    try {
      await this._storage?.remove(key);
    } catch (error) {
      console.error('Error al eliminar de storage:', error);
      throw error;
    }
  }

  public async clear() {
    try {
      await this._storage?.clear();
    } catch (error) {
      console.error('Error al limpiar storage:', error);
      throw error;
    }
  }
}
