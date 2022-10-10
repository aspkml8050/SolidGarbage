import { DatePipe } from "@angular/common";

export class DatePicker {
    _date: string | null = "" ;
    constructor(
        private datePipe: DatePipe
    ) { }
    set date(value :  Date) {
        this._date = this.datePipe.transform(value, 'yyyy-MM-dd');
    }
    get date(): any {
        return this._date;
    }
}