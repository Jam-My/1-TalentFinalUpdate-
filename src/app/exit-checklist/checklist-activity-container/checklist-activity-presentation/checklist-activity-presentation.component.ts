/**
 * @author Nurali K
 * @description Presntation Component for Displaying My Activity List
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MyActivity } from '../../models/my-activity.model';
import { ChecklistActivityPresenter } from '../checklist-activity-presenter/checklist-activity-presenter.service';


@Component({
  selector: 'checklist-activity-presentation-ui',
  templateUrl: './checklist-activity-presentation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ChecklistActivityPresenter]
})
export class ChecklistActivityPresentation {

  @Input()
  public set myActivities(value: MyActivity[]) {
    if (value) {
      this._myActivities = value;
    }
  }

  public get myActivities(): MyActivity[] {
    return this._myActivities;
  }

  /**
   * Shortened Getter Name  to be used in template which return myActivity
   */
  public get resp(): MyActivity[] {
    return this._myActivities;
  }

  public get myActivity(): MyActivity {
    if (this.myActivities) {
      return this.myActivities[0];
    }
  }

  private _myActivities: MyActivity[];

  constructor() { }

}
