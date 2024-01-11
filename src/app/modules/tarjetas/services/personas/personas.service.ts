import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {

  private tableName: string = 'personas';

  constructor(private storage: Storage) {
    this.initializeDatabase();
  }

  private initializeDatabase() {
    this.storage.create();
    this.query();
  }

  private query() {
    this.storage.get(this.tableName).then((data) => {
      if (!data) {
        this.storage.set(this.tableName, []);
      }
    });
  }

  public getAll() {
    return this.storage.get(this.tableName);
  }

  public addPerson(person: { nombre: string, documento: string }) {
    return this.storage.get(this.tableName).then((data: any[]) => {
      data.push({ ...person, id: uuidv4()});
      return this.storage.set(this.tableName, data);
    });
  }

  public searchByDocument(documento: string) {
    return this.storage.get(this.tableName).then((data: any[]) => {
      const matchingPerson = data.find((person) => person.documento === documento);
      return matchingPerson || null;
    });
  }

}