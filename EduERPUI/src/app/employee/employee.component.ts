import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit,ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from '@angular/platform-browser';
import { Observable, timeInterval } from 'rxjs';
import { Country, Gender, SuccessStatus } from '../common-models';
import { globalConstant } from '../global-variable';
import { CountryList, Device, DeviceList, District, DistrictList, Empmaster, EmpmasterList, GenderList, State, StateList, Title2, TitleList, Vehiclemaster, VehicleMasterList, WorkingStatus, WorkingStatusList } from './empmaster.model';
import { DatePipe, formatDate } from '@angular/common';
import { trigger } from '@angular/animations';
import { now } from 'jquery';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  filePath: string="";
  myForm: FormGroup;

//  public empli=new EmpmasterList();
public showquery:boolean=true;
   empQuery:FormGroup=new FormGroup({
    empID : new FormControl(''),
     vehileID : new FormControl('-1'),
     b05_TitleID : new FormControl('1'),
     empName : new FormControl(''),
     empCode : new FormControl(''),
     m01_GenderID : new FormControl(-1),
     fatherName : new FormControl(''),
      motherName: new FormControl(''),
     spouseName : new FormControl(''),
    mobileNo  : new FormControl(''),
     e01_WorkingStatusID : new FormControl('-1'),
    panNumber  : new FormControl(''),
    addharNo  : new FormControl(''),
    email  : new FormControl(''),
    dlno : new FormControl(''),
     dob : new FormControl(''),
     doj: new FormControl(''),
      dor: new FormControl(''),
     m02_PerCountryID : new FormControl(-1),
     m03_PerStateID  : new FormControl(-1),
     m04_PerDistrictID  : new FormControl(-1),
     perPincode : new FormControl(''),
     perAddress : new FormControl(''),
     m02_CorCountryID : new FormControl(-1),
     m03_CorStateID  : new FormControl(-1),
     m04_CorDistrictID  : new FormControl(-1),
     corPincode : new FormControl(''),
      corAddress: new FormControl(''),
     entryDate : new FormControl(''),
     u01_EnterByID : new FormControl(-1),
//    updateDate  : new FormControl(),
  //  u01_UpdateByID  : new FormControl()
  filtertext:new FormControl('')
  })
  empEntry:FormGroup=new FormGroup({
    empID : new FormControl('-1'),
     vehileID : new FormControl('-1'),
     b05_TitleID : new FormControl('1'),
     empName : new FormControl(''),
     empCode : new FormControl(''),
     m01_GenderID : new FormControl(-1),
     fatherName : new FormControl(''),
      motherName: new FormControl(''),
     spouseName : new FormControl(''),
    mobileNo  : new FormControl(''),
     e01_WorkingStatusID : new FormControl('-1'),
    panNumber  : new FormControl(''),
    addharNo  : new FormControl(''),
    email  : new FormControl(''),
    dlno : new FormControl(''),
     dob : new FormControl(new Date()),
     doj: new FormControl(new Date()),
      dor: new FormControl(new Date()),
     m02_PerCountryID : new FormControl(-1),
     m03_PerStateID  : new FormControl(-1),
     m04_PerDistrictID  : new FormControl(-1),
     perPincode : new FormControl(''),
     perAddress : new FormControl(''),
     m02_CorCountryID : new FormControl(-1),
     m03_CorStateID  : new FormControl(-1),
     m04_CorDistrictID  : new FormControl(-1),
     corPincode : new FormControl(''),
      corAddress: new FormControl(''),
     entryDate : new FormControl(''),
     u01_EnterByID : new FormControl(-1),
//    updateDate  : new FormControl(),
  //  u01_UpdateByID  : new FormControl()
  empPhotoBase64:new FormControl(''),
  empSignatureBase64:new FormControl(''),
  filtertext:new FormControl('')
  })

 public queryEmployee=new Empmaster();
  public tabselect:string="1";
