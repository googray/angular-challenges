import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

// bootstrapApplication(AppComponent, appConfig).catch((err) =>
//   console.error(err),
// );
bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes, withComponentInputBinding())],
});
