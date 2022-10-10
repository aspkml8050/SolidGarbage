import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalConstant } from '../global-variable';
import { CandidateRegistration } from '../candidate-registration/candidate-registration.model';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }
  upload(file: File, candId : string , type: number): Observable<HttpEvent<any>> {

    let candInfo ={
        candidateId: candId,
        type: type
    }


    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('candInfo', JSON.stringify(candInfo));
    const req = new HttpRequest('POST', `${globalConstant.apiUrl}CandidateRegistration/Upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${globalConstant.apiUrl}/files`);
  }
}
