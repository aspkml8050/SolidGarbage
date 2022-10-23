import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { globalConstant } from '../global-variable';
import { Vehicletypemaster, VehicletypemasterList } from '../vehiclemaster/vehicletypemaster.model';

@Component({
  selector: 'app-wastetrack',
  templateUrl: './wastetrack.component.html',
  styleUrls: ['./wastetrack.component.scss']
})
export class WastetrackComponent implements OnInit {
  public  VehicletypemasterList=new VehicletypemasterList();

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    this.getVehicleType();
  }
  queryVeh: FormGroup = new FormGroup({
    vehileID: new FormControl('-1' ),
    fromDate:new FormControl(new Date), 
    toDate:new FormControl(new Date) 
  })


  getVehicleType(){
    this.getVehicleType$().subscribe(
   {
     next:(response)=>{
   let vhtye=new Vehicletypemaster();
   vhtye.vehicleTypeID=-1;
   vhtye.vehicleTypeName="---Select---";
   this.VehicletypemasterList.result.push(vhtye);
   response.result.forEach(x=>{
        let r=x;
         this.VehicletypemasterList.result.push(r);
     });
     }
   });
   }

  public getVehicleType$(): Observable<VehicletypemasterList>{
    return this.http.get<VehicletypemasterList>(  '' + globalConstant.apiUrl + 'Master/GetVehicleType/-1');
  }

}
