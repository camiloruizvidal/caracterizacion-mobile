import { LocalDataService } from '../local-data/local-data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private table: string = 'user';

  constructor(private localDataService: LocalDataService) {
    this.startConfig();
  }

  private startConfig(): void {
    this.localDataService.createTableIfNoExist(this.table, ['login', 'id_user', 'token']);
  }

  public async currentUser(): Promise<any> {
    //const dataUser = await this.localDataService.findOne('user_current');
  }
}
