import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncatePipe'
})
export class TruncatePipePipe implements PipeTransform {

  transform(text: string, lengthLimit?: number): string {
    if (!lengthLimit || text.length <= lengthLimit) {
      return text;
    }

    return `${text.slice(0, lengthLimit)}...`;
  }

}
