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
  private URL: string = 'api/v1';
  constructor(private httpClient: HttpClient) {
    this.URL = `http://localhost:3000/${this.URL}`;
  }

  public loadDataForm(): Observable<IHttpResponse<IFamilyCard>> {
    const url = `${this.URL}/ficha/formato_ficha`;
    return this.httpClient.get<IHttpResponse<IFamilyCard>>(url);
  }
}
