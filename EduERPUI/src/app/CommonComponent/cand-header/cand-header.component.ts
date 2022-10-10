import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AcademicYearList,
  CandHeaderList,
  SemesterList,
} from './cand-headermodel.model';
import { globalConstant } from 'src/app/global-variable';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-cand-header',
  templateUrl: './cand-header.component.html',
  styleUrls: ['./cand-header.component.scss'],
})
export class CandHeaderComponent implements OnInit {
  @Output('GetCandHeader') GetCandHeader: EventEmitter<any> =
    new EventEmitter();
  public SemesterList: SemesterList;
  public AcademicYearList: AcademicYearList;
  public CandHeaderList: CandHeaderList;
  candName: string = '---';
  courseName: string = '---';
  className: string = '---';
  branchName: string = '---';
  divisionName: string = '---';
  rollNo: string = '---';
  candHeaderForm: FormGroup = new FormGroup({
    semesterID: new FormControl('1'),
    aYearID: new FormControl('1'),
    uniqueNo: new FormControl('', Validators.required),
  });
  submitted: boolean = false;
  constructor(private http: HttpClient) {
    this.SemesterList = new SemesterList();
    this.AcademicYearList = new AcademicYearList();
    this.CandHeaderList = new CandHeaderList();
  }
  ngOnInit(): void {
    this.GetAcademicYearList();
    this.GetSemester();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.candHeaderForm.controls;
  }
  GetSemester() {
    const httpParams = new HttpParams({
      fromObject: {
        courseID: -1,
        classID: -1,
        semesterID: -1,
        sectionID: -1,
      },
    });
    this.http
      .get<SemesterList>(
        '' + globalConstant.apiUrl + 'CandidateHeader/GetSemester',
        {
          params: httpParams,
        }
      )
      .subscribe({
        next: (response) => {
          this.SemesterList.result = response.result;
        },
        error: (error) => {
          alert(error);
        },
      });
  }
  GetAcademicYearList() {
    this.http
      .get<AcademicYearList>(
        '' +
          globalConstant.apiUrl +
          'CandidateHeader/GetAcademicYear?aYearID=-1&sectionID=8&isCurrent=-1'
      )
      .subscribe({
        next: (response) => {
          this.AcademicYearList.result = response.result;
        },
      });
  }
  GetCandidateHeader() {
    this.CandHeaderList.result = [];
    const httpParams = new HttpParams({
      fromObject: {
        candidateID: -1,
        uniqueNo: this.f['uniqueNo'].value,
        aYearID: this.f['aYearID'].value,
        sectionID: 8,
        isStudent: false,
      },
    });

    this.http
      .get<CandHeaderList>(
        '' + globalConstant.apiUrl + 'CandidateHeader/GetCandidateHeader',
        {
          params: httpParams,
        }
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.CandHeaderList.result = response.result;
            if (
              this.CandHeaderList.result != null &&
              this.CandHeaderList.result.length > 0
            ) {
              this.candName = this.CandHeaderList.result[0].candName;
              this.courseName = this.CandHeaderList.result[0].courseName;
              this.className = this.CandHeaderList.result[0].className;
              this.branchName = this.CandHeaderList.result[0].branchName;
              this.divisionName = this.CandHeaderList.result[0].divisionName;
              this.rollNo = this.CandHeaderList.result[0].rollNo;
              this.className = this.CandHeaderList.result[0].className;
              this.CandHeaderList.result[0].aYearID = this.f['aYearID'].value;
              this.CandHeaderList.result[0].semesterID =
                this.f['semesterID'].value;
              this.GetCandHeader.emit(this.CandHeaderList);
            } else {
              this.candName = '';
              this.courseName = '---';
              this.className = '---';
              this.branchName = '---';
              this.divisionName = '---';
              this.rollNo = '---';
              this.className = '---';
              this.GetCandHeader.emit(this.CandHeaderList);
            }
          } else {
            this.candName = '';
            this.courseName = '---';
            this.className = '---';
            this.branchName = '---';
            this.divisionName = '---';
            this.rollNo = '---';
            this.className = '---';
            this.GetCandHeader.emit(this.CandHeaderList);
          }
        },
      });
  }
}
