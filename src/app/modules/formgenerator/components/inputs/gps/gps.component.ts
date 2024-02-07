import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { BaseInputComponent } from '../base-input/base-input.component';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss'],
})
export class GPSComponent extends BaseInputComponent {

  public locationForm: FormGroup;
  public isShowError: boolean = false;
  public isLocationCaptured: boolean = false;

  constructor(private formBuilder: FormBuilder, private loadingController: LoadingController) {
    super();
    this.locationForm = this.formBuilder.group({
      longitud: [{ value: '', disabled: true }, Validators.required],
      latitud: [{ value: '', disabled: true }, Validators.required],
    });
  }

  async capturarUbicacion() {

    const loading = await this.loadingController.create({
      message: 'Cargando ubicación...',
    });

    try {
      await loading.present();

      const position: GeolocationPosition = await Geolocation.getCurrentPosition();
      this.locationForm.patchValue({
        longitud: position.coords.longitude,
        latitud: position.coords.latitude,
      });
      this.isLocationCaptured = true;
    } catch (error) {
      console.trace()
      console.error('Error al obtener la ubicación:', error);
      this.isLocationCaptured = false;
      this.isShowError = true;
    } finally {
      if (loading) {
        loading.dismiss();
      }
    }
  }

}
