import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'caracterizacion-mobile',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Camera: {
      ios: {
        promptLabelPhoto: 'Tomar foto',
        promptLabelPicture: 'Seleccionar de la galería'
      },
      android: {
        promptLabelPhoto: 'Tomar foto',
        promptLabelPicture: 'Seleccionar de la galería'
      }
    }
  }
};

export default config;
