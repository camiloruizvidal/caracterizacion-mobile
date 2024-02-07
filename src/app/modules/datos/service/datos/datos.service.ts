import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IFamilyCard,
  IHttpResponse
} from 'src/app/modules/formgenerator/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private URL: string = '';
  constructor(
    private httpClient: HttpClient,
    private databaseService: DatabaseService
  ) {
    this.getUrl();
  }

  private async getUrl() {
    this.databaseService.setTable('server')
    const url = await this.databaseService.findOne()
    this.URL = `${url}/api/v1`;
    console.log(this.URL)
  }

  public loadDataForm(): Observable<IHttpResponse<IFamilyCard>> {
    const url = `${this.URL}/ficha/formato_ficha`;
    return this.httpClient.get<IHttpResponse<IFamilyCard>>(url);
  }

  public saveDataForm(data: IFamilyCard): void {
    this.databaseService.setTable('form');
    this.databaseService.createOrUpdate(data, 'version');
  }
}
