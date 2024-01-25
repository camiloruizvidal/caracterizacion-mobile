import { DatabaseService } from 'src/app/utils/services/database/database.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private table: string = 'user';

  constructor(private databaseService: DatabaseService) {
    this.startConfig();
  }

  private startConfig(): void {
    this.databaseService.createTableIfNoExist(this.table, ['login', 'id_user', 'token']);
  }

  public async currentUser(): Promise<any> {
    //const dataUser = await this.databaseService.findOne('user_current');
  }
}
