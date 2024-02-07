import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IFamilyCard,
  IHttpResponse
} from 'src/app/modules/formgenerator/interfaces/interface';
import { DatabaseService } from 'src/app/utils/services/database/database.service';

@Injectable({
  providedIn: 'root'
})
export class FichaService {
  private url: string = '';

  constructor(
    private http: HttpClient,
    private databaseService: DatabaseService
  ) {
    this.url = this.getUrl();
  }

  private async getUrl() {
    this.databaseService.setTable('server');
    const url = await this.databaseService.findOne();
    return `${url}/api/v1`;
  }

  public getFicha(): Observable<IHttpResponse<IFamilyCard>> {
    return this.http.get<IHttpResponse<IFamilyCard>>(
      this.url + '/formato_ficha'
    );
  }
}
