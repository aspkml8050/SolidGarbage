export class CommonMOdel {
}
export class Year {
  aYearID: number = -1;
  aYearCode: string = '';
  isCurrent:boolean=false;
}
export class AcademicYearList {
  result: Year[] = [];
}
export class Semester {
  public semesterID: number = -1;
  public semName: string = '';
  public isCurrent:boolean=false;
}
export class SemesterList {
  result: Semester[] = [];
  isSuccess: boolean = false;
  msg: string = '';
}
export class Course {
  courseID: number = -1;
  courseName: string = '';
}
export class CourseList {
  result: Course[] = [];
}
export class CandClass {
  classID: number = -1;
  className: string = '';
  classCode:string='';
}
export class ClassList {
  result: CandClass[] = [];
}

export class Branch {
  branchID: number = -1;
  branchName: string = '';
  branchCode:string='';
}

export class BranchList {
  result: Branch[] = [];
}

export class Division {
  divisionID: number = -1;
  divisionName: string = '';
  divisionCode:string='';
}
export class DivisionList {
  result: Division[] = [];
}
export class SubjectType{
  sTypeID:number=-1;
  sTypeName:string='';
  sTypeCode:string='';
  useCode:string='';
  sortOrder:string='';
}
export class SubjectTypeList {
  result: SubjectType[] = [];
  isSuccess: boolean = false;
  msg: string = '';
}
