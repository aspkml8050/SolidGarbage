import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SuccessStatus } from '../common-models';
import { Device, DeviceList, Vehiclemaster, VehicleMasterList } from '../employee/empmaster.model';
import { globalConstant } from '../global-variable';
import { InvalidQueryData, InvalidQueryDataList, InvalidScrapQuery, ScrapCorrection, Updscrapcorrection, Vehicle, VehicleBinVisit, VehicleBinVisitList,  visited } from './updscrapcorrection.model';

@Component({
  selector: 'app-updscrapcorrection',
  templateUrl: './updscrapcorrection.component.html',
  styleUrls: ['./updscrapcorrection.component.scss']
})
export class UpdscrapcorrectionComponent implements OnInit {

  public tabselect:string="1";
  public returnList:InvalidQueryData[]=[];
  public queryResult=new InvalidQueryDataList();
public query = new InvalidScrapQuery();

public vehvisitList:VehicleBinVisit[]=[];
public vehvisit=new VehicleBinVisitList();
dataQuery:FormGroup=new FormGroup({
  fromDate:new FormControl(new Date()),
  toDate:new FormControl(new Date()),
  deviceID:new FormControl('-1'),
  vehicleID:new FormControl('-1')
});
vehicleVisit:FormGroup=new FormGroup({
  scrapVisitID:new FormControl('-1'),
  deviceID:new FormControl('-1'),
  empName:new FormControl('-1'),
  inOutTime:new FormControl(new Date()),
  isIn:new FormControl(false),
  latitude:new FormControl('-1'),
  longitude:new FormControl('-1'),
  rfid:new FormControl('-1'),
  vehicleNo:new FormControl('-1')
})
public deviceList=new DeviceList();
public vehicleList=new VehicleMasterList();
public edit=new Updscrapcorrection();
editScrap:FormGroup=new FormGroup({
  vehileID:new FormControl('-1'),
  inOutDate:new FormControl(new Date()),
  deviceID:new FormControl('-1')
});
public binvisited:visited[]=[];

  constructor(private http: HttpClient,private datePipe:DatePipe) {
   }

  ngOnInit(): void {
    this.getMasters();
    this.Reset();
    this.edit.deviceID="-1";
  }
  setTabSel(n:string){
    if (n=='1')
      this.tabselect='1';
      if (n=='2')
      this.tabselect='2';
  }

  getMasters(){
    let vtrue=new visited();
    vtrue.covered=true;
    vtrue.showcovered="Yes";
    let vfalse=new visited();
    vfalse.covered=false;
    vfalse.showcovered="No";
    this.binvisited.push(vtrue);
    this.binvisited.push(vfalse);
    this.getdevice$().subscribe({
      next:(resp)=>{
        let g=new Device();
        g.deviceID="-1";
        g.deviceName="---Select---";
        resp.result.push(g);
        resp.result.forEach(x=>{
          this.deviceList.result.push(x);
         })
      }
    })
    let vm=new Vehiclemaster();
    this.getVehicle$(vm).subscribe({
      next:(resp)=>{
        let v=new Vehiclemaster();
        v.vehileID='-1';
        v.vehicleNo='---Select---';
        this.vehicleList.result.push(v);
        resp.result.forEach(d=>{
          this.vehicleList.result.push(d);
        });
      }
    })
  }
  findData(){
    let invquery=new InvalidScrapQuery();
    invquery.vehicleID=  this.dataQuery.get('vehicleID')?.value;
    invquery.deviceID=  this.dataQuery.get('deviceID')?.value;
    invquery.fromDate=  this.dataQuery.get('fromDate')?.value;
    invquery.toDate=  this.dataQuery.get('toDate')?.value;
  this.getInvalidList$(invquery).subscribe({
    next:(resp)=>{
      this.returnList=resp.result;    
//console.log(resp);
//console.log(this.returnList[0].vehicleID);
    }
  })
  }

