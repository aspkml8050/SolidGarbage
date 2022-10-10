import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgSelectOption, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DemoComponent } from './demo/demo.component';
import { LoginLayoutComponent } from './_layout/login-layout/login-layout.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { LoginGaurdService } from './Guards/login-can-activate-gaurd.service';
import { AuthServiceToken } from './services/auth-tokens';
//import {FileUploadService } from './services/file-upload.service'
import { AuthInterceptorService } from './services/auth-interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LeftNvBarComponent } from './_layout/left-nv-bar/left-nv-bar.component';
import { DemoPopupComponent } from './demo-popup/demo-popup.component';
import { SpinnerComponent } from './spinner/spinner.component';
//import { DOCUMENT } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgHttpLoaderComponent } from 'ng-http-loader';
import { ErrorIntercept } from './services/error-interceptor';
import { DatePipe } from '@angular/common';
import { StrictNumberOnlyDirective } from 'src/utils/StrictNumberOnlyDirective';
import { FilterPipe } from './Pipes/filter.pipe';
import { CandHeaderComponent } from './CommonComponent/cand-header/cand-header.component';
import { HTMLtoExcelComponent } from './htmlto-excel/htmlto-excel.component';
import { ExcelService } from './services/excel.service';
import { VehicletypeComponent } from './vehicletype/vehicletype.component';
import { VehiclemasterComponent } from './vehiclemaster/vehiclemaster.component';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    DemoComponent,
    LoginLayoutComponent,
    SiteLayoutComponent,
    PageNotFoundComponent,
    LeftNvBarComponent,
    DemoPopupComponent,
    SpinnerComponent,
    StrictNumberOnlyDirective,
    FilterPipe,
    CandHeaderComponent,
    HTMLtoExcelComponent,
    VehicletypeComponent,
    VehiclemasterComponent,
    EmployeeComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [
    LoginGaurdService,
    AuthServiceToken,
    ExcelService,
    //FileUploadService,
    DatePipe,

    // AuthServiceToken,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useFactory: AuthInterceptorService,
    //   multi: true
    // }
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
