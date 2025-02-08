import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterName'
})
export class FilterTaskNamePipe implements PipeTransform {
    transform(value: any, filterString: string, propName: string): any {
        if (value.length === 0 || filterString === '') {
            return value;
        }
        const resultArray = [];
        for (let item of value) {
            if (item[propName].toLowerCase().replaceAll(' ', '').includes(filterString.toLowerCase().replace(' ', ''))) {
                resultArray.push(item);
            }
        }
        return resultArray;
    }
}
