export class CandHeadermodel {

}
export class CandHeader{
  candidateID: number = -1;
  uNIQUENO: string = '';
  candName: string = '';
  dOB: Date = new Date();
  classID: number = -1;
  className: string = '';
  courseID: number = -1;
  courseName: string = '';
  branchID: number = -1;
  branchName: string = '';
  divisionID: number = -1;
  divisionName: string = '';
  admissionYearID: number = -1;
  admissionYearCode: string = '';
  isDeleted: boolean = false;
  rollNo: string = '';
  shiftID: number = -1;
  shiftName: string = '';
  aYearID:number=-1;
  semesterID:number=-1;

}
export class Semester {
  public semesterID: number = -1;
  public semName: string = '';
}
export class Year {
  aYearID: number = -1;
  aYearCode: string = '';
  isCurrent:boolean=false;
}
export class CandHeaderList{
  result:CandHeader[]=[];
  isSuccess:boolean=false;
  msg:string="";
}
export class SemesterList {
  result: Semester[] = [];
  isSuccess: boolean = false;
  msg: string = '';
}
export class AcademicYearList {
  result: Year[] = [];
}
