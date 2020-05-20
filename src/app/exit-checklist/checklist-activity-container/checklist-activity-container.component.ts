/**
 * @author Nurali K
 * @description Container Component for Displaying My Activity List
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExitChecklist } from '../exit-checklist.service';
import { MyActivity } from '../models/my-activity.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'checklist-activity-container',
  templateUrl: './checklist-activity-container.component.html',
})
export class ChecklistActivityContainer implements OnInit {

  public myActivities$: Observable<MyActivity[]>;

  constructor(private pathVar: ActivatedRoute,
              private exitCheckListService: ExitChecklist) { }

  public ngOnInit(): void {
    this.myActivities$ = this.getMyActivities();
  }

  /**
   * getMyActivities
   */
  private getMyActivities(): Observable<MyActivity[]> {
    return this.pathVar.paramMap.pipe(
      filter((pathVar: ParamMap) => pathVar.has('resignationId')),
      switchMap((pathVar: ParamMap) => {
        const resignationId: string = pathVar.get('resignationId');
        return this.exitCheckListService.getMyActivities(resignationId);
      }));
  }

}
