import { HttpClient } from '@angular/common/http';
import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = 'http://localhost:3000/api/v1/usuarios/login';
  constructor(
    private httpClient: HttpClient,
    private databaseService: DatabaseService
  ) {
    this.databaseService.setTable('user');
  }

  public loginUser(username: string, password: string): Observable<any> {
    return this.httpClient.post(this.url, { username, password }).pipe(
      tap((response: any) => {
        this.addUser(username, password, response.user);
      })
    );
  }

  private addUser(username: string, password: string, user: any) {
    this.databaseService.setTable('config');
    this.databaseService.createOrUpdate({
      name: 'current_user',
      value: { username, password, user }
    },'current_user');
  }

  public isLogin(): boolean {
    this.databaseService.setTable('config');
    this.databaseService.findByKey('current_user')
  }
}
