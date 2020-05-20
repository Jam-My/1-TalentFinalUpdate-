import { ConcernPerson } from './concern-person.model';

/**
 * ResignationDetails
 * @author Kalrav Shah
 * @description Resignation Model
 */
export class ResignationDetails {
  constructor(
    public employeeId?: number,
    public resignationId?: number,
    public requestDate?: Date,
    public employeeResignationAppliedDate?: Date[],
    public resignationApprovalDate?: Date,
    public onBoardingNoticePeriod?: number,
    public proposedNoticePeriod?: number,
    public approvedNoticePeriod?: number,
    public ccPersons?: ConcernPerson[],
    public status?: string,
    public isApprovedByHr?: boolean,
    public isApprovedByRm?: boolean,
    public revokeReason?: string,
    public resignationReason?: string,
    public hrRemarks?: string,
    public rmRemarks?: string,
    public exitStatusId?: number,
    public feedback?: string) {
  }
}
