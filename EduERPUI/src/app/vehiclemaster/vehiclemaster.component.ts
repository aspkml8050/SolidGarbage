import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Pipe } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { Observable } from 'rxjs';
import { globalConstant } from '../global-variable';
import { Vehiclecategorymaster, VehiclecategorymasterList } from './vehiclecategorymaster';
import { Vehiclemaster, VehicleMasterList } from './vehiclemaster.model';
import { Vehicletypemaster, VehicletypemasterList } from './vehicletypemaster.model';
import {Devicemaster, DevicemasterList } from './devicemaster';
import { QueryResult, QueryResultList } from './query-result';
import { SuccessStatus } from '../common-models';
import { Script } from 'vm';
import { truncateSync } from 'fs';

@Component({
  selector: 'app-vehiclemaster',
  templateUrl: './vehiclemaster.component.html',
  styleUrls: ['./vehiclemaster.component.scss']
})
export class VehiclemasterComponent implements OnInit {

  public filtertext2:string="";
public showquery:boolean=true;
  public  VehicletypemasterList=new VehicletypemasterList();
  public vehcategmasterList : Vehiclecategorymaster[]=[];    // new VehiclecategorymasterList();
  public vehcateg2: Vehiclecategorymaster[]=[];
 public devicelist=new DevicemasterList();
 public queryRes=new QueryResultList();//  :QueryResultList[]=[];
public vehMasterList:Vehiclemaster[]=[];
  public vm!: Vehiclemaster;
  public VehicleTypeID:number=-1;
  public VehicleCateID:number=-1;
  queryVeh: FormGroup = new FormGroup({
    vehileID: new FormControl('-1' ),
    vehileName: new FormControl(''),
    vehicleNo: new FormControl(''),
    chesisNo: new FormControl(''),
    deviceID:new FormControl('-1'),
    vehileCatID: new FormControl('-1'),
    vehileTypeID: new FormControl('-1'),
    purchaseYear: new FormControl(''),
    userID: new FormControl('-1'),
    formID: new FormControl('-1'),
    filtertext:new FormControl('')

  });

public tabselect:string="";
public tabselect2:string="1";

opclose(){
  this.showquery=!this.showquery;    
}




//public filterData:Vehiclemaster[]=[];

  public vehileID:string="";
  vmForm:FormGroup=new FormGroup({
    vehileID: new FormControl('-1'),
    vehileName: new FormControl('',[Validators.required]),
    vehicleNo: new FormControl('',[Validators.required]),
    vehileCode:new FormControl(''), 
    chesisNo: new FormControl(''),
    deviceID:new FormControl('',[Validators.required]),
    vehileCatID: new FormControl('-1',[Validators.required]),
    vehileTypeID: new FormControl('-1',[Validators.required]),
    purchaseYear: new FormControl('',[Validators.required]),
    modelNo: new FormControl(''),
    serialNo: new FormControl(''),
    vehicleEmptyWeight:new FormControl('0')
  })
  constructor(
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    this.getVehicleCategory();
    this. getVehicleType();
    this.getDevice();
  this.vm=new Vehiclemaster;

}


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
   getVehicleCategory(){
    this.getVehicleCategory$().subscribe({
      next:(response)=>{
        let vcateg=new Vehiclecategorymaster();
        vcateg.vehicleCatID=-1;
        vcateg.vehicleCatName="---Select---";
     this.vehcateg2.push(vcateg);
     response.result.forEach(xc=>{
this.vehcateg2.push(xc);
          });
     }
    });
   }
   getDevice(){
    this.getDevice$().subscribe(
   {
     next:(response)=>{
   let vhtye=new Devicemaster()
   vhtye.deviceID="-1";
   vhtye.deviceName="---Select---";
   this.devicelist.result.push(vhtye);
   response.result.forEach(x=>{
        let r=x;
         this.devicelist.result.push(r);
     });
     }
   });
   }
 
  public getVehicleType$(): Observable<VehicletypemasterList>{
    return this.http.get<VehicletypemasterList>(  '' + globalConstant.apiUrl + 'Master/GetVehicleType/-1');
  }
  public getVehicleCategory$(): Observable<VehiclecategorymasterList>{
    return this.http.get<VehiclecategorymasterList>(  '' + globalConstant.apiUrl + 'Master/GetVehicleCategory/-1');
  }
  public getDevice$(): Observable<DevicemasterList>{
    return this.http.get<DevicemasterList>(  '' + globalConstant.apiUrl + 'Master/GetDevice/-1');
  }
public orglist=undefined;
  searchVehicle(ev){
    let v=ev.target.value;
  if (this.orglist==undefined){
    this.orglist=this.vehMasterList;
 }
    var retl=this.orglist.filter((item) =>{
      return        item.vehileName.toLocaleLowerCase() .includes(v.toLocaleLowerCase())
      || item.vehicleNo.toLocaleLowerCase() .includes(v.toLocaleLowerCase())
     
    });
    this.vehMasterList=retl;
    if (v==''){
      this.vehMasterList=this.orglist;
 
    }
  }
 
