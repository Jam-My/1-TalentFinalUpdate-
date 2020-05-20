import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CompleteChecklistPresenter } from '../complete-checklist-presenter/complete-checklist-presenter.service';
import { ExitProcessStatus } from 'src/app/exit-checklist/models/exitProcessStatus';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'complete-checklist-presentation',
  templateUrl: './complete-checklist-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [CompleteChecklistPresenter],
})
export class CompleteChecklistPresentation implements OnInit {
  public closeForm: Subject<ExitProcessStatus>;
  // public closeActivity: Subject<ExitProcessStatus>;
  public closeActivity$: Observable<ExitProcessStatus>;
  public closeActivity: Subject<ExitProcessStatus>;

  constructor(private completeChecklist: CompleteChecklistPresenter) {
    this.closeForm = new Subject<ExitProcessStatus>();
    // this.closeActivity = new Subject<any>();
    this.closeActivity = new Subject();
    this.closeActivity$ = this.closeActivity.asObservable();
  }

  ngOnInit() {
    this.completeChecklist.closeActivity$.subscribe((data: ExitProcessStatus) => {
      this.closeActivity.next(data);
    })
  }
  public complete() {
    this.completeChecklist.complete()
  }
  public close() {
    this.closeForm.next();
  }
}
