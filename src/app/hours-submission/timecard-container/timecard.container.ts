/**
 * @author Shiv Desai
 */

import { Component, OnInit } from '@angular/core';

import { ProjectList } from '../models/project-list.model';
import { Observable } from 'rxjs';
import { TimeCardService } from '../services/time-card.service';
import { TimeCard } from '../models/time-card.model';
import { ToastrService } from 'ngx-toastr';
import { ProjectType } from '../models/hours-type.model';
import { TimeCardStatus } from '../models/timecard-status';


/**
 * Component
 */
@Component({
  selector: 'timecard-container',
  templateUrl: './timecard.container.html'
})
export class TimecardContainer implements OnInit {

  // The project list object will be stored in this variable 
  public projectList$: Observable<ProjectList[]>;
  public timeCardList$: Observable<TimeCard[]>;
  public timeCardStatus$: Observable<TimeCardStatus[]>;
  public projectType$: Observable<ProjectType[]>;
  private employeeID: number = Number(localStorage.getItem('RM'));

  constructor(
    private timeCardService: TimeCardService,
    private toastr: ToastrService
    ) {}

  public ngOnInit(): void {
    this.getProjectList();
    this.getTimeCardList();
    this.getProjectType();
    this.getTimeCardStatus();
  }

  /**
   * This method get the project list object into projectList$ variable
   */
  public getProjectList(): void {    
    this.projectList$ = this.timeCardService.getProjectList(this.employeeID);
  }

  /**
   * This method get the project type object into projectType$ variable
   */
  public getProjectType(): void {
    this.projectType$ = this.timeCardService.getProjectType();
  }

  /**
   * This method get the time card list object into timeCardDetail$ variable
   */
  public getTimeCardList(): void {
    this.timeCardList$ = this.timeCardService.getTimeCardList(this.employeeID);
  }
  /**
   * This method get the time card list object into timeCardDetail$ variable
   */
  public getTimeCardStatus(): void {
    this.timeCardStatus$ = this.timeCardService.getStatus();
  }

  /**
   * to add timeCard
   * @param timeCardDetails timeCard detail
   */
  public addTimeCard(timeCardDetails: TimeCard): void {
    this.timeCardService.addTimeCard(timeCardDetails).subscribe((data: TimeCard) => {
      if (data) {
        this.toastr.success('Time Card Added Successfully...!', 'Success', { timeOut: 2000 });
        this.getTimeCardList();
      }
    });
  }

  /**
   * to update timeCard
   * @param timeCardId time card id
   * @param timeCardDetails time card detail
   */
  public updateTimeCard(timeCardDetails: TimeCard): void {
    // let timeCardId: number = timeCardDetails.id;
    // delete timeCardDetails.id;
    this.timeCardService.updateTimeCard(this.employeeID,timeCardDetails).subscribe((data: TimeCard) => {
      if (data) {
        this.toastr.success('Time Card Updated Successfully...!', 'Success', { timeOut: 2000 });
        this.getTimeCardList();
      }
    });
  }

  /**
   * to delete timeCard
   * @param timeCardId time card id
   */
  public deleteTimeCardEvent(timeCardId: number): void {
    this.timeCardService.deleteTimeCard(timeCardId).subscribe((data: TimeCard) => {
      if (data) {
        this.toastr.success('Time Card Delete Successfully...!', 'Success', { timeOut: 2000 });
        this.getTimeCardList();
      }
    });
  }
}