public  titleList=new TitleList();
public  EmpmasterList=new EmpmasterList();
public  GenderList=new GenderList();
public  CountryListPer=new CountryList();
public  CountryListCur=new CountryList();
public  StateListPer=new StateList();
public  StateListCur=new StateList();
public  DistrictList=new DistrictList();
public  DistrictListCur=new DistrictList();
public VehList=new VehicleMasterList();
public WorkStatList=new WorkingStatusList();
public deviceList=new DeviceList();


public empList:Empmaster[]=[];
public country:Country;

  constructor(public fb: FormBuilder, private http: HttpClient,private datePipe:DatePipe,private el:ElementRef) {
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    })
  }
  ngOnInit(): void {
    this.getMasters();

  }

  setTabSel(n:string){
    if (n=='1')
      this.tabselect='1';
      if (n=='2')
      this.tabselect='2';
  }

  Reset(){
    this.imagedata="";
    this.signaturedata="";
this.empQuery.reset();
this.empQuery.get('m01_GenderID').setValue("-1");
this.empList=[]=[];
this.empEntry.reset();
this.empEntry.patchValue({
  vehileID:-1,
  m02_PerCountryID:-1,
  m03_PerStateID:-1,
  m04_PerDistrictID:-1,
  m02_CorCountryID:-1,
  m03_CorStateID:-1,
  m04_CorDistrictID:-1,
  b05_TitleID:-1,
  m01_GenderID:-1,
  e01_WorkingStatusID:-1,
  empPhotoBase64:"",
  empSignatureBase64:""


})
  }

  opclose(){
    this.showquery=!this.showquery;    
  }
  
  getMasters(){
    
   this.getCountry$().subscribe({
    next:(response)=>{
      let cntr=new Country();
      cntr.countryID=-1;
      cntr.countryName="---All---";
     this.CountryListPer.result.push(cntr);
     this.CountryListCur.result.push(cntr);
     response.result.forEach(x=>{
      this.CountryListPer.result.push(x);
      this.CountryListCur.result.push(x);
     })
    }
   });
   this.getState$().subscribe({
    
    next:(resp)=>{
      this.StateListCur=new  StateList();
      this.StateListPer=new  StateList();
      let st=new State();
      st.stateID=-1;
      st.stateName="---All---";
     this.StateListCur .result.push(st);
     this.StateListPer .result.push(st);
     resp.result.forEach(x=>{
      this.StateListCur.result.push(x);
      this.StateListPer.result.push(x);
     })
    }
   });
  this.getTitle$().subscribe({
    next:(resp)=>{
      let t=new Title2();
       t.titleID=-1;
       t.titleName="---All---";
      this.titleList.result.push(t);
      resp.result.forEach(x=>{
        this.titleList.result.push(x);
       })
    }
  })
  this.getGender$().subscribe({
    next:(resp)=>{
      let g=new Gender();
      g.genderID=-1;
      g.genderName="---All---";
      resp.result.push(g);
      resp.result.forEach(x=>{
        this.GenderList.result.push(x);
       })
    }
  })
  this.getdevice$().subscribe({
    next:(resp)=>{
      let g=new Device();
      g.deviceID="-1";
      g.deviceName="---All---";
      resp.result.push(g);
      resp.result.forEach(x=>{
        this.deviceList.result.push(x);
       })
    }
  })

  let s=this.empEntry.controls['m03_PerStateID'].value;
  let stateid=-1;
  if ((s=='-1') || (s==null) || (s=='')){

  }else{
    stateid=Number(s);

  }
  this.getDistrict$(stateid).subscribe({
    next:(resp)=>{
      this.DistrictList.result=[];
      this.DistrictListCur.result=[];
      let d=new District();
      d.districtID=-1;
      d.districtName="---All---";
      this.DistrictList.result.push(d);
      this.DistrictListCur.result.push(d);
      resp.result.forEach(x=>{
        this.DistrictList.result.push(x);
        this.DistrictListCur.result.push(x);
      })
      }
  })
let vm=new Vehiclemaster();
  this.getVehicle$(vm).subscribe({
    next:(resp)=>{
      let v=new Vehiclemaster();
      v.vehileID='-1';
      v.vehicleNo='---All---';
      this.VehList.result.push(v);
      resp.result.forEach(d=>{
        this.VehList.result.push(d);
      })
    }
  })
  this.getWorkStatus$().subscribe({
    next:(resp)=>{
      let w=new WorkingStatus();
      w.workingStatusID=-1;
      w.workingStatusName='---All---';
      this.WorkStatList.result.push(w);
      resp.result.forEach((d)=>{
        this.WorkStatList.result.push(d);
      })
    }
  })

  }
  selectDistrinct(stateid:number){
    this.DistrictList.result=[];
    this.getDistrict$(stateid).subscribe({
      next:(resp)=>{
        let d=new District();
        d.districtID=-1;
        d.districtName="---All---";
        this.DistrictList.result.push(d);
        resp.result.forEach(x=>{
          this.DistrictList.result.push(x);
         })
      }
    })

  }
    //public  DistrictList=new DistrictList();
    selectDistrinctCur(stateid:number){
      this.DistrictListCur.result=[];
      this.getDistrict$(stateid).subscribe({
        next:(resp)=>{
          let d=new District();
          d.districtID=-1;
          d.districtName="---All---";
          this.DistrictListCur.result.push(d);
          resp.result.forEach(x=>{
            this.DistrictListCur.result.push(x);
           })
        }
      })
    }
  
  public getCountry$(): Observable<CountryList>{
    return this.http.get<CountryList>(  '' + globalConstant.apiUrl + 'Master/GetCountry/-1');
  }
  public getState$(): Observable<StateList>{
    return this.http.get<StateList>(  '' + globalConstant.apiUrl + 'Master/GetState/-1');
  }
  public getTitle$(): Observable<TitleList>{
    return this.http.get<TitleList>(  '' + globalConstant.apiUrl + 'Master/GetTitle/-1');
  }
  public getGender$(): Observable<GenderList>{
    return this.http.get<GenderList>(  '' + globalConstant.apiUrl + 'Master/GetGender/-1');
  }
  public getDistrict$(stateid:number): Observable<DistrictList>{
    return this.http.get<DistrictList>(  '' + globalConstant.apiUrl + 'Master/GetDistrict/-1/'+stateid);
  }
  public getWorkStatus$(): Observable<WorkingStatusList>{
    return this.http.get<WorkingStatusList>(  '' + globalConstant.apiUrl + 'Master/GetWorkingStatus/-1');
  }
  public getVehicle$(data:Vehiclemaster): Observable<VehicleMasterList>{
    return this.http.post<VehicleMasterList>(  '' + globalConstant.apiUrl + 'Vehicle/GetVehicleList/',data);
  }
  public getEmpdata$(empqdata:Empmaster): Observable<EmpmasterList>{
    return this.http.post<EmpmasterList>(  '' + globalConstant.apiUrl + 'Employee/GetEmployee',empqdata);
  }
  public getEmpdataById$(empid:string): Observable<EmpmasterList>{
    return this.http.get<EmpmasterList>(  '' + globalConstant.apiUrl + 'Employee/GetEmpById/'+empid);
  }
  public getdevice$(): Observable<DeviceList>{
    return this.http.get<DeviceList>(  '' + globalConstant.apiUrl + 'Master/GetDevice/-1');
  }


  imagePreview(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];

    this.myForm.patchValue({
      img: file
    });

    this.myForm.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  public imagedata:string="";
  public signaturedata:string="";

  findEmployee():any {
  this.queryEmployee.empID=this.empQuery.get('empID')?.value;
  if ((this.queryEmployee.empID=='') || (this.queryEmployee.empID==null))
    this.queryEmployee.empID='-1';
  this.queryEmployee.empName=this.empQuery.get('empName')?.value==null?"":this.empQuery.get('empName')?.value;
  this.queryEmployee.genderID=-1;//this.empQuery.get('m01_GenderID')?.value;
  this.queryEmployee.mobileNo=this.empQuery.get('mobileNo')?.value==null?"":this.empQuery.get('mobileNo')?.value;
  this.queryEmployee.panNumber=this.empQuery.get('panNumber')?.value==null?"":this.empQuery.get('panNumber')?.value;
  this.queryEmployee.addharNo=this.empQuery.get('addharNo')?.value==null?"":this.empQuery.get('addharNo')?.value; 
  this.queryEmployee.email=this.empQuery.get('email')?.value==null?"":this.empQuery.get('email')?.value;
  this.queryEmployee.dlno='';
  this.queryEmployee.vehileID='-1';
  this.queryEmployee.titleID=-1;
  this.queryEmployee.titleID=-1;
   this.queryEmployee.workingStatusID=-1;
  this.queryEmployee.CorCountryID=-1;
  this.queryEmployee.CorStateID=-1;
  this.queryEmployee.CorDistrictID=-1;
  this.queryEmployee.PerDistrictID=-1;
  this.queryEmployee.PerCountryID=-1;
  this.queryEmployee.PerStateID=-1;
  this.queryEmployee.u01_EnterByID='-1';
  this.queryEmployee.u01_UpdateByID='-1';

this.queryEmployee.vehicleNo='';
//return;
this.getEmpdata$(this.queryEmployee).subscribe({
  next:(d)=>{
    let retlist:Empmaster[]=[];
    this.empList=retlist;
    d.result.forEach(r=>{
      this.empList.push(r);
    })
  },
  error:(e)=>{
    alert(e);
  }
})
  }

  onImageAttached(event): void {
    const reader = new FileReader();
  
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.empEntry.patchValue({
          empPhotoBase64: reader.result
        });
        // need to run CD since file load runs outside of zone
      //  this.cd.markForCheck();
      };
    }
  }
  //
  onSignatureAttached(event): void {
    const reader = new FileReader();
  
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.empEntry.patchValue({
          empSignatureBase64 : reader.result
        });
        // need to run CD since file load runs outside of zone
      //  this.cd.markForCheck();
      };
    }
  }

  UpdEmployee(emp:Empmaster){
    let empfind=new Empmaster();
    empfind.vehileID='-1';
    empfind.titleID=-1;
    empfind.workingStatusID=-1;
    empfind.CorCountryID=-1;
    empfind.CorStateID=-1;
    this.queryEmployee.CorDistrictID=-1;
    this.queryEmployee.PerDistrictID=-1;
    this.queryEmployee.PerCountryID=-1;
    this.queryEmployee.PerStateID=-1;
    empfind.vehicleNo=emp.vehicleNo;
    this.tabselect="2";
    this.getEmpdataById$(emp.empID).subscribe({
      next:(d)=>{
console.log(d.result[0].empPhotoBase64);
if (d.result[0].empPhotoBase64!=""){
  this.imagedata=d.result[0].empPhotoBase64;
}
if (d.result[0].empSignatureBase64!=""){
  this.signaturedata=d.result[0].empSignatureBase64;
}
          this.empEntry.patchValue({
            empID:d.result[0].empID,
            b05_TitleID:d.result[0].titleID,
            vehileID:d.result[0].vehileID,
            empName:d.result[0].empName,
            empCode:d.result[0].empCode,
            m01_GenderID:d.result[0].genderID,
            fatherName:d.result[0].fatherName,
            motherName:d.result[0].motherName,
            spouseName:d.result[0].spouseName,
            mobileNo:d.result[0].mobileNo,
            workingStatusID:d.result[0].workingStatusID,
            panNumber:d.result[0].panNumber,
            addharNo:d.result[0].addharNo,
            email:d.result[0].email,
            dlno:d.result[0].dlno,
            PerCountryID:d.result[0].PerCountryID,
            PerStateID:d.result[0].PerStateID,
            PerDistrictID:d.result[0].PerDistrictID,
            perPincode:d.result[0].perPincode,
            perAddress:d.result[0].perAddress,
            CorCountryID:d.result[0].CorCountryID,
            CorStateID:d.result[0].CorStateID,
            CorDistrictID:d.result[0].CorDistrictID,
            corPincode:d.result[0].corPincode,
            corAddress:d.result[0].corAddress,
            empPhotoBase64:d.result[0].empPhotoBase64,
            empSignatureBase64:d.result[0].empSignatureBase64
        });
        this.empEntry.patchValue({
          dob:  this.datePipe.transform(  d.result[0].dob,'yyyy-MM-dd'),
          doj:  this.datePipe.transform(  d.result[0].doj,'yyyy-MM-dd'),
          dor:  this.datePipe.transform(  d.result[0].dor,'yyyy-MM-dd')
        });
      },
      error:(e)=>{
        alert(e);
      }
    })
          
    }


    SaveEmp():any{
      let vald:boolean=true;
     const en = document.getElementById('inpEmpname');
     if (this.empEntry.get('empName').value==''){
      document.getElementById('spaninpEmpname').classList.add('reqd');
      document.getElementById('spaninpEmpname').classList.remove('fild');
      vald=false;
     }else{
      document.getElementById('spaninpEmpname').classList.remove('reqd');
      document.getElementById('spaninpEmpname').classList.add('fild');
     }
     if (this.empEntry.get('m01_GenderID').value==-1){
      document.getElementById('spanselegender').classList.remove('fild');
       document.getElementById('spanselegender').classList.add('reqd');
      vald=false;
     }else{
      document.getElementById('spanselegender').classList.remove('reqd');
      document.getElementById('spanselegender').classList.add('fild');
     }

if (this.empEntry.get('e01_WorkingStatusID').value==-1){
  document.getElementById('spanWorkingSt').classList.remove('fild');
   document.getElementById('spanWorkingSt').classList.add('reqd');
  vald=false;
 }else{
  document.getElementById('spanWorkingSt').classList.remove('reqd');
  document.getElementById('spanWorkingSt').classList.add('fild');
 }
 
 if (this.empEntry.get('mobileNo').value==""){
  document.getElementById('spanMobilename').classList.remove('fild');
   document.getElementById('spanMobilename').classList.add('reqd');
  vald=false;
 }else{
  document.getElementById('spanMobilename').classList.remove('reqd');
  document.getElementById('spanMobilename').classList.add('fild');
 }
if (this.empEntry.get('dlno').value==""){
  document.getElementById('spanDLno').classList.remove('fild');
   document.getElementById('spanDLno').classList.add('reqd');
  vald=false;
 }else{
  document.getElementById('spanDLno').classList.remove('reqd');
  document.getElementById('spanDLno').classList.add('fild');
 }
 if (this.empEntry.get('vehileID').value==-1){
  document.getElementById('spanselvehicle').classList.remove('fild');
   document.getElementById('spanselvehicle').classList.add('reqd');
  vald=false;
 }else{
  document.getElementById('spanselvehicle').classList.remove('reqd');
  document.getElementById('spanselvehicle').classList.add('fild');
 }

 if (!vald){
  alert("fill * marked fields");
  return;
 }    
 let mobpattern=new RegExp( /^[6-9]\d{9}$/ );
 let vmo= mobpattern.test(this.empEntry.get('mobileNo').value);
if (!vmo){
  alert("Mobile is not correct");
  return;
}
let emapat=new RegExp(/\S+@\S+\.\S+/);
let ema= emapat.test(this.empEntry.get('email').value);
if ((!ema) &&  ( this.empEntry.get('email').value!=''  )){
  alert("Email is not correct");
  return;
}
let adharpat=new RegExp(/\d{12}/);
let entadhar=this.empEntry.get('addharNo').value==null?"":this.empEntry.get('addharNo').value;
if ((entadhar.length==0) || (entadhar.length==12)){

}else{
  if (adharpat.test(entadhar)==false){
    alert("Aadhar is not correct");
    return;
  
  }
}

let savbody=new Empmaster();
  savbody.empID=this.empEntry.get('empID')?.value;
  savbody.titleID=this.empEntry.get('b05_TitleID')?.value;
  savbody.vehileID=this.empEntry.get('vehileID')?.value;
  savbody.empName=this.empEntry.get('empName')?.value;
  savbody.empCode=this.empEntry.get('empCode')?.value;
  savbody.genderID=this.empEntry.get('m01_GenderID')?.value;
  savbody.fatherName=this.empEntry.get('fatherName')?.value;
  savbody.motherName=this.empEntry.get('motherName')?.value;
  savbody.spouseName=this.empEntry.get('spouseName')?.value;
  savbody.mobileNo=this.empEntry.get('mobileNo')?.value;
  savbody.workingStatusID=this.empEntry.get('e01_WorkingStatusID')?.value;
  savbody.panNumber=this.empEntry.get('panNumber')?.value;
  savbody.addharNo=this.empEntry.get('addharNo')?.value;
  savbody.email=this.empEntry.get('email')?.value;
  savbody.dlno=this.empEntry.get('dlno')?.value;
  savbody.dob=this.empEntry.get('dob')?.value;
  savbody.doj=this.empEntry.get('doj')?.value;
  savbody.dor=this.empEntry.get('dor')?.value;

  
savbody.PerCountryID=this.empEntry.get('m02_PerCountryID')?.value;
savbody.PerStateID=this.empEntry.get('m03_PerStateID')?.value;
savbody.PerDistrictID=this.empEntry.get('m04_PerDistrictID')?.value;
savbody.perPincode=this.empEntry.get('perPincode')?.value;
savbody.perAddress=this.empEntry.get('perAddress')?.value;
savbody.CorCountryID=this.empEntry.get('m02_CorCountryID')?.value;
savbody.CorStateID=this.empEntry.get('m03_CorStateID')?.value;
savbody.CorDistrictID=this.empEntry.get('m04_CorDistrictID')?.value;
savbody.corPincode=this.empEntry.get('corPincode')?.value;
savbody.corAddress=this.empEntry.get('corAddress')?.value;
savbody.empPhotoBase64=this.empEntry.get('empPhotoBase64')?.value;
savbody.empSignatureBase64=this.empEntry.get('empSignatureBase64')?.value;
savbody.entryDate=new Date();
savbody.u01_EnterByID="-1";
savbody.u01_UpdateByID="-1";
savbody.updateDate=new Date();

this.saveEmpdata$(savbody).subscribe({
  next:(d)=>{
    console.log(d);
    alert(d.msg);
  },
  error:(e)=>{
    alert(e);
  }
})

}
  submit() {
    alert('1');
    console.log(this.myForm.value)
    alert('2');
  }

  public saveEmpdata$(empdata:Empmaster): Observable<SuccessStatus>{
    return this.http.post<SuccessStatus>(  '' + globalConstant.apiUrl + 'Employee/SaveEmployee',empdata);
  }
  opit(){
  }
public orgPerstate=undefined;
  finperstate(e){
    if (this.orgPerstate==undefined){
      this.orgPerstate=this.StateListPer.result;
    }
    let tes=e.target.value;
    if (tes=='') {
      this. StateListPer.result=this.orgPerstate;
    }else{
      let fil=this.orgPerstate.filter ((t) =>{ return  t.stateName.toLocaleLowerCase().includes(tes.toLocaleLowerCase()) });
      this.StateListPer.result=fil;
    }
  
  }
  public originalglist=undefined;
  searchEmployee(ev){
    let v=ev.target.value;
  if (this.originalglist==undefined){
    this.originalglist=this.empList;
 }
    var retl=this.originalglist.filter((item) =>{
      return        item.empName.toLocaleLowerCase() .includes(v.toLocaleLowerCase())
      || item.fatherName.toLocaleLowerCase() .includes(v.toLocaleLowerCase())
      || item.perAddress.toLocaleLowerCase() .includes(v.toLocaleLowerCase())
     
    });
    this.empList=retl;
    if (v==''){
      this.empList=this.originalglist;
 
    }
  }
 

}


