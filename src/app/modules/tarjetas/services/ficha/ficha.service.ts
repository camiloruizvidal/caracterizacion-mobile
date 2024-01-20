import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFamilyCard, IHttpResponse } from 'src/app/modules/formgenerator/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  private readonly url: string = 'http://localhost:3000/api/v1/ficha';

  constructor(private http: HttpClient) { }

  public getFicha(): Observable<IHttpResponse<IFamilyCard>> {
    return this.http.get<IHttpResponse<IFamilyCard>>(this.url + '/formato_ficha');
  }
}
