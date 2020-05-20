import { Pipe, PipeTransform } from '@angular/core';
import { ResignationDetails } from 'src/app/resignation/models/resignation-model/resignationDetail.model';
/**
 * reverse Pipe
 * @author Kalrav Shah
 */
@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  /**
   * transform
   * @param value 
   * @description This pipe is used to reverse the oder of resignation cards
   */
  public transform(value: ResignationDetails[]): ResignationDetails[] {
    return value.slice().reverse();
  }

}
