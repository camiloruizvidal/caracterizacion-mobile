import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { Injectable } from '@angular/core';
import {
  IFamilyCard,
  IFamilyCardSave
} from '../../formgenerator/interfaces/interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  constructor(
    private databaseService: DatabaseService,
    private httpClient: HttpClient
  ) {}

  private keySaveRegister: string = 'formsSave';

  public async loadForms(): Promise<IFamilyCard> {
    this.databaseService.setTable('form');
    return await this.databaseService.findOne({ last: true });
  }

  public newRegister(newCard: IFamilyCardSave): number {
    this.databaseService.setTable(this.keySaveRegister);
    return this.databaseService.addRecord(newCard);
  }

  public updateRegister(id: number, updateCard: IFamilyCardSave) {
    this.databaseService.setTable(this.keySaveRegister);
    this.databaseService.updateRecord(id, updateCard);
  }

  public async loadRegister(id: number): Promise<IFamilyCardSave> {
    this.databaseService.setTable(this.keySaveRegister);
    return this.databaseService.findOne({ id });
  }

  public async loadAllRegister(): Promise<IFamilyCardSave[]> {
    this.databaseService.setTable(this.keySaveRegister);
    return this.databaseService.findAll();
  }

  public saveRegister(data: IFamilyCardSave): Observable<any> {
    const url = `${this.getUrl()}/api/v1/ficha/save`;
    return this.httpClient.post<any>(url, data);
  }

  private async getUrl() {
    this.databaseService.setTable('server');
    const url = await this.databaseService.findOne();
    return `${url}/api/v1`;
  }
}
