export class ResignationResponse {
    constructor(
        public resignationId?: number,

        public resignationApprovalDate?: Date,
        public exitInterviewDate?: Date,
        public remark?: string,
        public isRehired?: boolean,
        
        public status?: boolean,
        public resignationStatus?: string,
        
        public lastModifiedDate?: Date,
        public deletedDate?: Date
    ) { }
}