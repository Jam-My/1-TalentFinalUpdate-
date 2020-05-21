import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Injectable
 */
@Injectable()
export class ClientMasterPresenter {

  public clientMasterForm: FormGroup;  // form group instance

  constructor(
    public formBuilder: FormBuilder) {
  }

  /**
   * buildProjectForm
   */
  public buildClientMasterForm(): FormGroup {
    return this.clientMasterForm = this.formBuilder.group(
      {
        clientId:[],
        clientName: ['',[Validators.required]]
      }
    )}
}