  CorrectData(upd:InvalidQueryData){
    this.vehvisit.result=[]=[];
    let showd=new Updscrapcorrection();
showd.vehicleID=upd.vehicleID;
showd.deviceID="-1";
showd.inOutDate= upd.inOutDate;//  this.editScrap.get('inOutDate')?.value;
this.getEditTranData$(showd).subscribe({
  next:(resp)=>{
    console.log(resp.result);
    //this.vehvisit.result=resp.result;
    resp.result.forEach(x=>{
      let insd=new VehicleBinVisit();
      insd.deviceID=x.deviceID;
      insd.empName=x.empName;
      insd.inOutTime=x.inOutTime;
      insd.isIn=x.isIn;
      insd.latitude=x.latitude;
      insd.longitude=x.longitude;
      insd.rfid=x.rfid;
      insd.scrapVisitID=x.scrapVisitID;
      insd.vehicleName=x.vehicleName;
      insd.vehicleNo=x.vehicleNo;
    
      insd.disabledbutton=false;
      this.vehvisit.result.push(insd);

    })
    console.log(this.vehvisit.result);
    this.setTabSel("2");

  }
})
}
public  selisIn:boolean;
getselected(e:any){

  this.selisIn= e.target.value=='true'?true:false;
}
//public saveCorr=new   ScrapCorrection();
saveIsIn(data:VehicleBinVisit){
  let body={
    scrapVisitID:data.scrapVisitID.toString(),
    isIn:this.selisIn,
    type:1
  };
  console.log(body);

this.saveScrapCorrection$(body).subscribe({
  next:(resp)=>{
    alert(resp.msg);
  }
})
}
public isdisabled=false;
deletevisit( d:VehicleBinVisit){
  let body={
    scrapVisitID:d.scrapVisitID.toString(),
    isIn:this.selisIn,
    type:2
  };
  console.log(body);

this.saveScrapCorrection$(body).subscribe({
  next:(resp)=>{
    alert(resp.msg);
    d.disabledbutton=true;

  }
})
}


  public getdevice$(): Observable<DeviceList>{
    return this.http.get<DeviceList>(  '' + globalConstant.apiUrl + 'Master/GetDevice/-1');
  }
  public getVehicle$(data:Vehiclemaster): Observable<VehicleMasterList>{
    return this.http.post<VehicleMasterList>(  '' + globalConstant.apiUrl + 'Vehicle/GetVehicle/',data);
  }
  public getInvalidList$(data:InvalidScrapQuery): Observable<InvalidQueryDataList>{
    return this.http.post<InvalidQueryDataList>(  '' + globalConstant.apiUrl + 'Vehicle/GetInvalidTran/',data);
  }
  public getEditTranData$(data:Updscrapcorrection): Observable<VehicleBinVisitList>{
    return this.http.post<VehicleBinVisitList>(  '' + globalConstant.apiUrl + 'Vehicle/GetScrapTran/',data);
  }
  public saveScrapCorrection$(data:ScrapCorrection): Observable<SuccessStatus>{
    return this.http.post<SuccessStatus>(  '' + globalConstant.apiUrl + 'Vehicle/SaveScrapCorrection/',data);
  }


  Reset(){
    this.dataQuery.reset;
    this.dataQuery.patchValue({
      vehicleID:"-1",
      deviceID:"-1",
      fromDate:new Date(),
      toDate:new Date()
    });
   this.vehicleVisit.reset;
   this.vehicleVisit.patchValue({
    scrapVisitID:'-1',
    deviceID:'-1',
    inOutTime:new Date(),
    isIn:false,

   })
   this.returnList=[];
   this.queryResult=new InvalidQueryDataList();
   this.query = new InvalidScrapQuery();
   this.vehvisitList=[];
   this.vehvisit=new VehicleBinVisitList();
   this.binvisited=[];
   this.getMasters();
  }
}
