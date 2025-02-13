// *************** Angular Imports ***************
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})

// *************** Pipe For Truncate String That Receive An Argument For It's Limit
export class ShortenPipe implements PipeTransform {
    transform(value: string, limit: number): string {
        return value.length > limit ? value.substring(0, limit) + '...' : value;
    }
}
