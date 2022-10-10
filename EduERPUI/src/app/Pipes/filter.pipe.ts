import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, searchText: string) {
    if (!value || !searchText) {
      return value;
    }
    let isDataFound: boolean = false;
    const searchResult = [];
    for (const searchValue of value) {
      if (searchValue['subjectName']) {
        if (
          searchValue['subjectName']
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
        ) {
          searchResult.push(searchValue);
          isDataFound = true;
        }
      }
    }
    if (isDataFound) {
      return searchResult;
    }
    for (const searchValue of value) {
      if (
        searchValue['candName']
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        searchValue['grNo']
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        searchValue['actualBranch']
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ) {
        searchResult.push(searchValue);
      }
    }
    return searchResult;
  }
}
