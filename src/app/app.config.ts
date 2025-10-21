import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// 1. Importações necessárias para Locale
import { LOCALE_ID } from '@angular/core';
import pt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

// Importações para animações e PrimeNG
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

// 2. Registra o idioma Português (pt) para uso global na aplicação
registerLocaleData(pt); 


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),

     // 3. Define o Locale ID como 'pt-BR' para toda a aplicação
    { provide: LOCALE_ID, useValue: 'pt-BR' } 
  ]
};
