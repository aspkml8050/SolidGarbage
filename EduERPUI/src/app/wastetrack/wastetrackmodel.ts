export class Wastetrackmodel {
    public fromDate:Date;
    public toDate:Date;
    public vehileID:string;
    public pdfXls:string="pdf";
}
export class Vehicle{
    public vehileID:string="";
    public vehicleNo    :string="";
    public selected:boolean=false;
}
export class VehicleList{
    public result:Vehicle[]=[];
}
