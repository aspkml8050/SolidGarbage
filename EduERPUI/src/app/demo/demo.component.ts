import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globalConstant } from '../global-variable';
import { Token } from '../login/login.model';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor(  private http: HttpClient,) { }

 
  ngOnInit(): void {
  }
  testApi(){
   this.http.post<Token>(
      '' + globalConstant.apiUrl + 'Login/GetData',"",      

    ).subscribe({
      next: (response) => {
        console.log(response.tokenKey)
        alert(response.tokenKey)
      },
      error: (error) => {
        
        console.log(error)
      
      },
    });
  }

}
