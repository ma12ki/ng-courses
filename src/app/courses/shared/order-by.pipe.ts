import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'cOrderBy' })
export class OrderByPipe implements PipeTransform {
  public transform(items: any[], attr) {
    return items.sort((a, b) => {
      return a[attr] - b[attr];
    });
  }
}
