import { DatePipe, formatDate, formatNumber } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SuccessStatus } from '../common-models';
import { globalConstant } from '../global-variable';
import { Vehicletypemaster, VehicletypemasterList } from '../vehiclemaster/vehicletypemaster.model';
import { Vehicle, VehicleList, Wastetrackmodel } from './wastetrackmodel';

@Component({
  selector: 'app-wastetrack',
  templateUrl: './wastetrack.component.html',
  styleUrls: ['./wastetrack.component.scss']
})
export class WastetrackComponent implements OnInit {
public vehicleList=new VehicleList();
public vehOrgList:Vehicle[]=[];
public dattod :Date;
public veh=new Vehicle();
  constructor( private http: HttpClient,private formBuilder: FormBuilder,private datePipe:DatePipe) {
 this.   dattod= new  Date()  ;//. this.datePipe.transform(this.dattod,'yyyy-MM-dd') ;// new Date();
this.queryVeh.patchValue({
  fromDate:  this.datePipe.transform(  this.dattod,'yyyy-MM-dd'),
  toDate:  this.datePipe.transform(  this.dattod,'yyyy-MM-dd')

})
   }
public datets:string;
  ngOnInit(): void {
    this.getVehicle();
//  this.datets=this.datePipe.transform(this.dattod,'yyyy-MM-dd');
  //this.queryVeh.get('fromDate')[0].value=this.datets;
  }
//  queryVeh=FormGroup;
  queryVeh=this.formBuilder.group ({
    vehileID: new FormArray([]),
    fromDate:new FormControl(new Date()) , 
    toDate:new FormControl(new Date()) ,
    pdfXls:new FormControl('pdf')
  })

  getVehicleArray(){
//    return this.queryVeh.controls.vehileID as FormArray;
  }

  getVehicle():void{
    this.vehicleList.result =[];
    this.getVehicleList$().subscribe(({
      next:(d) =>{
        d.result.forEach(v=>{
        this.vehicleList.result.push(v);
        });
        this.vehOrgList=this.vehicleList.result;
        this.queryVeh.patchValue({
          vehileID:this.vehicleList.result
        })
//no values in formarray???
        //console.log(this.queryVeh.get('vehileID')?.value);
      }
    }))
  }
  public veharr=new Array();

  setSelect(event){
    if (this.orglist==undefined){
      this.orglist=this.vehOrgList;
    }
    this.orglist.forEach(d=>{
      if (d.vehileID==event.target.value){
        d.selected=true;
        if (this.veharr.indexOf(d.vehileID)<=0){
          this.veharr.push(d.vehileID);
        }
      }
    })
  
  }
  public qmod=new Wastetrackmodel();
  findWaste():void{
    let vehlist=new VehicleList();
this.  qmod.vehileID=JSON.stringify(this. veharr);
this.qmod.fromDate=this.queryVeh.get('fromDate')?.value;
this.qmod.toDate=this.queryVeh.get('toDate')?.value;
this.qmod.pdfXls=this.queryVeh.get('pdfXls')?.value;
this.getreport$(this.qmod).subscribe({
  next:(res)=>{
    console.log(res);
    if (res.isSuccess){
      this.downloadfile(res.msg);
    }else{
      alert(res.msg);
    }
  },
  error:(er)=>{
    alert('Report error:'+ er);
  }
}
);
}

  public getVehicleList$(): Observable<VehicleList>{
    return this.http.get<VehicleList>(  '' + globalConstant.apiUrl + 'Vehicle/GetVehicleList/');
  }
public getreport$(data:Wastetrackmodel):Observable<SuccessStatus>{
  return this.http.post<SuccessStatus>(''+ globalConstant.apiUrl + 'Vehicle/VehicleWasteQuery',data);
}
//public saveVehData$(data:Vehiclemaster):Observable<SuccessStatus>{
 // return this.http.post<SuccessStatus>( '' + globalConstant.apiUrl + 'Vehicle/SaveVehicledata',data);
//}
public orglist=undefined;
findVeh(ev){
  let search=ev.target.value;
  if (this.orglist==undefined){
    this.orglist=this.vehOrgList;
  }
  var retl=this.vehOrgList.filter((item) =>{
    return        item.vehicleNo.toLocaleLowerCase() .includes(search.toLocaleLowerCase())
  });
  this.vehicleList.result=retl;
  if (search==''){
    this.vehicleList.result=this.orglist;

  }
  this.veharr.forEach(sel=>{
    this.vehicleList.result.forEach(v=>{
      if (sel.toLocaleLowerCase()==v.vehileID.toLocaleLowerCase()){
        v.selected=true;
      }else{
        v.selected=false;
      }
    })
        
  })
}

Reset():void{
  this.veharr=new Array();
  this.orglist=undefined;
  this.getVehicle();
  this.queryVeh.patchValue({
    fromDate:  this.datePipe.transform(  this.dattod,'yyyy-MM-dd'),
    toDate:  this.datePipe.transform(  this.dattod,'yyyy-MM-dd')
  })
  
}
public  downloadfile (fn:string):void{
  this.download(fn)
  .subscribe(blob => {
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
return this.http.get(url,{responseType:'blob'});
  }

}
