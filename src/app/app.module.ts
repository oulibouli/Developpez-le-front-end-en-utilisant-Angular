import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Ajouter cette ligne
import { DetailComponent } from './pages/detail/detail.component';
import { RouterLink } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BannerComponent } from './pages/banner/banner.component';

// Declaration of the modules used in the application
@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailComponent, BannerComponent],
  imports: [MatSnackBarModule,BrowserModule, NgxChartsModule, AppRoutingModule, BrowserAnimationsModule, RouterLink],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
