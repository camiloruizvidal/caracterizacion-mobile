import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IHttpResponse,
  IPaciente,
  IPaginationResult,
  IGuardarFormularioGrupal,
  IFormatoMapeoExcel
} from 'src/app/modules/formgenerator/interfaces/interface';
import { PatientsPersistenceService } from '../patients-persistence/patients-persistence.service';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private URL: string = '';
  constructor(
    private httpClient: HttpClient,
    private databaseService: DatabaseService,
    private readonly patientsPersistenceService: PatientsPersistenceService
  ) {
    this.getUrl();
  }

  private async getUrl() {
    this.databaseService.setTable('server');
    const url = await this.databaseService.findOne();
    this.URL = `${url}/api/v1`;
  }

  public loadDataForm(): Observable<IHttpResponse<IGuardarFormularioGrupal[]>> {
    const url = `${this.URL}/ficha/formato_ficha`;
    return this.httpClient.get<IHttpResponse<IGuardarFormularioGrupal[]>>(url);
  }

  public obtenerMapeoExcel(
    fichaId: number
  ): Observable<IHttpResponse<IFormatoMapeoExcel>> {
    const url = `${this.URL}/ficha/encabezados-excel/${fichaId}`;
    return this.httpClient.get<IHttpResponse<IFormatoMapeoExcel>>(url);
  }

  public obtenerRegistrosCarga(
    fichaId: number
  ): Observable<IHttpResponse<any>> {
    const url = `${this.URL}/carga/${fichaId}/registros`;
    return this.httpClient.get<IHttpResponse<any>>(url);
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

  public guardarFormatoFicha(data: IGuardarFormularioGrupal[]): void {
    this.databaseService.setTable('form');
    if (data && data.length > 0) {
      this.databaseService.createOrUpdate(data[0], 'version');
    }
  }

  public async borrarPacientes(): Promise<void> {
    await this.patientsPersistenceService.clearPatients();
  }

  public addPatients(data: IPaciente[]): void {
    this.patientsPersistenceService.addPatients(data);
  }
}
