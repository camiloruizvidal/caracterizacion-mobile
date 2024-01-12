import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent extends BaseInputComponent {

  constructor() {
    super();
  }

  public imageElement: any = '';

  public async takePhoto(): Promise<void> {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    this.imageElement = image?.webPath
    this.steperValue
  }

  public deletePhoto(): void {
    this.imageElement = '';
  }

}
