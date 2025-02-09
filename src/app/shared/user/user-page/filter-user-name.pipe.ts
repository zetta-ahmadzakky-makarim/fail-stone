import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterName'
})
export class FilterUserNamePipe implements PipeTransform {
    transform(value: any, filterString: string, propName: string): any {
        if (value.length === 0 || filterString === '') {
            return value;
        }
        const resultArray = [];
        for (let item of value) {
            if (item[propName].toLowerCase().replaceAll(/[^a-zA-Z0-9]/g, '').includes(filterString.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''))) {
                resultArray.push(item);
            }
        }
        return resultArray;
    }
}
