import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ExitProcessStatus } from 'src/app/exit-checklist/models/exitProcessStatus';
import { STATUSSHOW } from 'src/app/exit-checklist/status.constant';

@Injectable()
export class CompleteChecklistPresenter {
  public status = STATUSSHOW;
  public completeprocess;
  closeActivity$: Observable<ExitProcessStatus>;
  closeActivity: Subject<ExitProcessStatus>
  constructor() {
    this.closeActivity = new Subject();
    this.closeActivity$ = this.closeActivity.asObservable();
  }
  public complete() {
    this.completeprocess = [];
    this.completeprocess.push(
      {
        status: STATUSSHOW["Completed "],
        allStatusCheck: true
      }
    )
    this.closeActivity.next(this.completeprocess);
    return this.completeprocess;
  }
}
