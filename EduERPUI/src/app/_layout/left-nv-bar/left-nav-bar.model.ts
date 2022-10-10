export class result7{
    moduleID : string="";
    packageID: number = 2 ;
    mModuleName: string= "";
    uS11_MModuleID: number = -1;
    displayOrder: number= 1;
    menuClass: string = "";
    menuIcon: string = "";
    forms: result5[] =[]
}
export class result5{
    formID : number = -1;
    formName: string ="";
    displayName: string ="";
    displayOrder : number = -1 ;
    mModuleID: number = 1;
    // "sectionID": 8,
    // "isMenu": true,
    // "remark": "",
    // "isPortal": false,
    // "formImage": ""
}   
 export class resultSet
 {
    result7: result7 [] =[];
 }