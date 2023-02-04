import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogComponent } from './common/dialog/dialog.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserRestService } from './components/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from './components/services/LanguageService';
import { AppRoutingModule } from './app-routing-module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatSidenavModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatListModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DialogComponent,
    DashboardComponent,
  ],

  providers: [UserRestService, LanguageService],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
