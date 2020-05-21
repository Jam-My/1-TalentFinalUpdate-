import { Adapter } from 'src/app/core/adapter/adapter';
import { ResignationDetails } from '../models/resignation-request-model/resignation-request.model';
import { STATUS, STATUSSHOW } from '../status.constants';
import { EmployeeResignation } from '../models/employee-resignation-model/employee-resignation.model';



// tslint:disable-next-line: completed-docs
export class ApprovalListAdapter implements Adapter<ResignationDetails[]>{
    public toRequest?(resignationDetails: ResignationDetails[]): ResignationDetails[] {
        return null;
    }

    public toResponse?(resignationDetails: ResignationDetails[]): ResignationDetails[] {
        const resignationDetailsList: ResignationDetails[] = resignationDetails;
        resignationDetailsList.forEach((resignationDetail: ResignationDetails) => {
            resignationDetail.resignationStatus = STATUSSHOW[resignationDetail.resignationStatusId];
        });
        return resignationDetails;
    }
}


// tslint:disable-next-line: completed-docs
export class ResingationApprovalAdapter implements Adapter<EmployeeResignation>{
    public toRequest?(employeeResignation: EmployeeResignation): EmployeeResignation {
        return null;
    }

    public toResponse?(employeeResignation: EmployeeResignation): EmployeeResignation {
        employeeResignation.statusName = STATUSSHOW[employeeResignation.statusId];
        return employeeResignation;
    }
}