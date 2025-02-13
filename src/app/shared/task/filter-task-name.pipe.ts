// *************** Angular Imports ***************
import { Pipe, PipeTransform } from "@angular/core";

// *************** Application Pipes ***************
@Pipe({
    name: 'filterName'
})

// *************** Function For Modify String To LowerCase For Filtering Data
export class FilterTaskNamePipe implements PipeTransform {
    transform(value: any, filterString: string, propName: string): any {
        if (value.length === 0 || filterString === '') {
            return value;
        }
        const resultArray = [];
        for (let item of value) {
            if (item[propName].toLowerCase().includes(filterString.toLowerCase())) {
                resultArray.push(item);
            }
        }
        return resultArray;
    }
}
