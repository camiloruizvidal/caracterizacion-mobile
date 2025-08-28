import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DatabaseService } from 'src/app/utils/services/database/database.service';

@Component({
  selector: 'app-server-config-modal',
  templateUrl: './server-config-modal.component.html',
  styleUrls: ['./server-config-modal.component.scss'],
})
export class ServerConfigModalComponent implements OnInit {
  public configForm: FormGroup;
  public showPassword = false;
  public isLoading = false;
  public errorMessage = '';
  public successMessage = '';

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController,
    private databaseService: DatabaseService
  ) {
    this.configForm = this.formBuilder.group({
      serverUrl: ['', [Validators.required]],
      adminUsername: ['', [Validators.required]],
      adminPassword: ['', [Validators.required]]
    });
  }

  async ngOnInit() {
    // Cargar URL actual si existe
    this.databaseService.setTable('server');
    const currentUrl = await this.databaseService.findOne();
    if (currentUrl) {
      this.configForm.patchValue({ serverUrl: currentUrl });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (this.configForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { serverUrl, adminUsername, adminPassword } = this.configForm.value;
      
      // Asegurar que la URL termine sin '/'
      const cleanUrl = serverUrl.replace(/\/$/, '');
      const validateUrl = `${cleanUrl}/api/v1/usuarios/validate-admin-server`;

      try {
        const response: any = await this.http.post(validateUrl, {
          username: adminUsername,
          password: adminPassword
        }).toPromise();

        if (response.success) {
          // Guardar servidor en la base de datos local
          this.databaseService.setTable('server');
          await this.databaseService.createOrUpdate(cleanUrl, 'server');

          this.successMessage = '✅ Servidor configurado correctamente';
          
          // Mostrar toast de éxito
          const toast = await this.toastController.create({
            message: 'Servidor configurado exitosamente',
            duration: 2000,
            position: 'top',
            color: 'success'
          });
          toast.present();

          // Cerrar modal después de 1.5 segundos
          setTimeout(() => {
            this.closeModal();
          }, 1500);
        }
      } catch (error: any) {
        console.error('Error validando administrador:', error);
        
        if (error.status === 401) {
          this.errorMessage = '❌ Solo administradores pueden configurar el servidor';
        } else if (error.status === 0 || error.status >= 500) {
          this.errorMessage = '❌ No se puede conectar al servidor. Verifique la URL';
        } else {
          this.errorMessage = error.error?.message || '❌ Error al validar las credenciales';
        }
      } finally {
        this.isLoading = false;
      }
    }
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
