import { Injectable } from '@angular/core';
import { IPaciente } from 'src/app/modules/formgenerator/interfaces/interface';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsPersistenceService {
  private readonly STORAGE_KEY = 'patients';

  constructor(private storageService: StorageService) {}

  public async addPatients(data: IPaciente[]): Promise<void> {
    try {
      if (!data || !Array.isArray(data)) {
        console.log('No hay datos para actualizar o el formato es inválido');
        return;
      }

      if (data.length === 0) {
        console.log('Array de pacientes está vacío');
        return;
      }

      const existingData = await this.getPatients();
      const patients = existingData || [];

      data.forEach((patient: IPaciente) => {
        if (patient && typeof patient === 'object') {
          patients.push(patient);
        }
      });

      await this.storageService.set(this.STORAGE_KEY, patients);
    } catch (error) {
      console.error('Error al guardar datos en IndexedDB:', error);
      throw error;
    }
  }

  public async getPatients(): Promise<IPaciente[]> {
    try {
      const patients = await this.storageService.get(this.STORAGE_KEY);
      return patients || [];
    } catch (error) {
      console.error('Error al obtener datos de IndexedDB:', error);
      return [];
    }
  }

  public async clearPatients(): Promise<void> {
    try {
      await this.storageService.remove(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error al limpiar datos de IndexedDB:', error);
      throw error;
    }
  }
}
