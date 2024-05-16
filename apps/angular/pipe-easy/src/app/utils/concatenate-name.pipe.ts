import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatenateName',
  standalone: true,
})
export class ConcatenateNamePipe implements PipeTransform {
  transform(value: string, index: number) {
    return `${value} - ${index}`;
  }
}
