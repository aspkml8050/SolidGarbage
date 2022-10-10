import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { globalConstant } from 'src/app/global-variable';

@Component({
  selector: 'site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent{  
  formName: string | null=""
  constructor(private route: Router){


  }
  LogOut(){
    localStorage.setItem("access_token", "")
    this.route.navigate(['/Login']) ;
  }
  componentAdded(event:any){
 this.formName = sessionStorage.getItem("currentFormName");

  }
}