export class SuccessStatus{
    isSuccess: boolean = false;
    msg: string = "";
}
export class Course{
    courseID :number = -1;
    cTypeID :string =''
    courseName :string  ='';
    courseCode:string  ='';
    duration:string  ='';
    isForOnline :string  ='';
    isPGCourse :string  ='';
}
export class CourseList{
  result : Course[]=[]  ;
}
export class Class
{
    classID :number = -1 ;
    className: string = "";
    classCode :string = "";
}
export class ClassList{ 
  result : Class[]=[]  ;
}

export class Country
{
  countryID : number = -1;
  countryName: string  =  "" ; 
  countryCode: string  =  "" ; 
  nationality: string  =  "" ; 
}
export class CountryList{
  result :  Country[] = [] ;
}


export class Gender
{
  genderID : number = -1;
  genderName: string  =  "" ; 
  genderCode: string  =  "" ; 
}
export class GenderList{
  result :  Gender[] = [] ;
}


export class CasteType
{
  casteTypeID : number = -1;
  casteTypeName: string  =  "" ; 
  casteTypeCode: string  =  "" ; 
}
export class CasteTypeList{
  result :  CasteType[] = [] ;
}

export class Shift{
  shiftID : number = -1 ;
  shiftCode: string = "";
  shiftName : string = "" ;
}
export class ShiftList{
  result :  Shift [] = [] 
}
export class AdmissionType{
    admTypeID : number = -1 ;
    admTypeName : string  = "";
    admTypeCode : string  = "";
    r05_AdmTypeID : number = -1;
    r04_QuotaID : number =  -1 ;
}
export class AdmissionTypeList{
result : AdmissionType [] = [] ;
}


export class Round{
  roundID :  number = -1 ;
  quotaID : number =-1;
  roundName: string = "";
  roundCode:  string = "";
  priority : number  = -1 ;

}
export class RoundList{
result : Round [] =[];
}
export class Quota{
  quotaID : number  = -1 ;
  quotaName : string = "";
  quotaCode: string = "";
}

export class QuotaList{
  result : Quota[] = [] ;
}


export class Bank{
  bankID : number  = -1 ;
  bankName : string = "";
  bankCode: string = "";
  bnankAddress: string = "";
}

export class BankList{
  result : Bank[] = [] ;
}



export class PMode{
  pModeID : number  = -1 ;
  pModeName : string = "";
  pModeCode: string = "";
  forCounter: string = "";
  ForOnline: number = 0;
}

export class PModeList{
  result : PMode[] = [] ;
}