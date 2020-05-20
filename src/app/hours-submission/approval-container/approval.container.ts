/**
 * @author Shiv Desai
 */
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ProjectList } from '../models/project-list.model'
import { TimeCardService } from '../services/time-card.service';
import { Approval } from '../models/approval.model';
import { ToastrService } from 'ngx-toastr';
import { ApprovalPut } from '../models/approval-put.model';

// Login Employee Id...
const EMPLOYEEID: number = 4;

/**
 * Component
 */
@Component({
  selector: 'approval-container',
  templateUrl: './approval.container.html'
})
export class ApprovalContainer implements OnInit {

  // The project list object will be stored in this variable 
  public projectList$: Observable<ProjectList[]>;
  // time-card list
  public approval$: Observable<Approval[]>;

  private rmId: number = Number(localStorage.getItem('RM'));
  
  constructor(
    private timeCardService: TimeCardService,
    private toastr: ToastrService
    ) {}

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.getProjectByRM();
  }

  /**
   * Gets Time card list 
   */
  public getApproval(id: number): void {
    this.approval$ = this.timeCardService.getApproval(id);
  }

  /**
   * changeProjectName
   * @param subProjectId sub project Id
   */
  public changeProjectName(subProjectId: number): void {
    this.approval$ = this.timeCardService.getApproval(subProjectId);
  }

  /**
   * This method get the project list object into projectList$ variable
   */
  public getProjectByRM(): void {
    this.projectList$ = this.timeCardService.getProjectByApprover(this.rmId);
  }

  /**
   * saveApproval
   * @param approvalDtails Accepted or rejected details of hours submition
   */
  public saveApproval(approvalDtails: ApprovalPut[]): void {
    let subProjectId: number = approvalDtails[0].subProjectId;
    this.timeCardService.saveApproval(this.rmId, approvalDtails).subscribe((data: Approval) => {
      if(data) {
        this.toastr.success('Hours Approve/Reject Updated Successfully...!', 'Success', { timeOut: 2000 });
        this.getApproval(subProjectId);
      }
    });
  }
}
