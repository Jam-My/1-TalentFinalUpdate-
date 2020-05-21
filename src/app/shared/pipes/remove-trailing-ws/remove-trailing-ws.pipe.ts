import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clear-trail-ws'
})
export class RemoveTrailingWsPipe implements PipeTransform {
  /**
   * transform
   * @param value 
   */
  public transform(value: string): string {
    return value.trim();
  }

}
