import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { Injectable } from '@angular/core';
import {
  IFamilyCard,
  IFamilyCardSave
} from '../../formgenerator/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  constructor(private databaseService: DatabaseService) {}

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

  public loadRegister(id: number): any {
    this.databaseService.setTable(this.keySaveRegister);
    return this.databaseService.findOne({ id });
  }

  public async loadAllRegister(): Promise<IFamilyCardSave[]> {
    this.databaseService.setTable(this.keySaveRegister);
    return this.databaseService.findAll();
  }
}