  FindVehicle(): any {
  this.vm.vehileTypeID=this.queryVeh.get('vehileTypeID')?.value;
  this.vm.deviceID= this.queryVeh.get('deviceID')?.value;
  this.vm.vehileName=  this.queryVeh.get('vehileName')?.value;
  if (this.vm.vehileName==null)
   this.vm.vehileName='';
  this.vm.vehicleNo=  this.queryVeh.get('vehicleNo')?.value;
  this.vm.vehicleNo=this.vm.vehicleNo==null?"":this.vm.vehicleNo;
  let puryr=  this.queryVeh.get('purchaseYear')?.value;
  this.vm.purchaseYear=puryr;
  if ((puryr==null || puryr==""))
    this.vm.purchaseYear=-1;

  this.vm.chesisNo=  this.queryVeh.get('chesisNo')?.value;
  this.vm.chesisNo=this.vm.chesisNo==null?"":this.vm.chesisNo;
  this.vm.vehileCatID=  this.queryVeh.get('vehileCatID')?.value;
  this.getvehdata$(this.vm).subscribe(
    {
     next:(response) =>{
      let list: Vehiclemaster[]=[];
      this.vehMasterList =list;
      if (response.result==null)
      return;
      if (response.result.length==0)
      return;
      response.result.forEach(x=>{
        var v= new Vehiclemaster();
        v.vehicleNo=x.vehicleNo;
        v.vehileName=x.vehileName;
        v.chesisNo=x.chesisNo;
        v.modelNo=x.modelNo;
        v.deviceID=x.deviceID;
        v.purchaseYear=x.purchaseYear;
        list.push(v);
this.vehMasterList =list;
  
     });
//    alert( this.vehMasterList.length);
    }
    }
    
    );
   }
  
public getvehdata$(data:Vehiclemaster):Observable<VehicleMasterList>{
  let urlcall='' + globalConstant.apiUrl + 'Vehicle/GetVehicle';
  return this.http.post<VehicleMasterList>( '' + globalConstant.apiUrl + 'Vehicle/GetVehicle',data);
}  

public saveVehData$(data:Vehiclemaster):Observable<SuccessStatus>{
  return this.http.post<SuccessStatus>( '' + globalConstant.apiUrl + 'Vehicle/SaveVehicledata',data);
}

SaveVehicle():any{
 if (this.vmForm.invalid){
    alert('Fill all * mark relevant fields');
    return false;
 } 
 
 let body={
  vehileID:this.vmForm.get('vehileID')?.value,
  vehileName:this.vmForm.get('vehileName')?.value,
  vehileCode:this.vmForm.get('vehileCode')?.value,
  vehileCatID:this.vmForm.get('vehileCatID')?.value,
  vehileTypeID:this.vmForm.get('vehileTypeID')?.value,
  deviceID:this.vmForm.get('deviceID')?.value,
  purchaseYear:this.vmForm.get('purchaseYear')?.value,
  modelNo:this.vmForm.get('modelNo')?.value,
  serialNo:this.vmForm.get('serialNo')?.value,
  vehicleNo:this.vmForm.get('vehicleNo')?.value,
  chesisNo:this.vmForm.get('chesisNo')?.value,
  vehicleEmptyWeight:this.vmForm.get('vehicleEmptyWeight')?.value,
 }
 if (body.purchaseYear=='') {
  alert('Enter Purchase Year');
  return;
 }
 let py=Number(body.purchaseYear);
 if ((py>2022) || (py<1990)){
  alert('Purchase year not valid');
  return;
 }
 this.saveVehData$(body)
.subscribe(
  {
    next: (response) => {
      if (response.isSuccess) {
       this.vmForm.reset();
       this.vehileID = "-1" ;
      }
      alert(response.msg);
    },
    error: (error) => {
      alert(error)
    },
  }
)
}
updVeh(veh:Vehiclemaster){
let vfind=new Vehiclemaster();
vfind.vehicleNo=veh.vehicleNo;
this.getvehdata$(vfind).subscribe({
  next:(response)=>{
    this.vmForm.patchValue({
      vehileID:response.result[0].vehileID,
      vehileName:response.result[0].vehileName,
      purchaseYear:response.result[0].purchaseYear,
      vehicleNo:response.result[0].vehicleNo,
      vehileCode:response.result[0].vehileCode,
      vehileCatID:response.result[0].vehileCatID,
      vehileTypeID:response.result[0].vehileTypeID,
      deviceID:response.result[0].deviceID,
      modelNo:response.result[0].modelNo,
      serialNo:response.result[0].serialNo,
      chesisNo:response.result[0].chesisNo,
      vehicleEmptyWeight:response.result[0].vehicleEmptyWeight
    });
    this.tabselect2='2';
  }
});
}
Reset(){
  this.vmForm.reset();
  this.queryVeh.reset();
  this.queryVeh.patchValue({
    deviceID:"-1"
  });
  this.vmForm.patchValue({
    deviceID:"-1"
  });
  //
  this.queryVeh.patchValue({
    vehileCatID:"-1"
  });
  this.vmForm.patchValue({
    vehileCatID:"-1"
  });
  
  this.queryVeh.patchValue({
    vehileTypeID:"-1"
  });
  this.vmForm.patchValue({
    vehileTypeID:"-1"
  });
  this.vehMasterList=[];
 this.tabselect2="1";
 
 
}

setTabSel(n:string){
  if (n=='1')
    this.tabselect2='1';
    if (n=='2')
    this.tabselect2='2';
}
}
