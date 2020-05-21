/**
 * @author Bhargav Baleja
 * @description Sorting Pipe
 */

import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe
 */
@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  /**
   * transform
   * @param value data that have to sort
   * @param fieldName name of the field
   * @param reverse flag represent reverse or not
   */
  public transform(value: any[], fieldName?: any, reverse?: boolean): any {
    const array: any[] = (value || []).sort((a: any, b: any): number => {
      return a[fieldName] > b[fieldName] ? 1 : -1;
    });

    if (reverse) {
      return array.reverse();
    }

    return array;
  }
}
