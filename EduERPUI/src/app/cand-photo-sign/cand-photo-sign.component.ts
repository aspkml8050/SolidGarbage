import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cand-photo-sign',
  templateUrl: './cand-photo-sign.component.html',
  styleUrls: ['./cand-photo-sign.component.scss']
})
export class CandPhotoSignComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  processData(){
   // alert('fasdsad');
      if (typeof Worker !== 'undefined') {
        // Create a new
        //alert('fasdsad11');
        const worker = new Worker(new URL('../app.worker', import.meta.url));
        //const worker = new Worker('./web-worker/we', { type: 'module' });
        worker.onmessage = ({ data }) => {
          console.log(`page got message: ${data}`);
        };
        worker.postMessage('hello');
      } else {
        // Web Workers are not supported in this environment.
        // You should add a fallback so that your program still executes correctly.
      }
    }

}
