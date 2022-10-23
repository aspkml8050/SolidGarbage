import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { globalConstant } from '../global-variable';

@Component({
  selector: 'app-vehicletype',
  templateUrl: './vehicletype.component.html',
  styleUrls: ['./vehicletype.component.scss']
})
export class VehicletypeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  

 public dnit(){
    alert('1');
   this. downloadfile("Sample1.pdf");
  }
  

public  downloadfile (fn:string):void{
  this.download(fn)
  .subscribe(blob => {
    //let filenm=blob.  .headers.get('content-disposition')?.split(';')[1].split('=')[1];
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(blob)  
    a.href = objectUrl
    a.download = fn;
    a.click();
    URL.revokeObjectURL(objectUrl);
  })
}
public download(filename:string): Observable<Blob>{
  let url=''+globalConstant.apiUrl+'Report/download/'+filename;
//    return this.http.get('https://localhost:44390/api/StudentReports/download/'+filename,{responseType:'blob'});
return this.http.get(url,{responseType:'blob'});
  }
}
