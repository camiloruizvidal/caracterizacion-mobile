import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, forkJoin, map, of } from 'rxjs';
import {
  IFamilyCard,
  IHttpResponse,
  IPaciente,
  IPaginationResult
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
    this.databaseService.setTable('server');
    const url = await this.databaseService.findOne();
    this.URL = `${url}/api/v1`;
  }

  public loadDataForm(): Observable<IHttpResponse<IFamilyCard>> {
    const url = `${this.URL}/ficha/formato_ficha`;
    return this.httpClient.get<IHttpResponse<IFamilyCard>>(url);
  }

  public loadDataPatients(
    paginaActual: number = 1,
    registrosPorPagina = 10
  ): Observable<IPaginationResult<IPaciente[]>> {
    const params: HttpParams = new HttpParams()
      .set('page', paginaActual.toString())
      .set('pageSize', registrosPorPagina.toString());

    return this.httpClient.get<IPaginationResult<IPaciente[]>>(
      `${this.URL}/pacientes`,
      { params }
    );
  }

  public saveDataForm(data: IFamilyCard): void {
    this.databaseService.setTable('form');
    this.databaseService.createOrUpdate(data, 'version');
  }

  public saveDataPatient(data: IPaciente[]): void {
    this.databaseService.setTable('patients');
    this.databaseService.truncateTable('patients');
    this.databaseService.addManyRecords(data);
  }

  public borrarPacientes(): void {
    this.databaseService.truncateTable('patients');
  }

  public addPatients(data: IPaciente[]): void {
    try {
      const key = 'patients';
      let patientsString = localStorage.getItem(key);
      let patients: IPaciente[] = [];

      if (patientsString) {
        patients = JSON.parse(patientsString) as IPaciente[];
      }
      localStorage.setItem(key, JSON.stringify([...patients, ...data]));
    } catch (error) {
      throw error;
    }
  }
}
