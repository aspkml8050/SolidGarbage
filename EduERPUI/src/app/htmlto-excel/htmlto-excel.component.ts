import { Component, OnInit } from '@angular/core';
import { ExcelService, ROW_ITEM } from '../services/excel.service';

@Component({
  selector: 'app-htmlto-excel',
  templateUrl: './htmlto-excel.component.html',
  styleUrls: ['./htmlto-excel.component.scss']
})
export class HTMLtoExcelComponent implements OnInit {
  
  dataForExcel: ROW_ITEM[] = [];
  empPerformance = [
    {
      ID: 10011,
      NAME: 'A',
      DEPARTMENT: 'Sales',
      MONTH: 'Jan',
      YEAR: 2022,
      SALES: 132412,
      CHANGE: 12,
      LEADS: 35,
    },
    {
      ID: 10012,
      NAME: 'A',
      DEPARTMENT: 'Sales',
      MONTH: 'Feb',
      YEAR: 2022,
      SALES: 232324,
      CHANGE: 2,
      LEADS: 443,
    },
    {
      ID: 10013,
      NAME: 'A',
      DEPARTMENT: 'Sales',
      MONTH: 'Mar',
      YEAR: 2022,
      SALES: 542234,
      CHANGE: 45,
      LEADS: 345,
    },
    {
      ID: 10014,
      NAME: 'A',
      DEPARTMENT: 'Sales',
      MONTH: 'Apr',
      YEAR: 2022,
      SALES: 223335,
      CHANGE: 32,
      LEADS: 234,
    },
    {
      ID: 10015,
      NAME: 'A',
      DEPARTMENT: 'Sales',
      MONTH: 'May',
      YEAR: 2022,
      SALES: 455535,
      CHANGE: 21,
      LEADS: 12,
    },
  ];

  constructor(public ete: ExcelService) {}
  ngOnInit(): void {
  }
  exportToExcel() {
    this.empPerformance.forEach((row: ROW_ITEM) => {
      this.dataForExcel.push(row);
    });

    let reportData = {
      title: 'Employee Sales Report - Jan 2022',
      data: this.dataForExcel,
      headers: Object.keys(this.empPerformance[0]),
    };

    this.ete.exportExcel(reportData);
  }

}
