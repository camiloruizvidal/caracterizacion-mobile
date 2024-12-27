import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IGrupalCard,
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
    this.getUrl().then(url => {
      this.url = url;
    });
  }

  private async getUrl() {
    this.databaseService.setTable('server');
    const url = await this.databaseService.findOne();
    return `${url}/api/v1`;
  }

  public getFicha(): Observable<IHttpResponse<IGrupalCard>> {
    return this.http.get<IHttpResponse<IGrupalCard>>(
      this.url + '/formato_ficha'
    );
  }
}
