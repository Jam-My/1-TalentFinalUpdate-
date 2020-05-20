/**
 * @author Aastha Yadav
 */

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ProjectList } from '../models/project-list.model'
import { TimeCard } from '../models/time-card.model';
import { TimeCardService } from '../services/time-card.service';

/**
 * Component
 */
@Component({
  selector: 'member-list-container',
  templateUrl: './member-list.container.html'
})
export class MemberListContainer implements OnInit {

  // The project list object will be stored in this variable 
  public projectList$: Observable<ProjectList[]>;
  public timeCard$: Observable<TimeCard[]>;
  private rmId: number = Number(localStorage.getItem('RM'));
  constructor(private timeCard: TimeCardService) { }

  public ngOnInit(): void {
    this.getProjectList();
  }

  /**
   * This method get the project list object into projectList$ variable
   */
  public getProjectList(): void {
    this.projectList$ = this.timeCard.getProjectByApprover(this.rmId);
  }

  /**
   * Gets Time card list 
   */
  public getTimeCard(id: number): void {
    this.timeCard$ = this.timeCard.getReportList(id);
  }
}
