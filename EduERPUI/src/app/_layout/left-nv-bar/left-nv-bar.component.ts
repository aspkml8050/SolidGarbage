import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NEVER } from 'rxjs';
import { globalConstant } from 'src/app/global-variable';
import { resultSet } from './left-nav-bar.model';


@Component({
  selector: 'app-left-nv-bar',
  templateUrl: './left-nv-bar.component.html',
  styleUrls: ['./left-nv-bar.component.scss']
})
export class LeftNvBarComponent implements OnInit {
  public resultSet: resultSet;
 //public resultSet: Array<result7>=[];
 // result4 :Array<result4> =[];
  //result5 :Array<result5> =[];
 // result7 : Array<result7> =[];
  constructor(private http: HttpClient,  private router : Router ) {
    this.resultSet = new resultSet();   
  }

  ngOnInit(): void {
    this.GetForms();
  }
  GetForms(){
    this.http.get<resultSet>(
      '' + globalConstant.apiUrl + 'Login/GetUserPermission'  
    ).subscribe({
      next: (response) => {      
      //  let resultSet  = response;
        this.resultSet = response;
       //this.result5 = response.result5;
        //this.router.navigate(['/Welcome']);// as of now let full load page will check later there is one scroll bar which not loaded properly
        let a = 10;
      },
      error: (error) => {
        localStorage.setItem("access_token", "")
        console.log(error)
        //this.isLoading = false ;
      // this.invalidcredMessage=error;//"Invalid Credential";
      },
    });
  }
  redirectToForm(formName: string, displayName: string, currentFormId: number){
    //globalConstant.currentFormName = displayName;
   sessionStorage.setItem("currentFormName", displayName);
   sessionStorage.setItem("currentFormId", currentFormId.toString());
   //localStorage.setItem("currentFo", displayName);
    this.router.navigate(['/'+formName+'']);
  }
}
