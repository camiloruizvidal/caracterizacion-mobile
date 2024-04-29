import { HttpClient } from '@angular/common/http';
import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  ICodes,
  IUser
} from 'src/app/modules/formgenerator/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = '';
  constructor(
    private httpClient: HttpClient,
    private databaseService: DatabaseService
  ) {
    this.getUrl();
    this.databaseService.setTable('user');
  }

  private async getUrl() {
    this.databaseService.setTable('server');
    const url = await this.databaseService.findOne();
    this.url = `${url}/api/v1/usuarios/login`;
    return this.url;
  }

  public loginUser(
    username: string,
    password: string,
    server: string
  ): Observable<any> {
    this.addServer(server);
    return this.httpClient.post(this.url, { username, password }).pipe(
      tap((response: any) => {
        this.addUser(username, password, response.user);
      })
    );
  }

  private async addServer(server: string) {
    this.databaseService.setTable('server');
    this.databaseService.createOrUpdate(server, 'server');
    this.url = await this.getUrl();
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
    if (id >= 0) {
      this.databaseService.delete(id);
    }
  }

  public async getCurrentUser(): Promise<IUser> {
    this.databaseService.setTable('config');
    const data = await this.databaseService.findAll();
    const user = data.find(u => u.name === 'current_user');
    return user.value.user;
  }

  public async nextCode(): Promise<number> {
    let found = false;
    const user: IUser = await this.getCurrentUser();
    const myCodes: ICodes[] = user.codes;

    let currentCode = Number(`${user.currentCode}`);
    for (const codeRange of myCodes) {
      if (currentCode >= codeRange.start && currentCode <= codeRange.finish) {
        currentCode++;

        if (currentCode > codeRange.finish) {
          found = false;
        } else {
          found = true;
        }
        break;
      }
    }

    if (!found && myCodes.length > 0) {
      for (let i = 0; i < myCodes.length - 1; i++) {
        if (
          currentCode >= myCodes[i].finish &&
          currentCode < myCodes[i + 1].start
        ) {
          currentCode = myCodes[i + 1].start;
          found = true;
          break;
        }
      }

      if (!found) {
        currentCode = myCodes[0].start;
      }
    }

    user.currentCode = currentCode;
    this.updateCode(user);
    return currentCode;
  }

  private updateCode(user: IUser) {
    //TODO Esto debe gestionarlo la capa de persistencia
    const config: any[] = JSON.parse(localStorage.getItem('config') || '');
    const idx = config.findIndex(conf => conf.name === 'current_user');
    config[idx].value.user = user;
    localStorage.setItem('config', JSON.stringify(config));
  }
}
