import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { Injectable } from '@angular/core';
import { IFamilyCard } from '../../formgenerator/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  constructor(private databaseService: DatabaseService) {}

  public async loadForms(): Promise<IFamilyCard> {
    this.databaseService.setTable('form');
    return await this.databaseService.findOne();
  }
}
