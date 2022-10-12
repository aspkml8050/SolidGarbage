import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginLayoutComponent } from './_layout/login-layout/login-layout.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { LoginGaurdService } from './Guards/login-can-activate-gaurd.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DemoPopupComponent } from './demo-popup/demo-popup.component';
import { HTMLtoExcelComponent } from './htmlto-excel/htmlto-excel.component';
import { VehiclemasterComponent } from './vehiclemaster/vehiclemaster.component';
import { VehicletypeComponent } from './vehicletype/vehicletype.component';
import { EmployeeComponent } from './employee/employee.component';
import { UpdscrapcorrectionComponent } from './updscrapcorrection/updscrapcorrection.component';
const routes: Routes = [
  //{ path: 'Demo' , component: DemoComponent},
  //{ path: 'Welcome' , component: WelcomeComponent},
  // {path: 'Login', component: LoginComponent}
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: '',
    component: LoginLayoutComponent,

    children: [
      { path: '', component: LoginComponent },
      {
        path: 'Login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [LoginGaurdService],
    children: [
      { path: 'Demo', component: DemoComponent },
      { path: 'DemoPopup', component: DemoPopupComponent },
      { path: 'Welcome', component: WelcomeComponent },
      { path: 'ExcelExport', component: HTMLtoExcelComponent },
      { path:'vehiclemaster',component:VehiclemasterComponent},
      {path : 'vehicletype',component:VehicletypeComponent},
      {path : 'employee',component:EmployeeComponent},
      {path: 'updscrapcorrection',component:UpdscrapcorrectionComponent},
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
