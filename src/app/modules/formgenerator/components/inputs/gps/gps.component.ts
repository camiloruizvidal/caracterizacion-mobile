import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { BaseInputComponent } from '../base-input/base-input.component';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GPSComponent extends BaseInputComponent {
  public locationForm: FormGroup;
  public isShowError: boolean = false;
  public isLocationCaptured: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController
  ) {
    super();
    this.locationForm = this.formBuilder.group({
      lng: [{ value: '', disabled: true }, Validators.required],
      lat: [{ value: '', disabled: true }, Validators.required]
    });
    this.locationForm.get('lng')?.valueChanges.subscribe(newLongitud => {
      setTimeout(() => {
        this.saveInput({
          detail: { value: JSON.stringify(this.locationForm.value) }
        });
      }, 300);
    });
    this.locationForm.get('lat')?.valueChanges.subscribe(newLatitud => {
      setTimeout(() => {
        this.saveInput({
          detail: { value: JSON.stringify(this.locationForm.value) }
        });
      }, 300);
    });
  }

  async capturarUbicacion() {
    const loading = await this.loadingController.create({
      message: 'Cargando ubicación...'
    });

    try {
      await loading.present();

      const permisos = await Geolocation.checkPermissions();

      const position: GeolocationPosition =
        await Geolocation.getCurrentPosition();
      this.locationForm.setValue({
        lng: position.coords.longitude,
        lat: position.coords.latitude
      });

      this.isLocationCaptured = true;
    } catch (error) {
      console.trace();
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
