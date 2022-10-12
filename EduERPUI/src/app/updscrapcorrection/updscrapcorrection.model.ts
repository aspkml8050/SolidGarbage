export class Updscrapcorrection {
    public vehicleID :string="";
    public deviceID :string="";
    public inOutDate:Date;
}

export class InvalidScrapQuery{
    public fromDate:Date;
    public toDate:Date;
    public deviceID :string="";
    public vehicleID :string="";
}

export class Vehicle{
    public vehicleID :string="";
    public vehileNo :string="";

}
export class InvalidQueryData{
    public vehicleID:string="";
    public inOutDate:Date;
    public vehicleName:string="";
}
export class InvalidQueryDataList{
  result:InvalidQueryData[]=[];
}
export class VehicleBinVisit{
    public deviceID:string="";
    public empName:string="";
    public inOutTime:Date;
    public isIn:boolean=false;
    public latitude:number;
    public longitude:number;
    public rfid:string="";
    public scrapVisitID:string="";
    public vehicleNo:string="";
    public vehicleName:string="";

}
export class VehicleBinVisitList{
    result:VehicleBinVisit[]=[];
}
export class visited{
    public covered:boolean=true;
}
export class ScrapCorrection{
    public scrapVisitID:string="";
    public isIn:boolean=false;
    public type:number=1;
}