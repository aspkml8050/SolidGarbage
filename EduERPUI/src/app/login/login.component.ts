import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { globalConstant } from '../global-variable';
import { catchError, retry, throwError } from 'rxjs';
import { Token } from './login.model';
import { inject } from '@angular/core/testing';
//import { DOCUMENT } from '@angular/common';

//@Inject(DOCUMENT) 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
invalidcredMessage: string =""
//isLoading: boolean = false ;
  loginForm: FormGroup = new FormGroup({

    loginName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.email])


  })
  submitted = false;

  constructor(
   // private document : Document,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private elRef: ElementRef
    

  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        loginName: ['', Validators.required],
        password: ['', Validators.required]
      });

  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  LoggedIn(): any {
    this.submitted = true;
    //this.elRef.nativeElement.querySelector('body').style["overflow"] = "hidden";
   // this.document.body.classList.add('test');
    //this.isLoading = true ;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
     // this.isLoading = false ;
      return false;
    }

    let body = {
      collageID: "1",
      packageID: "2",
      userName: this.f["loginName"].value,
      password: this.f["password"].value

    };
    this.http.post<Token>(
      '' + globalConstant.apiUrl + 'Login/authentication',
      body

    ).subscribe({
      next: (response) => {
        console.log(response)
        this.invalidcredMessage=""
        var data = response.tokenKey;
        localStorage.setItem("access_token", response.tokenKey);
       // this.isLoading = false ;
        //this.router.navigate(['/Welcome']);// as of now let full load page will check later there is one scroll bar which not loaded properly
        window.location.href = "/Welcome";
      },
      error: (error) => {
        localStorage.setItem("access_token", "")
        console.log(error)
        //this.isLoading = false ;
        this.invalidcredMessage=error;//"Invalid Credential";
      },
    });


  }
  // will later implements Error handling and logging 
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
