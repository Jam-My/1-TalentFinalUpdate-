/**
 * ResignationDetails
 * @author Nurali K
 */
export class ResignationDetails {
    constructor(
        public designationName?: string,
        public domainName?: string,
        public employeeCode?: number,
        public firstName?: string,
        public managerId?: number,
        public raisedOnDate?: Date,
        public resignationApprovedDate?: Date,
        public resignationId?: number,
        public resignationManagerId?: number,
        public resignationStatus?: string,
        public technologyName?: string,
        public lastName?: string,
        public resignationStatusId?:number,
    ) { }
}