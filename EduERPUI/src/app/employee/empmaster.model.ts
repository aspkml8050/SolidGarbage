export class Empmaster {
    public  empID :string="";
    public  vehileID :string="";
    public  titleID :number=-1; //b05_
    public  empName :string="";
    public  empCode :string="";
    public  vehicleNo :string="";
    public  genderID :number=-1; //m01_
    public  fatherName :string="";
    public   motherName:string="";
    public  spouseName :string="";
    public mobileNo  :string="";
    public  workingStatusID :number=-1;
    public panNumber  :string="";
    public addharNo  :string="";
    public email  :string="";
    public  dlno :string="";
    public  dob :Date;
    public  doj:Date;
    public   dor:Date;
    public  PerCountryID :number=-1;
    public  PerStateID  :number=-1;
    public  PerDistrictID  :number=-1;
    public  perPincode :string="";
    public  perAddress :string="";
    public  CorCountryID :number=-1;
    public  CorStateID  :number=-1;
    public  CorDistrictID  :number=-1;
    public  corPincode :string="";
    public   corAddress:string="";
    public   empPhotoBase64:string="";
    public   empSignatureBase64:string="";
    public  entryDate :Date;
    public  u01_EnterByID :string="";
    public updateDate  :Date;
    public u01_UpdateByID  :string="";

}

export class EmpmasterList{
     result: Empmaster[]=[];
}

export class Title2 {
    public titleID:number=-1;
    public titleName:string="";
}
export class TitleList {
       result:Title2[]=[];
}
export class Gender {
    public genderID:number=-1;
    public genderName:string="";
    public genderCode:string="";
}
export class GenderList {
       result:Gender[]=[];
}
export class Country {
    public countryID:number=-1;
    public countryName:string="";
    public countryCode:string="";
}
export class CountryList {
    result:Country[]=[];

}
export class State {
    public stateID:Number=-1;
    public m02_CountryID:number=-1;
    public stateName:string="";
    public stateCode:string="";
}
export class StateList {
       result:State[]=[];
}
export class District {
    public districtID    :number=-1;
    public m03_StateID:number=-1;
    public districtName:string="";
    public districtCode:string="";
}
export class DistrictList {
       result:District[]=[];
}

export class WorkingStatus{
    public workingStatusID:number=-1;
    public workingStatusName:string="";
}
export class WorkingStatusList{
result:WorkingStatus[]=[];
}

export class Vehiclemaster {
    public    vehileID:string="-1";
    public  vehileName:string="";
    public     vehileCode:string="";
    public     vehileCatID:number=-1;
    public     vehileTypeID:number=-1;
    public     deviceID:string="-1";
    public purchaseYear:number=-1;
    public     modelNo:string="";
    public     serialNo:string="";
    public     vehicleNo:string="";
    public     chesisNo:string="";
    public     vehicleEmptyWeight:number=-1;
    
   //    u01_CreateBYID:bigint=BigInt(-1);
     //  u01_ModifyBYID:bigint=BigInt(-1);
     //  entryDate?:Date;
       //updateDate?:Date;
   }
   export class VehicleMasterList{
     result:Vehiclemaster[]=[];
   }

   export class Device{
   public deviceID :string="";
   public deviceName:string="";
   }

   export class DeviceList{
     result:Device[]=[];

   }