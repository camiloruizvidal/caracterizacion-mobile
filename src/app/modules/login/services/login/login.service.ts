import { HttpClient } from '@angular/common/http';
import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from 'src/app/modules/formgenerator/interfaces/interface';

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
    this.databaseService.createOrUpdate(
      {
        name: 'current_user',
        value: { username, password, user }
      },
      'current_user'
    );
  }

  public async isLogin(): Promise<boolean> {
    this.databaseService.setTable('config');
    const user = await this.databaseService.findAll();
    return user.find(u => u.name === 'current_user') !== undefined;
  }

  public async closeLogin(): Promise<void> {
    this.databaseService.setTable('config');
    const user = await this.databaseService.findAll();
    const id = user.findIndex(u => u.name === 'current_user');
    this.databaseService.delete(id);
  }

  public async getCurrentUser(): Promise<IUser> {
    this.databaseService.setTable('config');
    const data = await this.databaseService.findAll();
    const user = data.find(u => u.name === 'current_user');
    return user.value.user;
  }
}
