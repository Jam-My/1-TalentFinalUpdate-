import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ProjectMasterPresenter {

  public projectMasterForm: FormGroup;  // form group instance

  constructor(
    public formBuilder: FormBuilder) {
  }

  /**
   * buildProjectForm
   */
  public buildProjectMasterForm(): FormGroup {
    return this.projectMasterForm = this.formBuilder.group(
      {
        projectId: [],
        projectName: ['',Validators.required]
      }
    )
  }
}
